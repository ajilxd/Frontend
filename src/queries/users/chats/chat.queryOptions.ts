import type { UseQueryOptions } from "@tanstack/react-query";

import { userFetchChatsByRoom } from "@/features/user/api/user.api";
import type { ChatType } from "@/types";

export const userChatsQueryOptions = (
  room: string
): UseQueryOptions<ChatType[], Error> => ({
  queryKey: ["user", "chats", room],
  queryFn: () => userFetchChatsByRoom(room),
  staleTime: 10 * 60 * 1000,
});
