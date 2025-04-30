import { useStripe } from "@stripe/react-stripe-js";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OwnerContext } from "@/context/OwnerContext";
import { RootState } from "@/redux/store/appStore";

import {
  ownerFetchOwnSubscription,
  ownerFetchSubscriptions,
  ownerPaymentCheckoutService,
} from "../../api/owner.api";
import { ActiveSubscription } from "../../components/ActiveSubscription";
import { PlanCard } from "../../components/PlanCard";

interface Plan {
  _id: string;
  name: string;
  amount: string;
  features: [];
  stripe_price_id?: string;
}

const Subscription: React.FC = () => {
  const [availablePlans, setAvailablePlans] = useState<Plan[]>([]);
  const [hasClickedSubscribe, setHasClickedSubscribe] = useState(false);
  const [checkoutId, setCheckoutId] = useState<string>("");

  const owner = useSelector((state: RootState) => state.owner);
  const { _id: ownerId, stripe_customer_id: stripeCustomerId } = owner || {};
  const stripe = useStripe();
  const { activeSubscription, updateActiveSubscription } =
    useContext(OwnerContext);
  console.log("activeplan", activeSubscription);
  // Handle "Learn More" click
  const handleKnowMore = (name: string) => {
    console.log(`Learn more about ${name}`);
  };

  // Handle subscription initiation
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
      setCheckoutId(result?.data?.data?.id);
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

  console.log(availablePlans);
  // Fetch available plans
  useEffect(() => {
    const fetchPlans = async () => {
      const response = await ownerFetchSubscriptions();
      if (response.success) {
        setAvailablePlans(response.data.data);
      } else {
        console.warn("error occured while fetching subscriptions");
      }
    };
    fetchPlans();
  }, []);

  // Fetch active subscription
  useEffect(() => {
    const fetchOwnerSubscription = async () => {
      if (!ownerId) return;

      try {
        const response = await ownerFetchOwnSubscription(ownerId);
        if (response.success && response.data.data) {
          updateActiveSubscription(response.data.data);
        } else {
          console.warn("Owner doesn't have an active subscription");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchOwnerSubscription();
    setHasClickedSubscribe(false);
  }, [hasClickedSubscribe, ownerId, updateActiveSubscription]);

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

      {/* Active Subscription Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Card className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-medium text-gray-900 dark:text-gray-100">
              Active Subscription
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            {Object.entries(activeSubscription).length ? (
              <ActiveSubscription activePlan={activeSubscription} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No active subscription found
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Available Plans Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Card className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-medium text-gray-900 dark:text-gray-100">
              Available Plans
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {availablePlans.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No plans available.
                </p>
              ) : (
                availablePlans
                  .filter((p) => p._id && p.stripe_price_id)
                  .map((plan) => (
                    <PlanCard
                      key={plan._id}
                      name={plan.name}
                      amount={plan.amount}
                      onKnowMore={() => handleKnowMore(plan.name)}
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
