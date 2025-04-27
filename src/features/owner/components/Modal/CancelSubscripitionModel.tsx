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

type Props = {
  subscriptionId: string;
};

export function CancelSubscriptionDialog({ subscriptionId }: Props) {
  const [open, setOpen] = useState(false);
  const ownerData = useSelector((state: RootState) => state.owner);
  const { updateActiveSubscription } = useContext(OwnerContext);

  const handleConfirm = () => {
    async function cancelSubscriptionRunner() {
      const response = await ownerCancelSubscriptionService(subscriptionId);
      if (!ownerData) {
        return console.warn("owner data couldnt fetch from redux");
      }
      const result = await ownerFetchOwnSubscription(ownerData._id!);
      if (response.success && result.success) {
        updateActiveSubscription(result.data.data);
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
        <Button variant="destructive">Cancel Subscription</Button>
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
