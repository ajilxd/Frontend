import React, { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { Chat } from "./chat";
import { CompanyMemberP2PChatType } from "@/types";

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
};

export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
  user,
}: Props) {
  console.log(`company id of ${user.profile.name} is ${user.company.id}`);

  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const [selectedUser, setSelectedUser] =
    React.useState<CompanyMemberP2PChatType>({
      name: "",
      image: "",
      userId: "",
      role: "",
      companyId: "",
    });

  const [isMobile, setIsMobile] = useState(false);

  const selectedUserHandler = (data: CompanyMemberP2PChatType) =>
    setSelectedUser(data);

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
          isMobile={isMobile}
          user={user}
          selectUserHandler={selectedUserHandler}
        />
      </Panel>

      <PanelResizeHandle className="bg-border w-1 hover:bg-border/60 transition-colors" />

      <Panel defaultSize={defaultLayout[1]} minSize={30}>
        <Chat
          messages={selectedUser.messages}
          selectedUser={selectedUser}
          isMobile={isMobile}
          user={user}
        />
      </Panel>
    </PanelGroup>
  );
}
