import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";

import ChatBottombar from "./chat-bottombar";
import { IParticipantMetadata, IUserChatlist, IUserMessage } from "@/types";
import EmptyChatState from "./EmptyChatState";
import { UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";

interface ChatProps {
  selectedChat: IUserChatlist | null;
  selectedUser: IParticipantMetadata | null;
  isMobile: boolean;
  usePeerMessageQuery: (
    chatId: string
  ) => UseQueryResult<IUserMessage[], Error>;
  user: {
    id: string;
    profile: { name?: string; image?: string };
    company: { id?: string; name?: string };
    role: string;
  };
  refreshChatHandler: () => void;
  refreshChat: boolean;
}

export function Chat({
  selectedUser,
  isMobile,
  user,
  selectedChat,
  usePeerMessageQuery,
  refreshChatHandler,
  refreshChat,
}: ChatProps) {
  if (!selectedUser) {
    return <EmptyChatState />;
  }
  let { data: messages, refetch } = usePeerMessageQuery(selectedChat?.chatId);
  useEffect(() => {
    refetch();
  }, [refreshChat]);
  return (
    <div className="flex flex-col justify-between w-full h-screen">
      <>
        <ChatTopbar selectedUser={selectedUser} />

        <ChatList
          messages={messages!}
          selectedUser={selectedUser}
          isMobile={isMobile}
        />

        <ChatBottombar
          isMobile={isMobile}
          user={user}
          selectedUser={selectedUser}
          selectedChat={selectedChat}
          refreshChatHandler={refreshChatHandler}
        />
      </>
    </div>
  );
}
