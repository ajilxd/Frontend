import { createContext } from "react";

import {
  ActiveSubscriptionType,
  CompanyDataType,
} from "@/features/owner/types/types.ownercontext";

const companyInitialValues = {
  companyName: "",
  websiteURL: "",
  description: "",
  industry: [],
  ownerId: "",
  id: "",
};
type contextProps = {
  activeSubscription: Partial<ActiveSubscriptionType>;
  updateActiveSubscription: (data: Partial<ActiveSubscriptionType>) => void;
  company: CompanyDataType;
  updateCompany: (data: CompanyDataType) => void;
};

export const OwnerContext = createContext<contextProps>({
  activeSubscription: {},
  updateActiveSubscription: () => {},
  company: companyInitialValues,
  updateCompany: () => {},
});
