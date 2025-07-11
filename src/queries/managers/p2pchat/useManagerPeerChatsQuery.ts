import { useQuery } from "@tanstack/react-query";
import { managerPeerChatsQueryOptions } from "./peerChats.queryOptions";

export const useManagerPeerChatsQuery = (userId: string) => {
  return useQuery(managerPeerChatsQueryOptions(userId));
};
