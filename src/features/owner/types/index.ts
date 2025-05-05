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

export type CheckoutPayment<T> = {
  planId: T;
  ownerId: T;
  stripeCustomerId: T;
  subscriptionId: T;
};
