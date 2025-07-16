import { CheckIcon } from "lucide-react";

interface Plan {
  name: string;
  amount: string;
  features?: string[];
}

interface PlanCardProps extends Plan {
  onKnowMore?: () => void;
  onSubscribe?: () => void;
  onCancel?: () => void;
  alreadySubscribed?: boolean;
  description: string;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  name,
  amount,
  features = [],
  description,
  alreadySubscribed,
  onSubscribe,
}) => {
  if (alreadySubscribed) {
    console.warn("Already have an active subscription");
  }
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 transition-shadow hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
      </div>

      <div className="mb-4">
        <span className="text-3xl font-bold text-gray-900">${amount}</span>
        <span className="text-sm text-gray-500">/month</span>
      </div>

      <div className="mb-4">
        <span className="text-gray-700 text-sm">{description}</span>
      </div>

      <ul className="mb-6 space-y-3">
        {features.length > 0 ? (
          features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-500">No features listed</li>
        )}
      </ul>

      <div className="flex gap-3">
        <button
          onClick={onSubscribe}
          // disabled={alreadySubscribed}
          className={`px-4 py-2 ${"bg-blue-600 hover:bg-blue-700"} text-white text-sm font-medium rounded-md transition-colors flex-1`}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};
