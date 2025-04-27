import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DefaultDashboard = () => {
  const [stats] = useState({
    activeSpaces: 5,
    tasksDue: 12,
  });

  const [activities] = useState([
    { id: 1, text: "John updated Task #123", color: "bg-blue-500" },
    { id: 2, text: "Sarah added Doc #456", color: "bg-green-500" },
    { id: 3, text: "Team added new member", color: "bg-purple-500" },
  ]);

  const [chats] = useState([
    { id: 1, name: "Team Sync", unread: 3, color: "bg-blue-500" },
    { id: 2, name: "Project X", unread: 1, color: "bg-green-500" },
    { id: 3, name: "General", unread: 5, color: "bg-purple-500" },
  ]);

  const [projects] = useState([
    {
      id: "project-alpha",
      name: "Project Alpha",
      color: "bg-blue-500",
      members: 8,
      tasks: 15,
    },
    {
      id: "project-beta",
      name: "Project Beta",
      color: "bg-green-500",
      members: 5,
      tasks: 10,
    },
  ]);

  const [taskStatus] = useState([
    { status: "Completed", value: 60, color: "text-green-500" },
    { status: "In Progress", value: 25, color: "text-blue-500" },
    { status: "Pending", value: 15, color: "text-red-500" },
  ]);

  return (
    <>
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Overview Widget */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Active Spaces
                </p>
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {stats.activeSpaces}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Tasks Due
                </p>
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {stats.tasksDue}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Progress - replaced chart with progress text */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Task Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-4">
              {taskStatus.map((item) => (
                <div key={item.status} className="mb-3 last:mb-0">
                  <div className="flex justify-between text-sm mb-1">
                    <span className={`font-medium ${item.color}`}>
                      {item.status}
                    </span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        item.status === "Completed"
                          ? "bg-green-500"
                          : item.status === "In Progress"
                          ? "bg-blue-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {activities.map((activity) => (
                <li key={activity.id} className="flex items-center">
                  <span
                    className={`w-1.5 h-1.5 ${activity.color} rounded-full mr-2`}
                  ></span>
                  {activity.text}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Active Chats */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Active Chats
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <ul className="space-y-2">
              {chats.map((chat) => (
                <li key={chat.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span
                      className={`w-1.5 h-1.5 ${chat.color} rounded-full mr-2`}
                    ></span>
                    <span className="text-sm">{chat.name}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                    {chat.unread}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Space Highlights */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Space Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-900 transition-colors"
                >
                  <div className="flex items-center mb-3">
                    <span
                      className={`w-2.5 h-2.5 ${project.color} rounded-full mr-2`}
                    ></span>
                    <h3 className="text-sm font-medium">{project.name}</h3>
                  </div>
                  <div className="space-y-1 mb-3">
                    <p className="text-xs flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Members:
                      </span>
                      <span className="font-medium">{project.members}</span>
                    </p>
                    <p className="text-xs flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Tasks:
                      </span>
                      <span className="font-medium">{project.tasks} open</span>
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 text-xs"
                  >
                    View Space
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DefaultDashboard;
