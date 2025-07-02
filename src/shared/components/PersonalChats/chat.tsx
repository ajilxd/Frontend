import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";

import ChatBottombar from "./chat-bottombar";
import { PeerMessageType } from "@/context/NotificationContextProvider";
import { CompanyMemberP2PChatType } from "@/types";

interface ChatProps {
  messages: PeerMessageType[];
  selectedUser: CompanyMemberP2PChatType;
  isMobile: boolean;
  user: {
    id: string;
    profile: { name?: string; image?: string };
    company: { id?: string; name?: string };
    role: string;
  };
}

export function Chat({ messages, selectedUser, isMobile, user }: ChatProps) {
  // const sendMessage = (newMessage: PeerMessageType) => {};

  return (
    <div className="flex flex-col justify-between w-full h-screen">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList
        messages={messages}
        selectedUser={selectedUser}
        isMobile={isMobile}
      />

      <ChatBottombar isMobile={isMobile} user={user} selectedUser={selectedUser}/>
    </div>
  );
}
