import { UseQueryResult,useQueryClient } from "@tanstack/react-query";
import {
  Search,
  Calendar,
  Clock,
  Phone,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { enqueueSnackbar } from "notistack";
import * as React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  managerJoinMeeting,
  managerMakeCall,
} from "@/features/manager/api/manager.api";
import { userJoinMeeting, userMakeCall } from "@/features/user/api/user.api";
import { MeetingType } from "@/types";

import { useTransport } from "../hooks/useTransport";
import { useNotification } from "../hooks/useNotification";
import { usePeerSocket } from "../hooks/usePeerSocket";

type Props = {
  user: {
    id: string;
    profile: { name?: string; image?: string };
    role: string;
  };
  useMeetingsQuery: (spaceId: string) => UseQueryResult<MeetingType[], Error>;
};

const Meeting: React.FC<Props> = ({ user, useMeetingsQuery }) => {
  const { spaceid } = useParams();
  const navigate = useNavigate();

  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [expandedMeetingId, setExpandedMeetingId] = useState<string | null>(
    null
  );
  const {refreshMeeting,resetRefreshMeeting,triggerRefreshMeeting} = usePeerSocket()
  const {
    data: meetings,
    isError: hasMeetingFetchError,
    error: meetingFetchError,
    refetch
  } = useMeetingsQuery(spaceid!);

  const { sendNotification } = useNotification();

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const { loadDevice, createSendTransport, createRecvTransport } =
    useTransport();

  if (hasMeetingFetchError) {
    console.error("Error at fetching meetings", meetingFetchError);
  };


 React.useEffect(() => {
  console.log('inside refresh meeting useEffect',refreshMeeting)
  if (refreshMeeting) {
    const refresh = async () => {
      await refetch();
      resetRefreshMeeting();
      console.log("Meeting refreshed and flag reset.");
    };
    refresh();
  }
}, [refreshMeeting]);



  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const toggleExpand = (meetingId: string) => {
    setExpandedMeetingId((prev) => (prev === meetingId ? null : meetingId));
  };

  async function handleInstantCall() {
    try {
      if (!user.profile?.name || !user.id || !spaceid || !user.role) {
        throw new Error("Invalid user or space info");
      }

      const callData = {
        hostId: user.id,
        hostName: user.profile.name,
        spaceId: spaceid,
        isInstant: true,
        status: "active",
        role: user.role,
      };
      let response;
      if (user.role === "user") {
        response = await userMakeCall(callData);
      } else if (user.role === "manager") {
        response = await managerMakeCall(callData);
      }
      if (response && response.success) {
        console.log("Call initiated");
         triggerRefreshMeeting(spaceid)
        sendNotification(
          spaceid,
          user.profile.name + " has initiated the call",
          "info"
        );
        const rtpCapabilities = response.data.rtpCapabilities;
        const sendtransportOptions = response.data.sendtransportOptions;
        const recvTransportOptions = response.data.recvTransportOptions;
        const meeting = response.data.meeting;
        localStorage.setItem("meetingId", meeting.meetingId);

        const loadedDevice = await loadDevice(rtpCapabilities);
        if (!loadedDevice) {
          throw new Error("Device hasnt initialized correctly for webrtc");
        }
        createSendTransport(
          sendtransportOptions,
          loadedDevice,
          user.id,
          meeting.meetingId
        );
        createRecvTransport(
          recvTransportOptions,
          loadedDevice,
          user.id,
          meeting.meetingId
        );

        
        if (user.role === "user") {
          navigate("/user/dashboard/spaces/" + spaceid + "/call");
        }

        if (user.role === "manager") {
          navigate("/manager/dashboard/spaces/" + spaceid + "/call");
        }
      } else if (response && "status" in response && response.status === 403) {
        enqueueSnackbar("There's already an active call", {
          variant: "warning",
        });
      } else {
        console.warn("Call initiation failed");
      }
    } catch (err) {
      console.log("error occured while making call", err);
      enqueueSnackbar("Something went wrong. Try logging in again.", {
        variant: "error",
      });
    }
  }

  async function handleScheduledCall() {
    if (
      !user.profile?.name ||
      !user.id ||
      !spaceid ||
      !user.role ||
      !scheduledDate
    ) {
      enqueueSnackbar("Missing required information or date", {
        variant: "warning",
      });
      return;
    }

    const now = new Date();

    if (scheduledDate.getTime() <= now.getTime()) {
      enqueueSnackbar("Please pick a future date", { variant: "warning" });
      return;
    }

    const callData = {
      hostId: user.id,
      hostName: user.profile.name,
      spaceId: spaceid,
      isInstant: false,
      status: "upcoming",
      role: user.role,
      scheduledDate,
    };
    let response;
    if (user.role === "user") {
      response = await userMakeCall(callData);
    } else if (user.role === "manager") {
      response = await managerMakeCall(callData);
    }
    if (response && response.success) {
      enqueueSnackbar(
        `Meeting scheduled for ${scheduledDate.toLocaleString()}`,
        { variant: "success" }
      );
      sendNotification(
        spaceid,
        user.profile.name + " has initiated the call",
        "info"
      );
      setShowScheduleModal(false);
      setScheduledDate(null);
    } else if (response && "status" in response && response.status === 403) {
      enqueueSnackbar("There's already an active call", { variant: "warning" });
    } else {
      enqueueSnackbar("Failed to schedule call", { variant: "error" });
    }
  }

  async function handleJoinCall(meetingId: string) {
    try {
      const spaceId = spaceid;
      if (!spaceId) {
        throw new Error("couldnt get the space id ,try login again");
      }
      if (!meetingId) {
        console.warn("no meeting id found for joining meeting");
      }
      if (!user.id || !spaceid || !user.role) {
        throw new Error("Invalid user or space info");
      }
      let response;

      if (user.role === "user") {
        response = await userJoinMeeting({
          joineeId: user.id,
          role: "user",
          meetingId,
          spaceId,
        });
      } else if (user.role === "manager") {
        response = await managerJoinMeeting({
          joineeId: user.id,
          role: "manager",
          meetingId,
          spaceId,
        });
      }
      if (response && response.success) {
        console.log("joining call");
        sendNotification(
          spaceid,
          user.profile.name + " has joined  the call " + meetingId,
          "info"
        );
        const rtpCapabilities = response.data.rtpCapabilities;
        const sendtransportOptions = response.data.sendtransportOptions;
        const recvTransportOptions = response.data.recvTransportOptions;
        const meeting = response.data.meeting;
        localStorage.setItem("meetingId", meeting.meetingId);

        const loadedDevice = await loadDevice(rtpCapabilities);
        if (!loadedDevice) {
          throw new Error("Device hasnt initialized correctly for webrtc");
        }
        createSendTransport(
          sendtransportOptions,
          loadedDevice,
          user.id,
          meeting.meetingId
        );
        createRecvTransport(
          recvTransportOptions,
          loadedDevice,
          user.id,
          meeting.meetingId
        );

        if (user.role === "user") {
          navigate("/user/dashboard/spaces/" + spaceid + "/call");
        }

        if (user.role === "manager") {
          navigate("/manager/dashboard/spaces/" + spaceid + "/call");
        }
      }
    } catch (error) {
      console.warn("something went wrong", error);
    }
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <aside className="w-72 border-r border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium">Calls</h2>
          <div className="mt-2 relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-8 pr-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {meetings?.map((call) => (
            <div
              key={call.meetingId}
              className="p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <h3 className="font-medium text-sm">{call.hostName}</h3>

                  <div className="mt-1 flex items-center text-xs">
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                        call.status === "upcoming"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : call.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {call.status}
                    </span>

                    <div className="ml-2 text-gray-500 dark:text-gray-400 flex items-center">
                      {call.isInstant ? (
                        <>
                          <Clock className="h-3 w-3 mr-1" /> Now
                        </>
                      ) : (
                        <>
                          {call.scheduledDate &&
                            formatDate("" + call.scheduledDate)}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">
                      {call.participants && call.participants.length}
                    </span>
                    <button
                      onClick={() => toggleExpand(call.meetingId!)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {expandedMeetingId === call.meetingId ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <div>
                    {call.status == "active" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleJoinCall(call.meetingId!)}
                      >
                        Join
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {expandedMeetingId === call.meetingId && (
                <div className="mt-2 pl-2 text-xs space-y-1">
                  {call.participants &&
                    call.participants.map((participant) => (
                      <div
                        key={participant?.participantId}
                        className="text-gray-600 dark:text-gray-300"
                      >
                        {participant.name}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 p-6 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="space-y-4">
            <button
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
              onClick={handleInstantCall}
            >
              <Phone className="h-4 w-4 mr-2" />
              Start Instant Call
            </button>

            <button
              onClick={() => setShowScheduleModal(true)}
              className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md font-medium transition-colors"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Call
            </button>
          </div>
        </div>
      </main>

      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-sm">
            <div className="p-4">
              <h3 className="text-lg font-medium mb-3">Schedule Call</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm"
                    onChange={(e) => setScheduledDate(new Date(e.target.value))}
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300"
                  onClick={() => setShowScheduleModal(false)}
                >
                  Cancel
                </button>
                <button
                  onClick={handleScheduledCall}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meeting;
