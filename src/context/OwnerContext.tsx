import { createContext } from "react";

export type activeSubscriptionType = {
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

export type companyDataType = {
  companyName?: string;
  websiteURL?: string;
  description?: string;
  industry?: string[];
  ownerId?: string;
};

const companyInitialValues = {
  companyName: "",
  websiteURL: "",
  description: "",
  industry: [],
  ownerId: "",
};

type contextProps = {
  activeSubscription: Partial<activeSubscriptionType>;
  updateActiveSubscription: (data: Partial<activeSubscriptionType>) => void;
  company: companyDataType;
  updateCompany: (data: companyDataType) => void;
};

export const OwnerContext = createContext<contextProps>({
  activeSubscription: {},
  updateActiveSubscription: () => {},
  company: companyInitialValues,
  updateCompany: () => {},
});
