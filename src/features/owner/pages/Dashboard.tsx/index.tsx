import { Bell, User, Settings, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import ActivityItem from "../../components/ActivityItem";

export default function DefaultDashboard() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,024</p>
            <p className="text-sm text-gray-400">Active this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$12,340</p>
            <p className="text-sm text-gray-400">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">380</p>
            <p className="text-sm text-gray-400">This month</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ActivityItem
              icon={<User size={16} />}
              title="John Doe signed up"
              description="2 hours ago"
            />
            <ActivityItem
              icon={<Settings size={16} />}
              title="Settings updated"
              description="5 hours ago"
            />
            <ActivityItem
              icon={<LayoutDashboard size={16} />}
              title="New dashboard created"
              description="1 day ago"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button>Invite User</Button>
            <Button variant="outline">Generate Report</Button>
            <Button variant="ghost">Reset Data</Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
