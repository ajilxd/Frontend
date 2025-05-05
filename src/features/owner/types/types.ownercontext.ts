export type ActiveSubscriptionType = {
  name?: string;
  stripe_subscription_id?: string;
  subscription_id?: string;
  created?: string;
  amount?: string;
  expires_at?: string;
  invoice?: string;
  billingCycle?: string;
  isActive?: boolean;
  description?: string;
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
  stripe_price_id?: string;
  stripe_product_id?: string;
};

export type CompanyDataType = {
  companyName?: string;
  websiteURL?: string;
  description?: string;
  industry?: string[];
  ownerId?: string;
  id?: string;
};
