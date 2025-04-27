export type SubscriptionType = {
  name: string;
  amount: string;
  billingCycle: "monthly" | "yearly";
  isActive: boolean;
  features: string[];
  description: string;
  createdAt?: Date;
};
