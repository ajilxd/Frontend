import { ReactNode, useCallback, useState } from "react";

import {
  ActiveSubscriptionType,
  CompanyDataType,
} from "@/features/owner/types/types.ownercontext";

import { OwnerContext } from "./OwnerContext";

type Props = {
  children: ReactNode;
};

export const OwnerContextProvider: React.FC<Props> = ({ children }) => {
  const [activeSubscription, setActiveSubscription] =
    useState<ActiveSubscriptionType>({});

  const [company, setCompany] = useState<CompanyDataType>({});

  const memoisedUpdateActiveSubscription = useCallback(
    async function updateActiveSubscription(data: ActiveSubscriptionType) {
      setActiveSubscription(data);
    },
    []
  );

  const memoisedUpdateCompany = useCallback(async function updateCompany(
    data: CompanyDataType
  ) {
    setCompany(data);
  },
  []);

  return (
    <OwnerContext.Provider
      value={{
        activeSubscription,
        updateActiveSubscription: memoisedUpdateActiveSubscription,
        company,
        updateCompany: memoisedUpdateCompany,
      }}
    >
      {children}
    </OwnerContext.Provider>
  );
};
