import { useQuery } from "@tanstack/react-query";
import { managerPeerMessagesQueryOptions } from "./peerMessage.queryOptions";

export const useManagerPeerMessagesQuery = (chatId: string) => {
  return useQuery(managerPeerMessagesQueryOptions(chatId));
};
