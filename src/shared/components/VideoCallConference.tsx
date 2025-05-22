import { UseQueryResult } from "@tanstack/react-query";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MoreHorizontal,
  CircleX,
} from "lucide-react";
import { enqueueSnackbar } from "notistack";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  managerEndMeeting,
  managerLeaveMeeting,
} from "@/features/manager/api/manager.api";
import { userEndMeeting, userLeaveMeeting } from "@/features/user/api/user.api";
import { MeetingType } from "@/types";

import { usePeerSocket } from "../hooks/usePeerSocket";
import { useTransport } from "../hooks/useTransport";

type Props = {
  user: {
    id: string;
    profile: { name?: string; image?: string };
    role: string;
  };
  useMeetingsQuery: (spaceId: string) => UseQueryResult<MeetingType[], Error>;
};

type Participant = {
  id: string;
  name: string;
  stream: MediaStream;
  isUser: boolean;
};

const VideoCallConference: React.FC<Props> = ({ user, useMeetingsQuery }) => {
  const {
    sendTransport,
    consumeFromPeer,
    device,
    recvTransport,
    consumers,
    updateConsumer,
  } = useTransport();
  const {
    joinMeeting,
    producersForConsuming,
    leaveMeeting,
    recentQuitter,
    resetRecentQuitter,
  } = usePeerSocket();
  const navigate = useNavigate();
  const { spaceid } = useParams();

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const [audioProducer, setAudioProducer] = useState<any>(null);
  const [videoProducer, setVideoProducer] = useState<any>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const hasProducedRef = useRef(false);
  const consumedIdsRef = useRef<Set<string>>(new Set());
  const meetingId = localStorage.getItem("meetingId");
  if (!meetingId) throw new Error("no meeting id found,try joining again");
  if (!spaceid) throw new Error("NO space id found");
  const { data: meetings, isSuccess } = useMeetingsQuery(spaceid);
  let isHost = true;
  if (isSuccess) {
    const currentMeeting = meetings.filter(
      (entry) => entry.meetingId === meetingId
    )[0];
    if (currentMeeting && user.id !== currentMeeting?.hostId) {
      isHost = false;
    }
  }

  // 🚀 Acquire local media stream
  useEffect(() => {
    const getMedia = async () => {
      try {
        const media = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(media);
        setParticipants([
          {
            id: user.id,
            name: user.profile.name || "You",
            stream: media,
            isUser: true,
          },
        ]);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = media;
        }
      } catch (err) {
        console.error("getUserMedia failed:", err);
        enqueueSnackbar("Failed to access camera/mic", { variant: "error" });
      }
    };

    getMedia();

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [user]);

  // 🔁 Ensure local stream is applied to the video ref
  useEffect(() => {
    if (localVideoRef.current && stream) {
      localVideoRef.current.srcObject = stream;
    }
  }, [stream]);

  // 🎙️ Produce local audio/video
  useEffect(() => {
    const produceTracks = async () => {
      if (!stream || !sendTransport || hasProducedRef.current) return;
      hasProducedRef.current = true;

      try {
        const [audioTrack] = stream.getAudioTracks();
        const [videoTrack] = stream.getVideoTracks();

        if (videoTrack && !videoProducer) {
          const vp = await sendTransport.produce({ track: videoTrack });
          setVideoProducer(vp);
        }
        if (audioTrack && !audioProducer) {
          const ap = await sendTransport.produce({ track: audioTrack });
          setAudioProducer(ap);
        }

        if (!sendTransport) {
          enqueueSnackbar("Meeting ID not found or transport missing", {
            variant: "error",
          });
          throw new Error("no mid or sendTranport found");
        }

        const join = async () => {
          await joinMeeting(user.id, meetingId);
        };
        join();
      } catch (err) {
        console.error("Failed to produce tracks:", err);
        enqueueSnackbar("Error producing media", { variant: "error" });
      }
    };

    produceTracks();
  }, [stream, sendTransport, audioProducer, videoProducer]);

  // 👀 Consume remote participants
  useEffect(() => {
    const consume = async () => {
      if (!device?.rtpCapabilities || !recvTransport) return;

      try {
        const others = producersForConsuming.filter(
          (p) => p.userId !== user.id && !consumedIdsRef.current.has(p.userId)
        );

        for (const p of others) {
          const peerStream = await consumeFromPeer(
            p.id,
            device.rtpCapabilities,
            user.id,
            meetingId
          );

          if (peerStream) {
            setParticipants((prev) =>
              prev.some((x) => x.id === p.userId)
                ? prev
                : [
                    ...prev,
                    {
                      id: p.userId,
                      name: "Guest",
                      stream: peerStream,
                      isUser: false,
                    },
                  ]
            );
            consumedIdsRef.current.add(p.userId);
          }
        }
      } catch (err) {
        console.error("Error consuming remote stream:", err);
      }
    };

    consume();
  }, [
    device?.rtpCapabilities,
    recvTransport,
    meetingId,
    producersForConsuming,
    user.id,
    consumeFromPeer,
  ]);

  useEffect(() => {
    const userId = recentQuitter?.userId;
    if (!userId) return;
    setParticipants((prev) => prev.filter((entry) => entry.id !== userId));
    for (const consumer of consumers) {
      if (consumer.appData.userId === userId) {
        consumer.close();
      }
    }
    const newConsumer = consumers.filter(
      (consumer) => consumer.appData.userId !== userId
    );
    updateConsumer(newConsumer);
    resetRecentQuitter();
  }, [recentQuitter]);

  // 🎙️ Toggle microphone
  const toggleAudio = () => {
    if (!stream) return;
    const enabled = !audioEnabled;
    stream.getAudioTracks().forEach((track) => (track.enabled = enabled));
    audioProducer?.[enabled ? "resume" : "pause"]();
    setAudioEnabled(enabled);
  };

  // 📷 Toggle camera
  const toggleVideo = () => {
    if (!stream) return;
    const enabled = !videoEnabled;
    stream.getVideoTracks().forEach((track) => (track.enabled = enabled));
    videoProducer?.[enabled ? "resume" : "pause"]();
    setVideoEnabled(enabled);
  };

  // ❌ Leave meeting
  const endCall = () => {
    stream?.getTracks().forEach((track) => track.stop());
    audioProducer?.close();
    videoProducer?.close();
    setStream(null);
    setAudioProducer(null);
    setVideoProducer(null);
  };

  // ☠️ Handle full meeting termination
  const handleEndCall = async () => {
    if (!meetingId) return;
    endCall();

    const api = user.role === "user" ? userEndMeeting : managerEndMeeting;
    const res = await api({
      meetingId,
      role: user.role,
      hostId: user.id,
      spaceId: spaceid!,
    });

    if (res?.success) {
      enqueueSnackbar("Meeting ended", { variant: "success" });

      const path =
        user.role === "user"
          ? `/user/dashboard/spaces/${spaceid}/meeting`
          : `/manager/dashboard/spaces/${spaceid}/meeting`;
      setTimeout(() => navigate(path), 1500);
    }
  };

  const handleLeaveMeeting = async () => {
    if (!meetingId || !spaceid) return;
    const api = user.role === "user" ? userLeaveMeeting : managerLeaveMeeting;
    const res = await api({
      meetingId,
      role: user.role,
      spaceId: spaceid,
      userId: user.id,
      name: user.profile.name!,
    });
    if (res.success) {
      leaveMeeting(user.id, meetingId, user.profile.name ?? "participant");
      endCall();
      const path =
        user.role === "user"
          ? `/user/dashboard/spaces/${spaceid}/meeting`
          : `/manager/dashboard/spaces/${spaceid}/meeting`;

      setTimeout(() => navigate(path), 1500);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex-1 p-4 overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
          {participants.map((p) => (
            <video
              key={p.id}
              ref={(el) => {
                if (!el) return;
                if (p.isUser) {
                  localVideoRef.current = el;
                  if (stream && el.srcObject !== stream) el.srcObject = stream;
                } else {
                  if (el.srcObject !== p.stream) el.srcObject = p.stream;
                }
              }}
              autoPlay
              muted={p.isUser}
              playsInline
              className="w-full h-full object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 px-4 py-3">
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={toggleAudio}
            className={`rounded-full p-3 ${
              audioEnabled
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {audioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
          </button>
          <button
            onClick={toggleVideo}
            className={`rounded-full p-3 ${
              videoEnabled
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {videoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
          </button>
          <button
            className="rounded-full p-3 bg-gray-700 hover:bg-gray-600"
            onClick={handleLeaveMeeting}
          >
            <CircleX size={24} />
          </button>
          {isHost && (
            <button
              onClick={handleEndCall}
              className="rounded-full p-3 bg-red-600 hover:bg-red-700"
            >
              <PhoneOff size={24} />
            </button>
          )}
          <button className="rounded-full p-3 bg-gray-700 hover:bg-gray-600">
            <MoreHorizontal size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallConference;
