import React, { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";
import { Chat } from "./chat";
import { IParticipantMetadata, IUserChatlist, IUserMessage } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";

type Props = {
  user: {
    id: string;
    profile: { name?: string; image?: string };
    company: { id: string; name: string };
    role: string;
  };
  defaultLayout: number[] | undefined;
  navCollapsedSize: number;
  defaultCollapsed?: boolean;
  usePeerChatQuery: (userId: string) => UseQueryResult<IUserChatlist[], Error>;
  usePeerMessageQuery: (
    chatId: string
  ) => UseQueryResult<IUserMessage[], Error>;
};

export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
  user,
  usePeerChatQuery,
  usePeerMessageQuery,
}: Props) {
  console.log(`company id of ${user.profile.name} is ${user.company.id}`);

  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const [selectedUser, setSelectedUser] =
    React.useState<IParticipantMetadata | null>(null);

  const [selectedChat, setSelectedChat] = React.useState<IUserChatlist | null>(
    null
  );

  const [refreshChat, setRefreshChat] = React.useState<boolean>(false);

  const refreshChatsHandler = () => setRefreshChat((prev) => !prev);

  const [isMobile, setIsMobile] = useState(false);

  const selectedUserHandler = (data: IParticipantMetadata) => {
    console.log("User has been selected", data);
    setSelectedUser(data);
  };

  const selectedChatHandler = (data: IUserChatlist | null) => {
    console.log("User has been selected", data);
    setSelectedChat(data);
  };

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  return (
    <PanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
      className="h-full items-stretch"
    >
      <Panel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )}`;
        }}
        className={cn(
          isCollapsed &&
            "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
        )}
      >
        <Sidebar
          isCollapsed={isCollapsed || isMobile}
          user={user}
          selectUserHandler={selectedUserHandler}
          selectedUser={selectedUser}
          usePeerChatQuery={usePeerChatQuery}
          selectedChatHandler={selectedChatHandler}
          refreshChat={refreshChat}
          refreshChatHandler={refreshChatsHandler}
        />
      </Panel>

      <PanelResizeHandle className="bg-border w-1 hover:bg-border/60 transition-colors" />

      <Panel defaultSize={defaultLayout[1]} minSize={30}>
        <Chat
          selectedUser={selectedUser}
          isMobile={isMobile}
          user={user}
          selectedChat={selectedChat}
          usePeerMessageQuery={usePeerMessageQuery}
          refreshChat={refreshChat}
          refreshChatHandler={refreshChatsHandler}
        />
      </Panel>
    </PanelGroup>
  );
}
