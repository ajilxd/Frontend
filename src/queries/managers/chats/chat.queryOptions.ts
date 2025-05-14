import type { UseQueryOptions } from "@tanstack/react-query";

import { managerFetchChatsByRoom } from "@/features/manager/api/manager.api";
import type { ChatType } from "@/types";

export const managerChatsQueryOptions = (
  room: string
): UseQueryOptions<ChatType[], Error> => ({
  queryKey: ["manager", "chats", room],
  queryFn: () => managerFetchChatsByRoom(room),
  staleTime: 10 * 60 * 1000,
});
