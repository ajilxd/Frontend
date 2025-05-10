import type { UseQueryOptions } from "@tanstack/react-query";

import { userGetDocuments } from "@/features/user/api/user.api";
import type { DocType } from "@/types";

export const userDocumentsQueryOptions = (
  spaceId: string
): UseQueryOptions<DocType[], Error> => ({
  queryKey: ["user", "documents", spaceId],
  queryFn: () => userGetDocuments(spaceId),
  staleTime: 10 * 60 * 1000,
});
