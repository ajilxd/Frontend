import { SubscriptionType } from "@/types";
import { MoreHorizontal, Edit, Ban } from "lucide-react";
import { useState } from "react";

type Props = {
  subscription: SubscriptionType;
  handleEditSubscription: (subscription: SubscriptionType) => void;
  handleDisableSubscription: (subscription: SubscriptionType) => void;
};

export const SubscriptionMorePopOver: React.FC<Props> = ({
  subscription,
  handleEditSubscription,
  handleDisableSubscription,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 p-0 flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 z-10 w-48 p-2 bg-popover border border-border rounded-md shadow-lg">
          <div className="space-y-1">
            <button
              className="w-full flex items-center justify-start text-sm h-8 px-2 rounded hover:bg-accent hover:text-accent-foreground text-left"
              onClick={() => {
                handleEditSubscription(subscription);
                setIsOpen(false);
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </button>
            <button
              className="w-full flex items-center justify-start text-sm h-8 px-2 rounded hover:bg-accent hover:text-accent-foreground text-destructive text-left disabled:opacity-50"
              onClick={() => {
                handleDisableSubscription(subscription);
                setIsOpen(false);
              }}
            >
              <Ban className="h-4 w-4 mr-2" />
              Disable
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
