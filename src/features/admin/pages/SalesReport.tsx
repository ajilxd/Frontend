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
import { SubscriptionListTable } from "../components/SubscriptionTable";
import SubscriptionTable from "../components/SubscriptionsTable";

const dummyYearlyData = [
  { month: "Jan", sales: 120, newCustomers: 50, lostCustomers: 10 },
  { month: "Feb", sales: 150, newCustomers: 60, lostCustomers: 12 },
  { month: "Mar", sales: 200, newCustomers: 80, lostCustomers: 15 },
  { month: "Apr", sales: 180, newCustomers: 70, lostCustomers: 9 },
  { month: "May", sales: 220, newCustomers: 90, lostCustomers: 14 },
  { month: "Jun", sales: 250, newCustomers: 100, lostCustomers: 18 },
  { month: "Jul", sales: 300, newCustomers: 120, lostCustomers: 20 },
  { month: "Aug", sales: 280, newCustomers: 110, lostCustomers: 17 },
  { month: "Sep", sales: 260, newCustomers: 100, lostCustomers: 16 },
  { month: "Oct", sales: 310, newCustomers: 130, lostCustomers: 19 },
  { month: "Nov", sales: 320, newCustomers: 140, lostCustomers: 22 },
  { month: "Dec", sales: 400, newCustomers: 180, lostCustomers: 25 },
];

const SalesReportDashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 m-5">
        {/* Yearly Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Yearly Sales & Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dummyYearlyData}>
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
                <Line
                  type="monotone"
                  dataKey="lostCustomers"
                  stroke="#ff6b6b"
                  name="Lost Customers"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales by Product */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Product</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { product: "Product A", sales: 120 },
                  { product: "Product B", sales: 90 },
                  { product: "Product C", sales: 150 },
                  { product: "Product D", sales: 70 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" name="Sales" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Key Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Key Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-lg font-bold">$120,000</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Customers
                </p>
                <p className="text-lg font-bold">850</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Churn Rate</p>
                <p className="text-lg font-bold">5%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lost Customers</p>
                <p className="text-lg font-bold">45</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Expected Revenue
                </p>
                <p className="text-lg font-bold">$135,000</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upgrades & Failed Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Upgrades & Failed Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Upgrades</p>
                <p className="text-lg font-bold">30</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Failed Payments</p>
                <p className="text-lg font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <SubscriptionTable />
    </>
  );
};

export default SalesReportDashboard;
