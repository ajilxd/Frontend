import { Search, Filter } from "lucide-react";
import React, { useState, useEffect } from "react";

import { adminFetchSubscriptionsService } from "../api/admin.api";
import { SubscriptionType } from "../types/admin.model";

type Props = {
  updateFilteredSubscriptions: (data: SubscriptionType[]) => void;
};

export const SearchQueryNStatus: React.FC<Props> = ({
  updateFilteredSubscriptions,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [subscriptions, setSubscriptions] = useState<SubscriptionType[]>();

  useEffect(() => {
    async function adminFetchSubscriptions() {
      const response = await adminFetchSubscriptionsService();

      return response;
    }
    adminFetchSubscriptions()
      .then((response) => {
        if (response?.success) {
          if (response.data) {
            setSubscriptions(response.data);
          } else {
            setSubscriptions([]);
          }
        } else {
          throw new Error("error at fetching subscriptions");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const filteredSubscriptions =
      subscriptions &&
      subscriptions.filter((sub) => {
        const matchesSearch =
          sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.billingCycle.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          selectedStatus === "All" ||
          sub.isActive === (selectedStatus === "true");

        return matchesSearch && matchesStatus;
      });
    if (filteredSubscriptions) {
      updateFilteredSubscriptions(filteredSubscriptions);
    }
  }, [subscriptions, searchTerm, selectedStatus, updateFilteredSubscriptions]);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              className="bg-transparent focus:outline-none pr-8"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
