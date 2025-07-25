import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Calendar,
  Users,
  FolderOpen,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useOwnerDashboardQuery } from "@/queries/owners/dashboard/useOwnerDashboardQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/appStore";

const OwnerDashboard = () => {
  const ownerData = useSelector((state: RootState) => state.owner);
  if (!ownerData._id) {
    return console.warn("no owner Id found");
  }
  const { data } = useOwnerDashboardQuery(ownerData._id);

  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getProgressPercentage = (current: any, total: any) => {
    return (current / total) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8 rounded-3xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor your subscription and team performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Subscription Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {data?.subscripitionData.name}
              </h3>
              <Badge
                variant={
                  data?.subscripitionData.status === "active"
                    ? "default"
                    : "secondary"
                }
                className={
                  data?.subscripitionData.status === "active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : ""
                }
              >
                {data?.subscripitionData.status === "active"
                  ? "Active"
                  : "Inactive"}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Billing Amount
                </span>
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {data?.subscripitionData.amount}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>
                  Next billing:{" "}
                  {formatDate(data?.subscripitionData.billingDate)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Subscription Quota Section */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Usage Quota
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Managers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Managers
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {data?.quotaData.ownManagers}/{data?.quotaData.managerLimit}
                </span>
              </div>
              <Progress
                value={getProgressPercentage(
                  data?.quotaData.ownManagers,
                  data?.quotaData.managerLimit
                )}
                className="h-2"
              />
            </div>

            {/* Spaces */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Spaces
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {data?.quotaData.ownSpaces}/{data?.quotaData.spaceLimit}
                </span>
              </div>
              <Progress
                value={getProgressPercentage(
                  data?.quotaData.ownSpaces,
                  data?.quotaData.spaceLimit
                )}
                className="h-2"
              />
            </div>

            {/* Users */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Users
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {data?.quotaData.ownUsers}/{data?.quotaData.userLimit}
                </span>
              </div>
              <Progress
                value={getProgressPercentage(
                  data?.quotaData.ownUsers,
                  data?.quotaData.userLimit
                )}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* 3. Spaces Statistics Section */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Spaces Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="hidden md:grid md:grid-cols-4 md:gap-4 md:pb-2 md:border-b border-gray-200 dark:border-gray-700">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Space Name
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Users
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Managers
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tasks
                </div>
              </div>

              {data?.ownerSpaces.map((space) => (
                <div
                  key={space.id}
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors md:grid md:grid-cols-4 md:gap-4 md:items-center md:border-0 md:p-2"
                >
                  <div className="md:hidden space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {space.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {space.users} Users
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      >
                        {space.managers} Managers
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                      >
                        {space.tasks} Tasks
                      </Badge>
                    </div>
                  </div>

                  <div className="hidden md:block font-medium text-gray-900 dark:text-gray-100">
                    {space.name}
                  </div>
                  <div className="hidden md:block">
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {space.users}
                    </Badge>
                  </div>
                  <div className="hidden md:block">
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      {space.managers}
                    </Badge>
                  </div>
                  <div className="hidden md:block">
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                    >
                      {space.tasks}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 lg:col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Manager Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data?.managerData.map((manager) => (
                <div
                  key={manager.name}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt={manager.name} />
                    <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                      {manager.name.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {manager.name}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {manager.status === "active" ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-500" />
                      )}
                      <Badge
                        variant={
                          manager.status === "active"
                            ? "default"
                            : "destructive"
                        }
                        className={`text-xs ${
                          manager.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {manager.status === "active" ? "Active" : "Blocked"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerDashboard;
