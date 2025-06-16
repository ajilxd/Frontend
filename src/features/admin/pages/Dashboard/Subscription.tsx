import { PlusCircle } from "lucide-react";
import { useCallback, useState } from "react";

import { AddSubscriptionForm } from "../../components/AddSubscriptionForm";
import { SearchQueryNStatus } from "../../components/SearchQueryNStatus";
import { SubscriptionListTable } from "../../components/SubscriptionTable";
import { SubscriptionType } from "@/types";

const Subscription = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<
    SubscriptionType[]
  >([]);

  const updateFilteredSubscriptions = useCallback(
    (value: SubscriptionType[]) => {
      setFilteredSubscriptions(value);
    },
    []
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Subscription Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage and monitor your customer subscriptions
        </p>
      </div>

      <SearchQueryNStatus
        updateFilteredSubscriptions={updateFilteredSubscriptions}
      />
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Subscription</span>
        </button>
      </div>
      {showAddForm && (
        <AddSubscriptionForm
          setShowAddForm={() => setShowAddForm(!showAddForm)}
          showAddForm={showAddForm}
        />
      )}

      <SubscriptionListTable subscriptions={filteredSubscriptions} />
    </div>
  );
};

export default Subscription;
