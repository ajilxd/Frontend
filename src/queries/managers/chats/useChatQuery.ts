import { useQuery } from "@tanstack/react-query";

import { managerChatsQueryOptions } from "./chat.queryOptions";

export const useManagerChatsQuery = (room: string) => {
  return useQuery(managerChatsQueryOptions(room));
};
