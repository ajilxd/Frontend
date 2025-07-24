import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  BarChart,
  ResponsiveContainer,
} from "recharts";

import { useSalesReportQuery } from "@/queries/admin/salesReport/useSalesReportQuery";
import SubscribersTable from "../components/SubscribersTable";

const SalesReportDashboard = () => {
  const { data: SalesReport } = useSalesReportQuery();
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 m-5">
        <Card>
          <CardHeader>
            <CardTitle>Yearly Sales & Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={SalesReport?.yearlyReport}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  name="Sales"
                />
                <Line
                  type="monotone"
                  dataKey="newCustomers"
                  stroke="#82ca9d"
                  name="New Customers"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Product</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={SalesReport?.subscriptionSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Sales" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-lg font-bold">{SalesReport?.totalRevenue}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Customers
                </p>
                <p className="text-lg font-bold">
                  {SalesReport?.activeCustomersCount}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Churn Rate</p>
                <p className="text-lg font-bold">{SalesReport?.churnRate}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lost Customers</p>
                <p className="text-lg font-bold">
                  {SalesReport?.lostCustomersCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upgrades & Failed Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Upgrades</p>
                <p className="text-lg font-bold">{SalesReport?.upgradeCount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Failed Payments</p>
                <p className="text-lg font-bold">
                  {SalesReport?.failedPaymentsCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <SubscribersTable />
    </>
  );
};

export default SalesReportDashboard;
