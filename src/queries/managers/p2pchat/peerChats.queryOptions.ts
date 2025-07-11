import type { UseQueryOptions } from "@tanstack/react-query";
import { managerFetchPeerChats } from "@/features/manager/api/manager.api";
import type { IUserChatlist } from "@/types";

export const managerPeerChatsQueryOptions = (
  managerId: string
): UseQueryOptions<IUserChatlist[], Error> => ({
  queryKey: ["manager", "peerchats", managerId],
  queryFn: () => managerFetchPeerChats(managerId),
});
