import { enqueueSnackbar } from "notistack";
import { useState, useEffect, useCallback } from "react";
import {
  User,
  Shield,
  ShieldOff,
  Calendar,
  Mail,
  CreditCard,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PaginationComponent } from "@/shared/components/Pagination";

import { adminToggleOwnerStatus } from "../../api/admin.api";
import { useOwnersQuery } from "@/queries/admin/owners/userOwnerQuery";

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {Array.from({ length: 7 }).map((_, i) => (
      <td key={`skeleton-${i}`} className="px-6 py-4">
        <div
          className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-shimmer ${
            i === 1 ? "w-12 h-12 rounded-full" : "h-4 w-3/4"
          }`}
          style={{ backgroundSize: "200% 100%" }}
        ></div>
      </td>
    ))}
  </tr>
);

const OwnersTable = () => {
  const [page, setPage] = useState(1);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  const { data, isLoading, refetch } = useOwnersQuery(page);

  useEffect(() => {
    if (data) console.log("Owners Data: ", data);
  }, [data]);

  const memoisedPageUpdater = useCallback((page: number) => {
    setPage(page);
  }, []);

  const toggleStatusHandler = async (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));

    try {
      const res = await adminToggleOwnerStatus(id);
      if (res.success) {
        enqueueSnackbar("Owner status updated successfully", {
          variant: "success",
        });
        await refetch();
      } else {
        enqueueSnackbar("Owner status update failed!", {
          variant: "error",
        });
        console.error(res.message);
      }
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const getStatusColor = (isBlocked: boolean) => {
    return isBlocked
      ? "bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200 dark:from-red-900/20 dark:to-red-800/20 dark:text-red-300 dark:border-red-800/30"
      : "bg-gradient-to-r from-emerald-50 to-green-100 text-emerald-700 border border-emerald-200 dark:from-emerald-900/20 dark:to-green-800/20 dark:text-emerald-300 dark:border-emerald-800/30";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Owners Management
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 ml-14">
            Manage and monitor owner accounts, subscriptions, and status
          </p>
        </div>

        {/* Main Table Container */}
        <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 shadow-2xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          {/* Table Header with gradient */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Owner Accounts
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                {data?.users?.length || 0} Total Owners
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700">
                <tr>
                  {[
                    { label: "Owner", icon: User },
                    { label: "Avatar", icon: null },
                    { label: "Email", icon: Mail },
                    { label: "Joined", icon: Calendar },
                    { label: "Plan", icon: CreditCard },
                    { label: "Status", icon: Shield },
                    { label: "Actions", icon: null },
                  ].map((header, index) => (
                    <th
                      key={header.label}
                      className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-center gap-2">
                        {header.icon && (
                          <header.icon className="h-4 w-4 opacity-60" />
                        )}
                        {header.label}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonRow key={`loading-${i}`} />
                  ))
                ) : data?.users && data?.users?.length > 0 ? (
                  data.users.map((owner, index) => (
                    <tr
                      key={owner._id}
                      className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/10 dark:hover:to-purple-900/10 transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-lg"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Name */}
                      <td className="px-6 py-5">
                        <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                          {owner.name}
                        </div>
                      </td>

                      {/* Avatar */}
                      <td className="px-6 py-5">
                        <div className="relative">
                          <Avatar className="h-12 w-12 ring-2 ring-gray-200 dark:ring-gray-600 group-hover:ring-blue-300 dark:group-hover:ring-blue-500 transition-all duration-300 shadow-lg">
                            <AvatarImage src={owner.image} alt={owner.name} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                              {owner.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 shadow-sm"></div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-5">
                        <div className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-200">
                          {owner.email}
                        </div>
                      </td>

                      {/* Created Date */}
                      <td className="px-6 py-5">
                        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          {new Date(owner.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </td>

                      {/* Subscription */}
                      <td className="px-6 py-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 border border-indigo-200 dark:from-indigo-900/20 dark:to-blue-900/20 dark:text-indigo-300 dark:border-indigo-800/30">
                          <CreditCard className="h-3 w-3" />
                          {owner.subscription?.name ?? "Free Plan"}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${getStatusColor(
                            owner.isBlocked
                          )}`}
                        >
                          {owner.isBlocked ? (
                            <ShieldOff className="h-3 w-3" />
                          ) : (
                            <Shield className="h-3 w-3" />
                          )}
                          {owner.isBlocked ? "Inactive" : "Active"}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <button
                          className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg ${
                            owner.isBlocked
                              ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white focus:ring-green-500 shadow-green-200 dark:shadow-green-900/20"
                              : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white focus:ring-red-500 shadow-red-200 dark:shadow-red-900/20"
                          } ${
                            loadingStates[owner._id]
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:shadow-xl"
                          }`}
                          onClick={() => toggleStatusHandler(owner._id)}
                          disabled={loadingStates[owner._id]}
                        >
                          {loadingStates[owner._id] ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : owner.isBlocked ? (
                            <Shield className="h-4 w-4" />
                          ) : (
                            <ShieldOff className="h-4 w-4" />
                          )}
                          {loadingStates[owner._id]
                            ? "Processing..."
                            : owner.isBlocked
                            ? "Activate"
                            : "Deactivate"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center px-6 py-16">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full">
                          <User className="h-8 w-8 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                            No owners found
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400">
                            No owner accounts are currently registered in the
                            system.
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {data && data.totalPage > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 rounded-2xl shadow-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <PaginationComponent
                totalPages={data?.totalPage || 1}
                currentPage={page}
                paginationHandler={memoisedPageUpdater}
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default OwnersTable;
