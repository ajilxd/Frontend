import { ReactNode, useCallback, useState } from "react";

import { SpaceType } from "@/features/manager/api/manager.api";

import { ManagerContext } from "./ManagerContext";

type Props = {
  children: ReactNode;
};

export const ManagerContextProvider: React.FC<Props> = ({ children }) => {
  const [spaces, setSpaces] = useState<SpaceType[]>([]);

  const memoisedUpdateSpaces = useCallback(async function updateSpaces(
    data: SpaceType[]
  ) {
    setSpaces(data);
  },
  []);

  return (
    <ManagerContext.Provider
      value={{ spaces, updateSpaces: memoisedUpdateSpaces }}
    >
      {children}
    </ManagerContext.Provider>
  );
};
