import type { UseQueryOptions } from "@tanstack/react-query";

import { managerGetDocuments } from "@/features/manager/api/manager.api";
import type { DocType } from "@/types";

export const managerDocumentsQueryOptions = (
  spaceId: string
): UseQueryOptions<DocType[], Error> => ({
  queryKey: ["manager", "documents", spaceId],
  queryFn: () => managerGetDocuments(spaceId),
  staleTime: 10 * 60 * 1000,
});
