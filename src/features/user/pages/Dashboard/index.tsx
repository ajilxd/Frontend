import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  Building2,
  Users,
  Crown,
  CheckCircle,
  Clock,
  ClipboardCheck,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/appStore";
import { useUserDashboardQuery } from "@/queries/users/dashboard/useUserDashboardQuery";

const UserDashboard = () => {
  const userId = useSelector((state: RootState) => state.user).id;
  if (!userId) {
    console.warn("Please login again -userId is missing");
    return;
  }
  const { data } = useUserDashboardQuery(userId);

  const completionPercentage = Math.round(
    (data?.taskStats.completed || 1 / (data?.taskStats.totalTasks || 1)) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            User Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your subscription, company info and tasks
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                <Activity className="w-5 h-5 text-blue-500" />
                Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {data?.subscriptionStats.name}
              </h3>
              <Badge
                variant="default"
                className={`px-3 py-1 ${
                  data?.subscriptionStats.status === "active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                }`}
              >
                {data?.subscriptionStats.status === "active"
                  ? "Active"
                  : "Inactive"}
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                <Building2 className="w-5 h-5 text-purple-500" />
                Company Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {data?.companyStats.name}
              </h3>

              <div className="space-y-3">
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
                    {data?.companyStats.totalUsers}
                  </Badge>
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
                    {completionPercentage}%
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                    completed
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <ClipboardCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        Assigned Tasks
                      </p>
                      <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                        {data?.taskStats.totalTasks}
                      </p>
                    </div>
                  </div>
                </div>

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
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
