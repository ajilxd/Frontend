import { Terminal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store/appStore";

export function SubscriptionPaywall() {
  const navigate = useNavigate();
  const isOwner = useSelector(
    (state: RootState) => state.owner.isAuthenticated
  );

  const onClickHandler = () => {
    navigate("/owner/dashboard/subscriptions");
  };
  return (
    <>
      {isOwner ? (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            <div className="flex justify-between">
              You dont have an active subscription
              <Button variant="outline" onClick={onClickHandler}>
                Check subscriptions
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ) : (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>No active subscripition found.</AlertDescription>
        </Alert>
      )}
    </>
  );
}
