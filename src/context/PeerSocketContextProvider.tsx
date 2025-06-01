import {
  DtlsParameters,
  RtpParameters,
  RtpCapabilities,
  MediaKind,
} from "mediasoup-client/types";
import { useState, useEffect, ReactNode, useCallback } from "react";

import { peerSocket } from "@/socket/peerSocket";

import { PeerSocketContext } from "./PeerSocket";

type ProducersForConsumingType = {
  id: string;
  kind: MediaKind;
  userId: string;
};

type JoinMeetingResponse = {
  error?: string;
  producers?: ProducersForConsumingType[];
};

export const PeerSocketProvider = ({ children }: { children: ReactNode }) => {
  const [connected, setConnected] = useState(false);
  const [newParticipant, setNewParticipant] = useState<string | null>(null);
  const [producersForConsuming, setProducersForConsuming] = useState<
    ProducersForConsumingType[] | []
  >([]);
  const [meetingIsTerminated,setMeetingIsTerminated] =useState(false)
  const [recentQuitter, setRecentQuitter] = useState<{
    name: string;
    userId: string;
  } | null>(null);
const [refreshMeeting,setRefreshMeeting] =useState(false)




  useEffect(() => {
    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);
    const handleNewParticipant = (data: {
      producers: ProducersForConsumingType[];
      userId: string;
      socketId: string;
    }) => {
      console.log("we got a new joinee ", data.userId); 
      setProducersForConsuming((prev) => [...prev, ...data.producers]);
      setNewParticipant(data.userId);
    };

    const handleLeaveMeeting = (data: {
      userId: string;
      name: string;
      producers: ProducersForConsumingType;
    }) => {
      const { userId, name } = data;
      console.log(data.name + " has left the meeting with producers ");
      setRecentQuitter({ userId, name });
    };

    const handleMeetingTermination =()=>{
      setMeetingIsTerminated(true);
    }

    const handleRefreshMeeting =()=>{
      console.log("here is refresh meeting")
      setRefreshMeeting(true)
    }

   
    peerSocket.on("connect", handleConnect);
    peerSocket.on("disconnect", handleDisconnect);
    peerSocket.on("new-participant", handleNewParticipant);
    peerSocket.on("leave-meeting", handleLeaveMeeting);
    peerSocket.on("terminate-meeting",handleMeetingTermination);
    peerSocket.on("refresh-meeting",handleRefreshMeeting)
    peerSocket.connect();

    return () => {
      peerSocket.off("connect", handleConnect);
      peerSocket.off("disconnect", handleDisconnect);
    };
  }, []);

  const resetNewParticipant = useCallback(() => {
    setNewParticipant(null);
  }, []);

  const resetRecentQuitter = useCallback(() => {
    setRecentQuitter(null);
  }, []);

  const resetMeetingTermination =useCallback(()=>{
    setMeetingIsTerminated(false)
  },[])

   const resetRefreshMeeting =()=>{
      setRefreshMeeting(false)
    }


  const connectTransport = (
    transportId: string,
    dtlsParameters: DtlsParameters,
    userId: string,
    meetingId: string
  ) => {
    return new Promise<void>((resolve, reject) => {
      peerSocket.emit(
        "connect-transport",
        { transportId, dtlsParameters, userId, meetingId },
        (response: { error?: string }) => {
          if (response?.error) return reject(new Error(response.error));
          resolve();
        }
      );
    });
  };

  const produceMedia = (
    transportId: string,
    kind: "audio" | "video",
    rtpParameters: RtpParameters,
    userId: string,
    meetingId: string
  ): Promise<{ id: string }> => {
    return new Promise((resolve, reject) => {
      peerSocket.emit(
        "produce",
        { transportId, kind, rtpParameters, userId, meetingId },
        (response: { error?: string; id?: string }) => {
          if (response?.error) return reject(new Error(response.error));
          if (!response?.id)
            return reject(new Error("No producer ID returned"));
          resolve({ id: response.id });
        }
      );
    });
  };

  const consumeMedia = (
    transportId: string,
    producerId: string,
    rtpCapabilities: RtpCapabilities,
    userId: string,
    meetingId: string
  ): Promise<{
    id: string;
    producerId: string;
    kind: MediaKind;
    rtpParameters: RtpParameters;
  }> => {
    return new Promise((resolve, reject) => {
      peerSocket.emit(
        "consume",
        { transportId, producerId, rtpCapabilities, userId, meetingId },
        (response: {
          error?: string;
          id?: string;
          producerId?: string;
          kind?: MediaKind;
          rtpParameters?: RtpParameters;
        }) => {
          if (response?.error) return reject(new Error(response.error));
          if (
            !response?.id ||
            !response?.rtpParameters ||
            !response.kind ||
            !response.producerId
          ) {
            return reject(new Error("Incomplete consumer data received"));
          }
          resolve({
            id: response.id,
            producerId: response.producerId,
            kind: response.kind,
            rtpParameters: response.rtpParameters,
          });
        }
      );
    });
  };
  const joinMeeting = (
    userId: string,
    meetingId: string
  ): Promise<{ id: string; kind: MediaKind; userId: string }[]> => {
    return new Promise((resolve, reject) => {
      peerSocket.emit(
        "join-meeting",
        { userId, meetingId },
        (response: JoinMeetingResponse) => {
          if (response?.error) return reject(new Error(response.error));
          if (!response?.producers)
            return reject(new Error("No producers received"));
          console.log("producers from join meetings ", response.producers);
          setProducersForConsuming(response.producers);
          resolve(response.producers);
        }
      );
    });
  };

  const terminateMeeting = (userId: string, meetingId: string) => {
    peerSocket.emit("terminate-meeting", { userId, meetingId });
  };

  const leaveMeeting = (userId: string, meetingId: string, name: string) => {
    console.log(name + "has left the meeting" + meetingId);
    peerSocket.emit("leave-meeting", { userId, meetingId, name });
  };

  const triggerRefreshMeeting =(meetingId:string)=>{
    console.log("hey im the refresher")
    peerSocket.emit("refresh-meeting",{meetingId})
  }



  return (
    <PeerSocketContext.Provider
      value={{
        peerSocket,
        connected,
        connectTransport,
        produceMedia,
        consumeMedia,
        joinMeeting,
        producersForConsuming,
        newParticipant,
        resetNewParticipant,
        terminateMeeting,
        leaveMeeting,
        recentQuitter,
        resetRecentQuitter,
        meetingIsTerminated,
        resetMeetingTermination,
        refreshMeeting,
        resetRefreshMeeting,
        triggerRefreshMeeting
      }}
    >
      {children}
    </PeerSocketContext.Provider>
  );
};
