import { useQuery } from "@tanstack/react-query";

import { managerFetchSpaceByIdQueryOptions } from "./spaces.queryOptions";

export const useManagerSpacesByIdQuery = (
  managerId: string,
  spaceId: string
) => {
  return useQuery(managerFetchSpaceByIdQueryOptions(managerId, spaceId));
};
