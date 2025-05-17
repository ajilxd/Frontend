import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  PhoneOff,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";

export default function VideoCallConference() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [screenShareActive, setScreenShareActive] = useState(false);
  const [participants, setParticipants] = useState([
    { id: 1, name: "You", isUser: true },
    { id: 2, name: "John Doe" },
    { id: 3, name: "Alice Smith" },
    { id: 4, name: "David Johnson" },
    { id: 5, name: "Emma Wilson" },
    { id: 6, name: "Michael Brown" },
  ]);

  const toggleAudio = () => setAudioEnabled(!audioEnabled);
  const toggleVideo = () => setVideoEnabled(!videoEnabled);
  const toggleScreenShare = () => setScreenShareActive(!screenShareActive);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Video Grid Layout */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className={`relative rounded-lg overflow-hidden flex items-center justify-center
                ${
                  participant.isUser && !videoEnabled
                    ? "bg-gray-700"
                    : "bg-gray-800"
                }`}
            >
              {/* Video feed or avatar placeholder */}
              {participant.isUser && !videoEnabled ? (
                <div className="h-24 w-24 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold">
                  {participant.name.charAt(0)}
                </div>
              ) : (
                <div className="w-full h-full bg-gray-800">
                  {/* Simulated video feed with color gradient */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900"></div>
                </div>
              )}

              {/* Participant name overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                <div className="flex items-center">
                  <span className="flex-1">{participant.name}</span>
                  {participant.isUser && !audioEnabled && (
                    <MicOff size={16} className="text-red-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-gray-800 px-4 py-3">
        <div className="flex justify-center items-center space-x-4">
          {/* Audio Toggle */}
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

          {/* Video Toggle */}
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

          {/* Screen Share Toggle */}
          <button
            onClick={toggleScreenShare}
            className={`rounded-full p-3 ${
              screenShareActive
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <Monitor size={24} />
          </button>

          {/* End Call Button */}
          <button className="rounded-full p-3 bg-red-600 hover:bg-red-700">
            <PhoneOff size={24} />
          </button>

          {/* More Options Button */}
          <button className="rounded-full p-3 bg-gray-700 hover:bg-gray-600">
            <MoreHorizontal size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
