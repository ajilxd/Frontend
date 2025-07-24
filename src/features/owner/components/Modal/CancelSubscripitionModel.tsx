import { enqueueSnackbar } from "notistack";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { OwnerContext } from "@/context/OwnerContext";
import { RootState } from "@/redux/store/appStore";

import {
  ownerCancelSubscriptionService,
  ownerFetchOwnSubscription,
} from "../../api/owner.api";
import { CancelSubscriptionType, OwnerSubscriptionType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  activePlan: OwnerSubscriptionType;
};

export function CancelSubscriptionDialog({ activePlan }: Props) {
  const [open, setOpen] = useState(false);
  const ownerData = useSelector((state: RootState) => state.owner);
  const queryClient = useQueryClient();

  // const { updateActiveSubscription } = useContext(OwnerContext);

  const handleConfirm = () => {
    async function cancelSubscriptionRunner() {
      if (!ownerData) {
        return console.warn("owner data couldnt fetch from redux");
      }
      const response = await ownerCancelSubscriptionService(
        activePlan.stripe_subscription_id,
        ownerData._id
      );
      const result = await ownerFetchOwnSubscription(ownerData._id!);
      if (response.success && result.success) {
        // updateActiveSubscription(result.data.data);
        queryClient.invalidateQueries({
          queryKey: ["owner", "subscriptions", ownerData._id],
        });
        enqueueSnackbar(response.message, { variant: "success" });
      } else {
        enqueueSnackbar(response.message, { variant: "error" });
      }
      setOpen(false);
    }
    cancelSubscriptionRunner();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-red-50 text-red-600 hover:text-red-700 hover:bg-red-100 border border-red-200 text-sm font-medium rounded-md transition-colors duration-200">
          Cancel Subscription
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Subscription</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel your subscription? You’ll lose
            access to all premium features.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Nevermind
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Yes, Cancel It
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
