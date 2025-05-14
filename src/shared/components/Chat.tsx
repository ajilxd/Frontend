import { UseQueryResult } from "@tanstack/react-query";
import { Menu, ChevronLeft } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleMessage,
  ChatBubbleAvatar,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { MessageType } from "@/context/SocketContext";
import { useSocket } from "@/hooks/useSocket";
import { ChatType, SpaceType } from "@/types";

import { ChatHeader } from "./ChatHeader";
import { ChatInputComponent } from "./ChatInput";
import { ChatSidebar as Sidebar } from "./ChatSidebar";

type Props = {
  useSpaceQuery: (
    managerId: string,
    spaceId: string
  ) => UseQueryResult<SpaceType, Error>;
  useChatQuery: (room: string) => UseQueryResult<ChatType[], Error>;
  user: { id: string; profile: { name?: string; image?: string } };
};

const Chat: React.FC<Props> = ({ useChatQuery, user, useSpaceQuery }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { connected, joinRoom, sendMessage, receiveMessage, activeUsers } =
    useSocket();
  const [onlineUsers, setOnlineUsers] = useState<
    { userId: string; lastSeen: string }[]
  >([]);
  const { spaceid } = useParams();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: chats, isSuccess } = useChatQuery(spaceid!);
  const { data: space } = useSpaceQuery(user.id, spaceid!);

  useEffect(() => {
    if (isSuccess) {
      setMessages(chats);
    }
  }, [chats, isSuccess]);

  useEffect(() => {
    if (!connected || !spaceid) return;

    joinRoom({ room: spaceid });

    const unsubscribe = receiveMessage((msg: MessageType) => {
      setMessages((prev) => [...prev, msg]);
    });

    const onlineUsers = activeUsers((data) => {
      //   console.log("data of online users", data);
      setOnlineUsers(data);
    });

    return () => {
      unsubscribe();
      onlineUsers();
    };
  }, [connected, spaceid, receiveMessage, joinRoom, activeUsers]);

  //   participants and current chat creation

  const participants = [];
  let currentChat;

  if (space && space.team && spaceid) {
    console.log("online user", onlineUsers);
    console.log("heyyy");
    currentChat = {
      id: spaceid,
      name: space.name,
      participants: participants.length,
    };
    const { members } = space.team;
    for (const i of members) {
      const id = i.userId;
      const isOnline = onlineUsers.find((i) => i.userId === id);
      const lastSeen = onlineUsers.find((i) => i.userId === id)?.lastSeen;
      const name = i.memberName;
      const status = isOnline ? "online" : "offline";
      const image = i.image;
      participants.push({ status, id, name, lastSeen, image });
    }
    console.log("pariticipants", participants);
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const timestamp = new Date().toLocaleTimeString();

    const message: MessageType = {
      id: `${messages.length + 1}`,
      content: newMessage,
      senderImageUrl: user.profile.image ?? "",
      room: spaceid!,
      senderName: user.profile.name,
      senderId: user.id,
      timestamp,
    };

    sendMessage(message);
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  const updateNewMessage = useCallback(function (data: string) {
    setNewMessage(data);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen w-full mx-auto bg-background">
      {sidebarOpen && (
        <div className="w-96 shrink-0 border-r bg-background">
          <Sidebar participants={participants} currentChat={currentChat} />
        </div>
      )}

      <div className="flex flex-col flex-1 h-full">
        {/* Header */}
        <div className="flex items-center px-4 py-2 ">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <div className="flex-1">
            <ChatHeader name="Furni" />
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <ChatMessageList>
            {messages.map((message, index) => {
              const imageUrl =
                message.senderId === user.id
                  ? user.profile.image
                  : message.senderImageUrl;
              const variant =
                message.senderId === user.id ? "sent" : "received";
              return (
                <ChatBubble
                  key={message.id ?? index}
                  variant={variant}
                  className="mb-4 last:mb-0"
                >
                  <div className="flex items-start">
                    <ChatBubbleAvatar
                      fallback={imageUrl || message.senderName?.slice(0, 2)}
                    />
                    <div className="flex flex-col ml-2 flex-1">
                      <ChatBubbleMessage>{message.content}</ChatBubbleMessage>
                    </div>
                  </div>
                </ChatBubble>
              );
            })}
          </ChatMessageList>
        </div>

        {/* Chat input */}
        <div className="px-4 py-2 border-t">
          <ChatInputComponent
            updateMessageHandler={updateNewMessage}
            submitMessageHandler={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
