import type { UseQueryOptions } from "@tanstack/react-query";
import type { IUserMessage } from "@/types";
import { managerFetchPeerMessages } from "@/features/manager/api/manager.api";

export const managerPeerMessagesQueryOptions = (
  chatId: string
): UseQueryOptions<IUserMessage[], Error> => ({
  queryKey: ["manager", "peermessages", chatId],
  queryFn: () => managerFetchPeerMessages(chatId),
});
