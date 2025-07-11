import { useQuery } from "@tanstack/react-query";
import { userPeerMessagesQueryOptions } from "./peerMessage.queryOptions";

export const useUserPeerMessagesQuery = (chatId: string) => {
  return useQuery(userPeerMessagesQueryOptions(chatId));
};
