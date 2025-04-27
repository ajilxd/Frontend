import { ReactNode, useCallback, useState } from "react";

import { companyDataType, OwnerContext } from "./OwnerContext";
import { activeSubscriptionType } from "./OwnerContext";

type Props = {
  children: ReactNode;
};

export const OwnerContextProvider: React.FC<Props> = ({ children }) => {
  const [activeSubscription, setActiveSubscription] =
    useState<activeSubscriptionType>({});
  const [company, setCompany] = useState<companyDataType>({});
  const memoisedUpdateActiveSubscription = useCallback(
    async function updateActiveSubscription(data: activeSubscriptionType) {
      setActiveSubscription(data);
    },
    []
  );

  const memoisedUpdateCompany = useCallback(async function updateCompany(
    data: companyDataType
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
