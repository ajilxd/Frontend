import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building2,
  Users,
  CheckCircle,
  Clock,
  Crown,
  Activity,
} from "lucide-react";
import { useManagerDashboardQuery } from "@/queries/managers/dashboard/useManagerDashboardQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/appStore";

const CompanyDashboard = () => {
  const managerId = useSelector((state: RootState) => state.manager).id;
  if (!managerId) {
    console.warn("Try login again - manager Id is missing");
  }
  const { data } = useManagerDashboardQuery(managerId);
  console.log(data);
  const completionPercentage =
    (data?.taskStats.completed || 1 / (data?.taskStats.totalTasks || 1)) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Company Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor your company performance and team activities
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                <Activity className="w-5 h-5 text-blue-500" />
                Subscription Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {data?.subscriptionStats.name}
                </h3>
                <Badge
                  variant={
                    data?.subscriptionStats.status === "active"
                      ? "default"
                      : "secondary"
                  }
                  className={`${
                    data?.subscriptionStats.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  } px-3 py-1`}
                >
                  {data?.subscriptionStats.status === "active"
                    ? "Active"
                    : "Inactive"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                <Building2 className="w-5 h-5 text-purple-500" />
                Company Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {data?.companyStats.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {data?.companyStats.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Total Users
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {data?.totalUsers || 0}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Owner
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {data?.companyStats.owner}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Task Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Overall Progress
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {data?.taskStats.completed}/{data?.taskStats.totalTasks}{" "}
                    tasks
                  </span>
                </div>
                <Progress value={completionPercentage} className="h-3" />
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {Math.round(completionPercentage)}%
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                    completed
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm font-medium text-green-700 dark:text-green-300">
                        Completed Tasks
                      </p>
                      <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                        {data?.taskStats.completed}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    <div>
                      <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                        Due Tasks
                      </p>
                      <p className="text-2xl font-bold text-amber-800 dark:text-amber-200">
                        {data?.taskStats.dueTasks}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              <Users className="w-5 h-5 text-blue-500" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data?.userData.map((user) => (
                <div
                  key={user.name}
                  className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold">
                      {user.name.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {user.role}
                    </p>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : "secondary"
                      }
                      className={`text-xs ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {user.status === "active" ? "Active" : "Inactive"}
                    </Badge>
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

export default CompanyDashboard;
