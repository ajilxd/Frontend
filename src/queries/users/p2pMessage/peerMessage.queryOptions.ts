import type { UseQueryOptions } from "@tanstack/react-query";
import type {  IUserMessage } from "@/types";
import { userFetchPeerMessages } from "@/features/user/api/user.api";

export const userPeerMessagesQueryOptions = (
  chatId: string
): UseQueryOptions<IUserMessage[], Error> => ({
  queryKey: ["user", "peermessages", chatId],
  queryFn: () => userFetchPeerMessages(chatId),
});
