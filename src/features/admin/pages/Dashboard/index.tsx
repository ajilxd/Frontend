import ActivityItem from "../../components/ActivityItem";
import DashboardCard from "../../components/DashboardCard";

export default function AdminDashboard() {
  return (
    <>
      {/* Dashboard Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Welcome back to your dashboard
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DashboardCard title="Total Users" value="12,345" change="+12%" />
        <DashboardCard title="New Orders" value="450" change="+5%" />
        <DashboardCard title="Revenue" value="$45,678" change="+8%" />
        <DashboardCard
          title="Conversion"
          value="3.45%"
          change="-2%"
          isNegative={true}
        />
      </div>

      {/* Analytics and Recent Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Analytics */}
        <div className="bg-white dark:bg-gray-800 lg:col-span-2 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Sales Analytics</h2>
          <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              Chart component would render here
            </p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <ActivityItem title="New user registered" time="2 min ago" />
            <ActivityItem title="New order received" time="1 hour ago" />
            <ActivityItem title="Server update completed" time="2 hours ago" />
            <ActivityItem title="Database backup created" time="Yesterday" />
          </div>
        </div>
      </div>
    </>
  );
}
