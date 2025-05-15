import {
  Phone,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Users,
  Share,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

export default function GroupCallingApp() {
  const [currentPage, setCurrentPage] = useState("home");
  const [meetingId, setMeetingId] = useState("");
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [participants, setParticipants] = useState([
    { id: 1, name: "You", isHost: true, hasVideo: true },
  ]);

  const generateMeetingId = () => {
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
    setMeetingId(randomId);
    return randomId;
  };

  const initiateCall = () => {
    const newMeetingId = generateMeetingId();
    setCurrentPage("videoCall");
  };

  const joinCall = () => {
    if (meetingId.trim() === "") {
      setMeetingId(generateMeetingId());
    }
    setCurrentPage("videoCall");
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    setParticipants((prev) =>
      prev.map((p) => (p.id === 1 ? { ...p, hasVideo: !isVideoOn } : p))
    );
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  const endCall = () => {
    setCurrentPage("home");
    setMeetingId("");
  };

  const HomePage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Video Call</h1>
          <p className="text-gray-500 mt-1">
            Simple and minimal video meetings
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <button
              onClick={initiateCall}
              className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              <Video size={18} />
              <span>Start Meeting</span>
            </button>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Enter meeting code"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={joinCall}
              className="w-full bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              Join Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const VideoCallPage = () => (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="bg-black bg-opacity-80 text-white py-2 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Video size={18} />
          <span className="text-sm">{meetingId}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users size={18} />
          <span className="text-sm">{participants.length}</span>
        </div>
      </div>

      <div className="flex-1 bg-black p-2">
        <div className="relative h-full rounded overflow-hidden">
          <div
            className={`absolute inset-0 flex items-center justify-center ${
              isVideoOn ? "bg-gray-800" : "bg-gray-900"
            }`}
          >
            {isVideoOn ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-white text-lg">Your Camera</div>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-700 flex items-center justify-center text-white text-3xl font-medium">
                {participants[0].name.charAt(0)}
              </div>
            )}
          </div>

          <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded flex items-center space-x-2">
            <span>{participants[0].name}</span>
            {participants[0].isHost && (
              <span className="text-xs bg-blue-600 px-2 py-0.5 rounded">
                Host
              </span>
            )}
            {!isAudioOn && <MicOff size={16} className="text-red-500" />}
            {!isVideoOn && <VideoOff size={16} className="text-red-500" />}
          </div>
        </div>
      </div>

      <div className="h-24 bg-black px-2 flex space-x-2 overflow-x-auto">
        {participants.slice(1).map((participant) => (
          <div
            key={participant.id}
            className="relative h-full aspect-video flex-shrink-0 bg-gray-800 rounded overflow-hidden"
          >
            <div
              className={`absolute inset-0 flex items-center justify-center ${
                participant.hasVideo ? "bg-gray-800" : "bg-gray-900"
              }`}
            >
              {participant.hasVideo ? (
                <div className="text-white text-sm">
                  {participant.name}'s Camera
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white text-lg font-medium">
                  {participant.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="absolute bottom-1 left-1 right-1 bg-black bg-opacity-60 text-white px-2 py-0.5 rounded text-xs truncate">
              {participant.name}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-black text-white py-3 flex justify-center items-center space-x-3">
        <button
          onClick={toggleAudio}
          className={`w-11 h-11 rounded-full flex items-center justify-center ${
            isAudioOn
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isAudioOn ? <Mic size={18} /> : <MicOff size={18} />}
        </button>

        <button
          onClick={toggleVideo}
          className={`w-11 h-11 rounded-full flex items-center justify-center ${
            isVideoOn
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
        </button>

        <button
          onClick={endCall}
          className="w-14 h-11 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center"
        >
          <Phone size={18} />
        </button>

        <button className="w-11 h-11 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center">
          <Share size={18} />
        </button>

        <button className="w-11 h-11 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center">
          <MessageSquare size={18} />
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {currentPage === "home" && <HomePage />}
      {currentPage === "videoCall" && <VideoCallPage />}
    </div>
  );
}
