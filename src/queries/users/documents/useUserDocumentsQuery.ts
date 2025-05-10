import { useQuery } from "@tanstack/react-query";

import { userDocumentsQueryOptions } from "./document.queryOptions";

export const useUserDocumentsQuery = (spaceId: string) => {
  return useQuery(userDocumentsQueryOptions(spaceId));
};
