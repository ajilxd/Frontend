import {
  Search,
  Calendar,
  Clock,
  Phone,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const sampleCallLogs = [
  {
    meetingId: "uuid-1",
    hostId: "user_uuid-1",
    hostName: "Sarah Johnson",
    isInstant: false,
    scheduledDate: "2025-05-17T15:30:00Z",
    status: "upcoming",
    participants: [
      {
        participantId: "user_uuid-1",
        name: "Sarah Johnson",
        joinedAt: null,
        leftAt: null,
      },
      {
        participantId: "user_uuid-2",
        name: "Michael Chen",
        joinedAt: null,
        leftAt: null,
      },
      {
        participantId: "user_uuid-3",
        name: "Priya Patel",
        joinedAt: null,
        leftAt: null,
      },
    ],
  },
];

export default function Meeting() {
  const [expandedMeetingId, setExpandedMeetingId] = useState<string | null>(
    null
  );
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Format date for display
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

  // Toggle participant list expansion
  const toggleExpand = (meetingId: string) => {
    if (expandedMeetingId === meetingId) {
      setExpandedMeetingId(null);
    } else {
      setExpandedMeetingId(meetingId);
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
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
          {sampleCallLogs.map((call) => (
            <div
              key={call.meetingId}
              className="p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-sm">{call.hostName}</h3>

                  {/* Status Badge */}
                  <div className="mt-1 flex items-center text-xs">
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium
                        ${
                          call.status === "upcoming"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : call.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        }`}
                    >
                      {call.status}
                    </span>

                    {/* Time Information */}
                    <div className="ml-2 text-gray-500 dark:text-gray-400 flex items-center">
                      {call.isInstant ? (
                        <>
                          <Clock className="h-3 w-3 mr-1" /> Now
                        </>
                      ) : (
                        <>{formatDate(call.scheduledDate)}</>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">
                    {call.participants.length}
                  </span>
                  <button
                    onClick={() => toggleExpand(call.meetingId)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {expandedMeetingId === call.meetingId ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Participant List */}
              {expandedMeetingId === call.meetingId && (
                <div className="mt-2 pl-2 text-xs space-y-1">
                  {call.participants.map((participant) => (
                    <div
                      key={participant.participantId}
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

      {/* Main Content */}
      <main className="flex-1 p-6 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          {/* Call Action Buttons */}
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors">
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

          {/* Upcoming Calls Summary - Minimal version */}
          {sampleCallLogs.filter((call) => call.status === "upcoming").length >
            0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                UPCOMING
              </h2>

              <div className="space-y-3">
                {sampleCallLogs
                  .filter((call) => call.status === "upcoming")
                  .map((call) => (
                    <div
                      key={call.meetingId}
                      className="p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-sm">
                            {call.hostName}
                          </h3>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {formatDate(call.scheduledDate)}
                          </div>
                        </div>

                        <button className="px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-200 rounded text-xs font-medium">
                          Join
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Schedule Call Modal (simplified) */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-sm">
            <div className="p-4">
              <h3 className="text-lg font-medium mb-3">Schedule Call</h3>

              {/* Simplified form */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
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
}
