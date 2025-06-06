import { UseQueryResult } from "@tanstack/react-query";
import { Menu, ChevronLeft } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleMessage,
  ChatBubbleAvatar,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { MessageType, TypingDataType } from "@/context/SocketContext";
import { useSocket } from "@/hooks/useSocket";
import { ChatType, SpaceType } from "@/types";

import { ChatHeader } from "./ChatHeader";
import { ChatInputComponent } from "./ChatInput";
import { ChatSidebar as Sidebar } from "./ChatSidebar";

type Participant = {
  id: string;
  name: string;
  image?: string;
  status: string;
  lastSeen?: string;
};

type Props = {
  useSpaceQuery: (
    managerId: string,
    spaceId: string
  ) => UseQueryResult<SpaceType, Error>;
  useChatQuery: (room: string) => UseQueryResult<ChatType[], Error>;
  user: {
    id: string;
    profile: { name?: string; image?: string };
    role: string;
  };
};



const Chat: React.FC<Props> = ({ useChatQuery, user, useSpaceQuery }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [typingMessages, setTypingMessages] = useState<TypingDataType | null>(
    null
  );
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<
    { userId: string; lastSeen: string }[]
  >([]);

  const { spaceid } = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: chats, isSuccess } = useChatQuery(spaceid!);
  const { data: space } = useSpaceQuery(user.id, spaceid!);

  const {
    connected,
    joinRoom,
    receiveMessage,
    activeUsers,
    getTyping,
    getStopTyping,
  } = useSocket();

  useEffect(() => {
    if (isSuccess) {
      setMessages(chats);
    }
  }, [chats, isSuccess]);

  useEffect(() => {
    if (!connected || !spaceid) return;

    joinRoom({ room: spaceid, userId: user.id });

    const unsubscribe = receiveMessage((msg: MessageType) => {
      setMessages((prev) => [...prev, msg]);
    });

    const cleanupOnline = activeUsers((data) => {
      setOnlineUsers(data);
    });

    return () => {
      unsubscribe();
      cleanupOnline();
    };
  }, [connected, spaceid, joinRoom, receiveMessage, activeUsers, user.id]);

  useEffect(() => {
    if (!space) return;

    const members = space.team?.members || [];
    const managers = space.managers || [];

    const participantArray: Participant[] = [
      ...members.map((member) => {
        const isOnline = onlineUsers.some(
          (u) => u.userId === member.userId || member.userId === user.id
        );
        const lastSeen = onlineUsers.find(
          (u) => u.userId === member.userId
        )?.lastSeen;
        return {
          id: member.userId,
          name: member.memberName,
          image: member.image,
          status: isOnline ? "online" : "offline",
          lastSeen,
        };
      }),
      ...managers.map((manager) => {
        const isOnline = onlineUsers.some(
          (u) => u.userId === manager.managerId || manager.managerId === user.id
        );
        const lastSeen = onlineUsers.find(
          (u) => u.userId === manager.managerId
        )?.lastSeen;
        return {
          id: manager.managerId,
          name: manager.managerName ?? "manager",
          image: manager.managerImage,
          status: isOnline ? "online" : "offline",
          lastSeen,
        };
      }),
    ];

    setParticipants(participantArray);
  }, [space, onlineUsers, user.id]);

  useEffect(() => {
    const unsubscribe = getTyping((data) => {
      const result = data.map((i) => {
        const sender = participants.find((p) => p.id === i.userId);
        return sender
          ? {
              ...i,
              senderName: sender.name,
              senderImageUrl: sender.image,
            }
          : i;
      });
      setTypingMessages(result);
    });

    const unsubscribeStopTyping = getStopTyping((data) => {
      console.log("from stop typing", data);
      const result = data.map((i) => {
        const sender = participants.find((p) => p.id === i.userId);
        return sender
          ? {
              ...i,
              senderName: sender.name,
              senderImageUrl: sender.image,
            }
          : i;
      });
      setTypingMessages(result);
    });

    return () => {
      unsubscribe();
      unsubscribeStopTyping();
    };
  }, [getTyping, participants, getStopTyping]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const currentChat = useMemo(() => {
    if (!space || !spaceid) return null;
    return {
      id: spaceid,
      name: space.name,
      participants: participants.length,
    };
  }, [space, spaceid, participants]);

  return (
    <div className="flex h-screen w-full mx-auto bg-background">
      {sidebarOpen && (
        <div className="w-96 shrink-0 border-r bg-background">
          <Sidebar participants={participants} currentChat={currentChat} />
        </div>
      )}

      <div className="flex flex-col flex-1 h-full">
        <div className="flex items-center px-4 py-2">
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
            <ChatHeader name={currentChat?.name ?? "Chat"} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2">
          <ChatMessageList>
            {messages.map((message, index) => {
              const isUser = message.senderId === user.id;
              const avatarImage = isUser
                ? user.profile.image
                : message.senderImageUrl;
              const variant = isUser ? "sent" : "received";
              return (
                <ChatBubble
                  key={message.id ?? index}
                  variant={variant}
                  className="mb-4 last:mb-0"
                >
                  <div className="flex items-start">
                    <ChatBubbleAvatar
                      fallback={
                        avatarImage
                          ? ""
                          : message.senderName?.slice(0, 2) ?? "??"
                      }
                      src={avatarImage}
                    />
                    <div className="flex flex-col ml-2 flex-1">
                      <ChatBubbleMessage>{message.content}</ChatBubbleMessage>
                    </div>
                  </div>
                </ChatBubble>
              );
            })}
            {typingMessages?.filter(i=>i.userId!=user.id).map((i, index) => (
              <ChatBubble>
                <ChatBubbleAvatar
                  fallback={i.senderImageUrl || i.senderName.slice(0, 2)}
                ></ChatBubbleAvatar>
                <ChatBubbleMessage isLoading={true} key={"typing" + index} />
              </ChatBubble>
            ))}
            <div ref={messagesEndRef} />
          </ChatMessageList>
        </div>

        <div className="px-4 py-2 border-t">
          <ChatInputComponent user={user} chatsLength={chats?.length} />
        </div>
      </div>
    </div>
  );
};

export default Chat;