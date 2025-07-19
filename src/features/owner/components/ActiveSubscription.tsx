import { useNavigate } from "react-router-dom";

import { OwnerSubscriptionType } from "@/types";

import { ActivePlanDialog } from "./Modal/ActivePlanDialog";
import { CancelSubscriptionDialog } from "./Modal/CancelSubscripitionModel";
import { Boxes, Building, MessageCircleHeart, User, Video } from "lucide-react";

interface ActiveSubscriptionProps {
  activePlan?: OwnerSubscriptionType;
}

export const ActiveSubscription: React.FC<ActiveSubscriptionProps> = ({
  activePlan,
}) => {
  console.log("active plan from page", activePlan);
  const navigate = useNavigate();
  if (!activePlan) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-6 text-center text-gray-500">
        No active plan available
      </div>
    );
  }

  const nextBillingDate = activePlan.expires_at
    ? new Date(activePlan.expires_at).toDateString()
    : "N/A";

  const subscribedDate = activePlan.created
    ? new Date(activePlan.created).toDateString()
    : "N/A";

  // Determine billing cycle (default: month)
  let billingCycle = "month";
  if (activePlan.created && activePlan.expires_at) {
    const oneYearFromCreated = new Date(activePlan.created);
    oneYearFromCreated.setFullYear(oneYearFromCreated.getFullYear() + 1);
    const expiresAt = new Date(activePlan.expires_at);

    if (
      expiresAt.getFullYear() === oneYearFromCreated.getFullYear() &&
      expiresAt.getMonth() === oneYearFromCreated.getMonth()
    ) {
      billingCycle = "year";
    }
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-xl font-semibold text-gray-900">
              {activePlan.name || "Unnamed Plan"}
            </h3>
            <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {activePlan.status || "unknown"}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Next billing date: {nextBillingDate}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Subscribed on: {subscribedDate}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              ₹{activePlan.amount || "0"}
            </span>
            <span className="text-sm text-gray-500">/{billingCycle}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:self-start">
          <ActivePlanDialog activePlan={activePlan} />
          <CancelSubscriptionDialog
            subscriptionId={"" + activePlan.stripe_subscription_id}
          />
          <button
            className="px-4 py-2 bg-blue-50 text-blue-600 hover:text-blue-700 hover:bg-blue-100 border border-blue-200 text-sm font-medium rounded-md transition-colors duration-200"
            onClick={() => navigate("/owner/dashboard/invoices")}
          >
            View Invoice History
          </button>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <h4 className="text-base font-semibold text-gray-900 mb-4">
          Your Plan Features
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activePlan.features ? (
            <>
              <div className="bg-gray-50 p-3 rounded-md text-gray-700 text-sm">
                <div className="flex gap-2">
                  <Boxes size={24} />
                  No of users {activePlan.features.userCount}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md text-gray-700 text-sm">
                <div className="flex gap-2">
                  <User size={24} />
                  No of users {activePlan.features.userCount}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md text-gray-700 text-sm">
                <div className="flex gap-2">
                  <Building size={24} />
                  No of spaces {activePlan.features.spaces}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md text-gray-700 text-sm">
                {activePlan.features.meeting && (
                  <div className="flex gap-2">
                    <MessageCircleHeart size={24} />
                    Chat included for groups
                  </div>
                )}
              </div>
              <div className="bg-gray-50 p-3 rounded-md text-gray-700 text-sm">
                {activePlan.features.meeting && (
                  <div className="flex gap-2">
                    <Video size={24} />
                    Meeting included for groups
                  </div>
                )}
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">No features listed.</p>
          )}
        </div>
      </div>
    </div>
  );
};
