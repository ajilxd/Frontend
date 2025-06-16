import React from "react";

import { SubscriptionType } from "@/types";
import { adminToggleSubscriptionStatus } from "../api/admin.api";
import { enqueueSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";

type Prop = {
  subscriptions: SubscriptionType[];
};

export const SubscriptionListTable: React.FC<Prop> = ({ subscriptions }) => {
  const queryClient = useQueryClient();

  const getStatusBadgeClass = (status: string) => {
    if (status) {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    } else {
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    }
  };

  const handleSubscriptionStatusChange = async (id: string, name: string) => {
    const res = await adminToggleSubscriptionStatus(id);
    if (res.success) {
      enqueueSnackbar(`subscription status changed succesfully for ${name}`, {
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["admin", "subscriptions"] });
    } else {
      enqueueSnackbar(`try again later ....`);

      console.warn(res.message);
    }
  };

  return (
    <div className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {subscriptions.length} Subscriptions
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {[
                "Plan",
                "Amount",
                "Billing",
                "Status",
                "Date Created",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {subscriptions.length > 0 ? (
              subscriptions.map((subscription, index) => (
                <tr
                  key={`subscription.name${index}`}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {subscription.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {subscription.amount} $
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      per {subscription.billingCycle.toLowerCase()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                    {subscription.billingCycle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        subscription.isActive ? "active" : "inactive"
                      )}`}
                    >
                      {subscription.isActive ? "active" : "inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                    {new Date(subscription.createdAt as any).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </td>
                  <td>
                    <button
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors
      ${
        subscription.isActive
          ? "bg-red-100 text-red-700 hover:bg-red-200"
          : "bg-green-100 text-green-700 hover:bg-green-200"
      }`}
                      onClick={() =>
                        handleSubscriptionStatusChange(
                          subscription._id,
                          subscription.name
                        )
                      }
                    >
                      {subscription.isActive ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-base font-medium">
                      No subscriptions found
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
