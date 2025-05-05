import { createContext } from "react";

import { SpaceType } from "@/features/manager/api/manager.api";

type contextProps = {
  spaces: SpaceType[];
  updateSpaces: (data: SpaceType[]) => void;
};

export const ManagerContext = createContext<contextProps>({
  spaces: [],
  updateSpaces: () => {},
});
