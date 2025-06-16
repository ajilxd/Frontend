import { useStripe } from "@stripe/react-stripe-js";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOwnerSubscriptionQuery } from "@/queries/owners/subscriptions/useOwnerSubscriptionQuery";
import { useSubscriptionsQuery } from "@/queries/owners/subscriptions/useSubscripitonsQuery";
import { RootState } from "@/redux/store/appStore";

import { ownerPaymentCheckoutService } from "../../api/owner.api";
import { ActiveSubscription } from "../../components/ActiveSubscription";
import { PlanCard } from "../../components/PlanCard";

const Subscription: React.FC = () => {
  const stripe = useStripe();
  const owner = useSelector((state: RootState) => state.owner);
  const { _id: ownerId, stripe_customer_id: stripeCustomerId } = owner || {};
  const { data: subscripitons } = useSubscriptionsQuery();

  const { data: activeSubscription } = useOwnerSubscriptionQuery(
    "" + owner._id
  );

  const [checkoutId, setCheckoutId] = useState<string>("");

  const handleKnowMore = (name: string) => {
    console.log(`Learn more about ${name}`);
  };

  const handleSubscribe = async (planId: string, subscriptionId: string) => {
    if (!ownerId || !stripeCustomerId || !subscriptionId || !planId) {
      enqueueSnackbar("Missing required fields for checkout.", {
        variant: "error",
      });
      console.error("Missing fields", {
        ownerId,
        stripeCustomerId,
        subscriptionId,
        planId,
      });
      return;
    }

    try {
      const result = await ownerPaymentCheckoutService({
        ownerId,
        planId,
        stripeCustomerId,
        subscriptionId,
      });
      setCheckoutId(result?.data?.id);
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to initiate checkout", { variant: "error" });
    }
  };

  // Redirect to Stripe checkout if sessionId is available
  useEffect(() => {
    if (checkoutId && stripe) {
      stripe.redirectToCheckout({ sessionId: checkoutId });
    }
  }, [checkoutId, stripe]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
            Subscriptions
          </h1>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Card className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-medium text-gray-900 dark:text-gray-100">
              Active Subscription
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            {activeSubscription ? (
              <ActiveSubscription activePlan={activeSubscription} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No active subscription found
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Card className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-medium text-gray-900 dark:text-gray-100">
              Available Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscripitons?.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No plans available.
                </p>
              ) : (
                subscripitons?.map((plan) => (
                  <PlanCard
                    key={plan._id}
                    name={plan.name}
                    amount={plan.amount}
                    onKnowMore={() => handleKnowMore(plan.name)}
                    alreadySubscribed={!!activeSubscription}
                    onSubscribe={() =>
                      handleSubscribe(plan.stripe_price_id!, plan._id)
                    }
                  />
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Subscription;
