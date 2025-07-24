import { useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOwnerSubscriptionQuery } from "@/queries/owners/subscriptions/useOwnerSubscriptionQuery";
import { useSubscriptionsQuery } from "@/queries/owners/subscriptions/useSubscripitonsQuery";
import { RootState } from "@/redux/store/appStore";

import { ownerPaymentCheckoutService } from "../../api/owner.api";
import { ActiveSubscription } from "../../components/ActiveSubscription";
import { PlanCard } from "../../components/PlanCard";
import { useOwnerCompanyQuery } from "@/queries/owners/company/useOwnerCompanyQuery";

import { toast } from "sonner";

const Subscription: React.FC = () => {
  const stripe = useStripe();
  const owner = useSelector((state: RootState) => state.owner);
  if (!owner._id || !owner) {
    return;
  }
  const { _id: ownerId, stripe_customer_id: stripeCustomerId } = owner || {};
  const { data: subscripitons } = useSubscriptionsQuery();
  const { data: activeSubscription } = useOwnerSubscriptionQuery(
    "" + owner._id
  );
  const { data: company } = useOwnerCompanyQuery(owner._id);

  const [checkoutId, setCheckoutId] = useState<string>("");

  const handleKnowMore = (name: string) => {
    console.log(`Learn more about ${name}`);
  };

  console.log(`active subscription`, activeSubscription);

  const handleSubscribe = async (
    planId: string,
    subscriptionId: string,
    billingCycleType: string,
    yearly: boolean,
    monthly: boolean,
    amount: string,
    points: string,
    upgrade: boolean
  ) => {
    if (!company) {
      toast("Fill company details first!");
      return;
    }
    if (
      !ownerId ||
      !stripeCustomerId ||
      !subscriptionId ||
      !planId ||
      !points
    ) {
      console.error("Missing fields", {
        ownerId,
        stripeCustomerId,
        subscriptionId,
        planId,
      });
      return;
    }

    const result = await ownerPaymentCheckoutService({
      ownerId,
      planId,
      stripeCustomerId,
      subscriptionId,
      billingCycleType,
      monthly,
      yearly,
      amount,
      points,
      upgrade,
    });
    if (result.success) {
      setCheckoutId(result?.data?.id);
    } else {
      toast.warning("something went wrong");
      console.warn("Failed to set the checkout id - couldnt fetch from server");
    }
  };

  useEffect(() => {
    if (checkoutId && stripe) {
      stripe.redirectToCheckout({ sessionId: checkoutId });
    }
  }, [checkoutId, stripe]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 p-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-100">
          Subscription Management
        </h1>
      </div>

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
                    features={plan.features}
                    onKnowMore={() => handleKnowMore(plan.name)}
                    billingCycleType={plan.billingCycleType}
                    alreadySubscribed={!!activeSubscription}
                    description={plan.description}
                    monthlyAmount={+plan.monthlyAmount}
                    yearlyAmount={+plan.yearlyAmount}
                    onSubscribeMonthly={() =>
                      handleSubscribe(
                        plan.stripe_monthly_price_id!,
                        plan._id,
                        plan.billingCycleType,
                        false,
                        true,
                        "" + plan.monthlyAmount,
                        "" + plan.points,
                        !!activeSubscription
                      )
                    }
                    onSubscribeYearly={() =>
                      handleSubscribe(
                        plan.stripe_yearly_price_id!,
                        plan._id,
                        plan.billingCycleType,
                        true,
                        false,
                        "" + plan.yearlyAmount,
                        "" + plan.points,
                        !!activeSubscription
                      )
                    }
                    allowUpgrade={+plan.points! > +activeSubscription?.points!}
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
