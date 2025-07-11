import type { UseQueryOptions } from "@tanstack/react-query";
import { userFetchPeerChats } from "@/features/user/api/user.api";
import type { IUserChatlist } from "@/types";

export const userPeerChatsQueryOptions = (
  userId: string
): UseQueryOptions<IUserChatlist[], Error> => ({
  queryKey: ["user", "peerchats", userId],
  queryFn: () => userFetchPeerChats(userId),
});
