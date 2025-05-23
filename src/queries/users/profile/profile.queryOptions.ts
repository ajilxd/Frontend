import type { UseQueryOptions } from "@tanstack/react-query";

import { userGetData } from "@/features/user/api/user.api";
import type { UserType } from "@/types";

export const userProfileQueryOptions = (
  userId: string
): UseQueryOptions<UserType, Error> => ({
  queryKey: ["user", "profile", userId],
  queryFn: () => userGetData(userId),
});
