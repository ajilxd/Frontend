import { useQuery } from "@tanstack/react-query";
import { userPeerChatsQueryOptions } from "./peerChats.queryOptions";

export const useUserPeerChatsQuery = (userId: string) => {
  return useQuery(userPeerChatsQueryOptions(userId));
};
