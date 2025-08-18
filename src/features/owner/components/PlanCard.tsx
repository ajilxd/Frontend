import { Features } from "@/types";
import { CheckIcon } from "lucide-react";

interface Plan {
  name: string;
  monthlyAmount?: number;
  yearlyAmount?: number;
  features?: Features;
  billingCycleType: string;
}

interface PlanCardProps extends Plan {
  onKnowMore?: () => void;
  onSubscribeMonthly?: () => void;
  onSubscribeYearly?: () => void;
  alreadySubscribed?: boolean;
  description: string;
  allowUpgrade: boolean;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  name,
  monthlyAmount,
  yearlyAmount,
  features,
  description,
  billingCycleType,
  alreadySubscribed,
  onSubscribeMonthly,
  onSubscribeYearly,
  allowUpgrade,
}) => {
  console.log("active subscription", alreadySubscribed);
  if (alreadySubscribed) {
    console.warn("Already have an active subscription");
  }

  const upgrade = !!allowUpgrade;
  console.log("point", upgrade);
  const condn = alreadySubscribed ? !upgrade : false;

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-6 hover:shadow-lg transition-shadow ">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      <div className="flex flex-col gap-4 ">
        {billingCycleType === "both" ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">
                ₹{monthlyAmount}
              </span>
              <span className="text-sm text-gray-500">/month</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">
                ₹{yearlyAmount}
              </span>
              <span className="text-sm text-gray-500">/year</span>
            </div>
          </div>
        ) : billingCycleType === "month" ? (
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-900">
              ₹{monthlyAmount}
            </span>
            <span className="text-sm text-gray-500">/month</span>
          </div>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-900">
              ₹{yearlyAmount}
            </span>
            <span className="text-sm text-gray-500">/year</span>
          </div>
        )}
      </div>

      <ul className="flex flex-col gap-3">
        {features ? (
          <>
            <li className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">
                {features.managerCount} Managers
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">
                {features.userCount} Users
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">
                {features.spaces} Spaces
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">
                {features.chat ? "Chat Included" : "No Chat"}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">
                {features.meeting ? "Meeting Included" : "No Meeting"}
              </span>
            </li>
          </>
        ) : (
          <li className="text-sm text-gray-500">No features listed</li>
        )}
      </ul>

      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
        {billingCycleType === "both" ? (
          <>
            <button
              onClick={onSubscribeMonthly}
              className={`flex-1 px-4 py-2  bg-blue-600 ${
                upgrade && `bg-yellow-600`
              } hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors`}
              disabled={condn}
            >
              <p>Subscribe monthly {upgrade && `upgrade`}</p>
            </button>
            <button
              onClick={onSubscribeYearly}
              className={`flex-1 px-4 py-2 bg-green-600 ${
                upgrade && `bg-yellow-600`
              } hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors`}
              disabled={condn}
            >
              <p>Subscribe yearly {upgrade && `upgrade`}</p>
            </button>
          </>
        ) : billingCycleType === "month" ? (
          <button
            onClick={onSubscribeMonthly}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
            disabled={condn}
          >
            Subscribe
          </button>
        ) : (
          <button
            onClick={onSubscribeYearly}
            className={`w-full px-4 py-2 ${
              upgrade && `bg-yellow-600`
            }  bg-green-600  hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors`}
            disabled={condn}
          >
            {!upgrade ? `Subscribe` : `Upgrade`}
          </button>
        )}
      </div>
    </div>
  );
};
