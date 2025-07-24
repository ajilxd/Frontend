import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import { PaginationComponent } from "@/shared/components/Pagination";
import { debounce } from "@/utils/debounce";
import { SubscriptionType } from "@/types";
import { SubscriptionMorePopOver } from "../components/SubscriptionMorePopOver";
import { useSubscriptonsQuery } from "@/queries/admin/subscriptions/useSubscripitonQuery";
import { adminToggleSubscriptionStatus } from "../api/admin.api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const Subscription = () => {
  const [search, setSearch] = useState("");
  const [keystroke, setKeystroke] = useState("");
  const [billingCycle, setBillingCycle] = useState("");
  const [status, setStatus] = useState("");
  const [edit, setEdit] = useState(false);
  const [page, setPage] = useState(1);
  const { data } = useSubscriptonsQuery(page, 10, search, billingCycle, status);
  console.log(data);
  const queryClient = useQueryClient();

  const memoisedPageUpdater = useCallback((page: number) => {
    setPage(page);
  }, []);

  const debouncedSetSearch = useCallback(
    debounce((value) => setSearch(value), 500),
    []
  );

  const handleBillingCycleChange = useCallback((value: string) => {
    setBillingCycle(value === "all" ? "" : value);
    setPage(1);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setStatus(value === "all" ? "" : value);
    setPage(1);
  }, []);

  const handleDisableSubscription = useCallback(
    async (subscription: SubscriptionType) => {
      const res = await adminToggleSubscriptionStatus(subscription._id);
      if (res.success) {
        toast.success(`Status changed succesfully for ${subscription.name}`);
        queryClient.invalidateQueries({
          queryKey: [
            "admin",
            "subscriptions",
            { page, search, billingCycle, status },
          ],
        });
      } else {
        toast.error("Try again later");
      }
    },
    []
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getBillingCycleColor = (cycle: string) => {
    switch (cycle) {
      case "monthly":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800";
      case "yearly":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800";
      case "both":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800";
      default:
        return "bg-secondary text-secondary-foreground border-secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800";
      case "inactive":
        return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800";

      default:
        return "bg-secondary text-secondary-foreground border-secondary";
    }
  };

  return (
    <>
      <div className="w-full space-y-4 bg-background">
        <div className="bg-card text-card-foreground rounded-lg shadow border">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold pt-4 pb-5">All Subscriptions</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  placeholder="Search by plan name..."
                  value={keystroke}
                  onChange={(e) => {
                    const value = e.target.value;
                    setKeystroke(value);
                    debouncedSetSearch(value);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground "
                />
              </div>
              <select
                value={billingCycle}
                onChange={(e) => handleBillingCycleChange(e.target.value)}
                className="w-full sm:w-36 px-3 py-2  border border-input rounded-md bg-background text-foreground "
              >
                <option value="">All Cycles</option>
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
                <option value="both">Yearly&Monthly</option>
              </select>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full sm:w-36 px-3 py-2 border border-input rounded-md bg-background text-foreground "
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="p-6">
            {data && data.subscriptions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No subscriptions found matching "{search}"</p>
                <p className="text-sm mt-1">Try searching by plan name</p>
              </div>
            ) : (
              <>
                <div className="hidden md:block h-[480px] overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          No
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Plan
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Billing Cycle
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Date Created
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          No of Users
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {data &&
                        data.subscriptions?.map((subscription, index) => (
                          <tr
                            key={subscription._id}
                            className="hover:bg-muted/50"
                          >
                            <td className="px-4 py-4 whitespace-nowrap text-sm">
                              {(page - 1) * 10 + index + 1}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                  {subscription.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {subscription.description}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              {subscription.billingCycleType === "both" ? (
                                <div className="text-xs text-muted-foreground">
                                  <p>
                                    Monthly - ₹ {subscription.monthlyAmount}
                                  </p>
                                  <p>Yearly - ₹ {subscription.yearlyAmount}</p>
                                </div>
                              ) : (
                                <p className="text-xs text-muted-foreground">
                                  {subscription.billingCycleType === "month"
                                    ? "₹ " + subscription.monthlyAmount
                                    : "₹ " + subscription.yearlyAmount}
                                </p>
                              )}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBillingCycleColor(
                                  subscription.billingCycleType
                                )}`}
                              >
                                {subscription.billingCycleType}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                                  subscription.isActive ? "active" : "inactive"
                                )}`}
                              >
                                {subscription.isActive ? "active" : "inactive"}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm">
                              {formatDate("" + subscription.createdAt)}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">
                                  {"" + subscription.userCount}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <SubscriptionMorePopOver
                                subscription={subscription}
                                handleDisableSubscription={
                                  handleDisableSubscription
                                }
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <div className="md:hidden space-y-4">
                  {data &&
                    data.subscriptions?.map((subscription) => (
                      <div
                        key={subscription._id}
                        className="p-4 bg-card border rounded-lg"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">
                                {subscription.name}
                              </p>
                              {subscription.billingCycleType === "both" ? (
                                <div className="text-xs text-muted-foreground">
                                  <p>
                                    Monthly - ₹ {subscription.monthlyAmount}
                                  </p>
                                  <p>Yearly - ₹ {subscription.yearlyAmount}</p>
                                </div>
                              ) : (
                                <p className="text-xs text-muted-foreground">
                                  {subscription.billingCycleType === "month"
                                    ? subscription.monthlyAmount
                                    : subscription.yearlyAmount}{" "}
                                  / {subscription.billingCycleType}
                                </p>
                              )}
                            </div>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                                subscription.isActive ? "active" : "inactive"
                              )}`}
                            >
                              {subscription.isActive ? "active" : "inactive"}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <span className="text-muted-foreground">
                                Billing:
                              </span>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBillingCycleColor(
                                  subscription.billingCycleType
                                )}`}
                              >
                                {subscription.billingCycleType}
                              </span>
                            </div>
                            <span className="text-muted-foreground">
                              Created {formatDate("" + subscription.createdAt)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="text-muted-foreground">
                              Users: {"" + subscription.userCount}
                            </div>
                            <SubscriptionMorePopOver
                              subscription={subscription}
                              handleEditSubscription={() =>
                                handleEditSubscription(subscription)
                              }
                              handleDisableSubscription={
                                handleDisableSubscription
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <PaginationComponent
        paginationHandler={memoisedPageUpdater}
        currentPage={page}
        totalPages={data?.totalPage ?? 1}
      />
    </>
  );
};

export default Subscription;
