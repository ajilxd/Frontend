import { SpaceStatus, SpaceVisibility } from "../constants";

export type SpaceVisibilityType = (typeof SpaceVisibility)[number];
export type SpaceStatusType = (typeof SpaceStatus)[number];

export type CompanyDetailsType = {
  companyName: string;
  websiteURL: string;
  description: string;
  industry: string[];
  ownerId: string;
};

export type CheckoutPayment = {
  planId: string;
  ownerId: string;
  stripeCustomerId: string;
  subscriptionId: string;
  billingCycleType: string;
  yearly: boolean;
  monthly: boolean;
  amount: string;
  points: string;
  upgrade: boolean;
};
