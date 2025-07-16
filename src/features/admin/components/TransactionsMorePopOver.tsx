import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TransactionType } from "@/types";
import { MoreHorizontal, X, CheckCircle, AlertCircle } from "lucide-react";

type Props = {
  transaction: TransactionType;
};

const TransactionsMorePopOver: React.FC<Props> = ({ transaction }) => {
  const [open, setOpen] = useState(false);

  const {
    customerName,
    companyName,
    status,
    errorMessage,
    subscriptionName,
    billingCycle,
    stripeCustomerId,
  } = transaction;

  const statusIcon =
    status === "success" ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <AlertCircle className="h-4 w-4 text-red-500" />
    );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4 space-y-3 text-sm">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium">Details</h4>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div>
          <span className="font-semibold">Customer:</span> {customerName}
        </div>
        <div>
          <span className="font-semibold">Company:</span> {companyName}
        </div>
        <div>
          <span className="font-semibold">Subscription:</span>{" "}
          {subscriptionName}
        </div>
        <div>
          <span className="font-semibold">Billing Cycle:</span>{" "}
          {billingCycle ?? "N/A"}
        </div>
        <div>
          <span className="font-semibold">Stripe ID:</span>{" "}
          <code>{stripeCustomerId ?? "N/A"}</code>
        </div>
        <div className="flex items-center gap-2">
          {statusIcon}
          <span className="capitalize">{status}</span>
        </div>
        {status === "fail" && errorMessage && (
          <div className="text-red-600 text-xs border border-red-5 p-2 rounded">
            {errorMessage}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default TransactionsMorePopOver;
