import {
  Users,
  CreditCard,
  DollarSign,
  Building2,
  Eye,
  Star,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "../../components/StatCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminDashboardQuery } from "@/queries/admin/dashboard/useDashboardQuery";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { data } = useAdminDashboardQuery();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm sm:text-base">
                Overview of your project management platform
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Subscriptions"
              value={data?.totalSubscriptions || 0}
              icon={CreditCard}
              additionalInfo={``}
            />

            <StatCard
              title="Total Users"
              value={data?.totalUsers || 0}
              icon={Users}
              additionalInfo={``}
            />

            <StatCard
              title="Total Revenue"
              value={data?.totalRevenue || 0}
              icon={DollarSign}
              additionalInfo={``}
            />

            <StatCard
              title="Total Companies"
              value={data?.totalCompanies || 0}
              icon={Building2}
              additionalInfo={``}
            />
          </div>
        </section>

        <section>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <Star className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-slate-900 dark:text-slate-100">
                      Latest Subscriptions
                    </CardTitle>
                  </div>
                </div>
                {/* navigate to companies page */}
                {/* <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View All Companies
                </Button> */}
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200 dark:border-slate-800">
                      <TableHead className="text-slate-600 dark:text-slate-400">
                        Company
                      </TableHead>
                      <TableHead className="text-slate-600 dark:text-slate-400">
                        Plan
                      </TableHead>
                      <TableHead className="text-slate-600 dark:text-slate-400">
                        Customer
                      </TableHead>
                      <TableHead className="text-right text-slate-600 dark:text-slate-400">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.topSubscriptions &&
                      data.latestSubscribers.map((sub, index) => (
                        <TableRow
                          key={sub._id}
                          className="border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                        >
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-9 h-9 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-lg flex items-center justify-center">
                                <span className="text-slate-700 dark:text-slate-300 font-semibold text-sm">
                                  {sub.company.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                                  {sub.company}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  Rank #{index + 1}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge>{sub.name}</Badge>
                          </TableCell>
                          <TableCell className="text-slate-600 dark:text-slate-400">
                            {sub.customerName}
                          </TableCell>
                          <TableCell className="text-right font-semibold text-slate-900 dark:text-slate-100">
                            {sub.amount}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Subscription Stats
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              onClick={() => navigate("/admin/dashboard/subscriptions")}
            >
              View More
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data &&
              data?.topSubscriptions?.map((subscription) => (
                <Card
                  key={subscription._id}
                  className={`border-slate-200 dark:border-slate-800 hover:shadow-md dark:hover:shadow-lg transition-all duration-200 ${subscription.color}`}
                >
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">
                      {subscription.name}
                    </h3>

                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Status:{" "}
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full ${
                          subscription.isActive
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {subscription.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Billing Cycle:{" "}
                      <span className="font-medium text-slate-900 dark:text-slate-100">
                        {subscription.billingCycleType.charAt(0).toUpperCase() +
                          subscription.billingCycleType.slice(1)}
                      </span>
                    </div>

                    <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                      {subscription.billingCycleType === "both" && (
                        <>
                          <li>
                            Yearly:{" "}
                            <span className="font-semibold">
                              ₹{subscription.yearlyAmount}
                            </span>
                          </li>
                          <li>
                            Monthly:{" "}
                            <span className="font-semibold">
                              ₹{subscription.monthlyAmount}
                            </span>
                          </li>
                        </>
                      )}
                      {subscription.billingCycleType === "month" && (
                        <li>
                          Monthly:{" "}
                          <span className="font-semibold">
                            ₹{subscription.monthlyAmount}
                          </span>
                        </li>
                      )}
                      {subscription.billingCycleType === "year" && (
                        <li>
                          Yearly:{" "}
                          <span className="font-semibold">
                            ₹{subscription.yearlyAmount}
                          </span>
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
