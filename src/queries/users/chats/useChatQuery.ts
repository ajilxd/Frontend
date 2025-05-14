import { useQuery } from "@tanstack/react-query";

import { userChatsQueryOptions } from "./chat.queryOptions";

export const useUserChatsQuery = (room: string) => {
  return useQuery(userChatsQueryOptions(room));
};
