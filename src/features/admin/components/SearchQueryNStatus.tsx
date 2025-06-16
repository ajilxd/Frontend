import { Search, Filter } from "lucide-react";
import React, { useState, useEffect } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useSubscriptonsQuery } from "@/queries/admin/subscriptions/useSubscripitonQuery";

import { SubscriptionType } from "@/types";

type Props = {
  updateFilteredSubscriptions: (data: SubscriptionType[]) => void;
};

export const SearchQueryNStatus: React.FC<Props> = ({
  updateFilteredSubscriptions,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const { data: subscriptions } = useSubscriptonsQuery();

  useEffect(() => {
    const filteredSubscriptions =
      subscriptions &&
      subscriptions.filter((sub) => {
        const matchesSearch =
          sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.billingCycle.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          selectedStatus === "all" ||
          sub.isActive === (selectedStatus === "active" ? true : false);

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

        <div className="relative">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <Filter className="h-4 w-4 text-gray-400" />
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-gray-700">
                  All Status
                </SelectItem>
                <SelectItem value="active" className="text-green-500">
                  Active
                </SelectItem>
                <SelectItem value="inactive" className="text-red-500">
                  Inactive
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
