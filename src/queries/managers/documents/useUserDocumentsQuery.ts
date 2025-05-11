import { useQuery } from "@tanstack/react-query";

import { managerDocumentsQueryOptions } from "./document.queryOptions";

export const useManagerDocumentsQuery = (spaceId: string) => {
  return useQuery(managerDocumentsQueryOptions(spaceId));
};
