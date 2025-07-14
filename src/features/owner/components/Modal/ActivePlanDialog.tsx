import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { OwnerSubscriptionType } from "@/types";

interface ActivePlanDialogProps {
  activePlan: OwnerSubscriptionType;
}

export function ActivePlanDialog({ activePlan }: ActivePlanDialogProps) {
  const [open, setOpen] = useState(false);
  console.log("active plan", activePlan);

  const handleClose = () => {
    setOpen(false);
  };

  const billingCycle = (() => {
    if (activePlan.created && activePlan.expires_at) {
      const created = new Date(activePlan.created);
      const expires = new Date(activePlan.expires_at);
      const oneYearFromCreated = new Date(created);
      oneYearFromCreated.setFullYear(created.getFullYear() + 1);
      return Math.abs(expires.getMonth() - created.getMonth()) >= 11
        ? "year"
        : "month";
    }
    return "N/A";
  })();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-5 py-2.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-200 hover:border-slate-300  active:bg-slate-300 ">
          View Subscription
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] w-full">
        <DialogHeader>
          <DialogTitle>{activePlan.name || "Subscription Details"}</DialogTitle>
          <DialogDescription>
            Here are the details of your current subscription plan.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          <div className="flex justify-between text-sm">
            <span>Status:</span>
            <span className="font-medium">{activePlan.status || "N/A"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Subscribed On:</span>
            <span className="font-medium">
              {new Date(activePlan.created!).toDateString() || "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Billing Date:</span>
            <span className="font-medium">
              {new Date(activePlan.expires_at!).toDateString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Billing Cycle:</span>
            <span className="font-medium">{billingCycle}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Amount:</span>
            <span className="font-medium">${activePlan.amount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Cancel at Period End:</span>
            <span className="font-medium">
              {activePlan.cancel_at_period_end ? "Yes" : "No"}
            </span>
          </div>
          {activePlan.cancel_at_period_end && (
            <>
              <div className="flex justify-between text-sm">
                <span>Will Cancel After:</span>
                <span className="font-medium">
                  {new Date(activePlan.cancel_at!)?.toLocaleDateString() ||
                    "N/A"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Cancelled At:</span>
                <span className="font-medium">
                  {new Date(activePlan.canceled_at!)?.toLocaleDateString() ||
                    "N/A"}
                </span>
              </div>
            </>
          )}
          {activePlan.features?.length ? (
            <div>
              <p className="font-semibold text-sm mb-1">Features:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                {activePlan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No features listed.</p>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
