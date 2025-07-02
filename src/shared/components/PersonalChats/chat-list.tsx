import { AnimatePresence, motion } from "framer-motion";
import {
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";

import { Forward, Heart } from "lucide-react";
import { useEffect, useRef } from "react";
import { PeerMessageType } from "@/context/NotificationContextProvider";
import { CompanyMemberP2PChatType } from "@/types";

interface ChatListProps {
  messages: PeerMessageType[];
  selectedUser: CompanyMemberP2PChatType;
  isMobile: boolean;
}

const getMessageVariant = (senderId: string, selectedUserId: string) =>
  senderId === selectedUserId ? "received" : "sent";

export function ChatList({ messages, selectedUser }: ChatListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timeout);
  }, [messages]);

  const actionIcons = [
    { icon: Forward, type: "Forward" },
    { icon: Heart, type: "Like" },
  ];

  return (
    <div className="w-full flex flex-col flex-1 overflow-hidden">
      <div className="overflow-y-auto flex-1">
        <ChatMessageList>
          <AnimatePresence>
            {messages && messages.length > 0 ? (
              messages.map((message, index) => {
                const variant = getMessageVariant(
                  message.senderId,
                  selectedUser.userId
                );

                return (
                  <motion.div
                    key={message.id || index} // Prefer message.id if available
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 1 }}
                    transition={{
                      opacity: { duration: 0.1 },
                      layout: {
                        type: "spring",
                        bounce: 0.3,
                        duration: index * 0.05 + 0.2,
                      },
                    }}
                    className="flex flex-col gap-2 p-4"
                  >
                    <ChatBubble variant={variant}>
                      <ChatBubbleAvatar src={message.image} />
                      <ChatBubbleMessage isLoading={message.isLoading}>
                        {message.content}
                        {message.createdAt && (
                          <ChatBubbleTimestamp timestamp={message.createdAt} />
                        )}
                      </ChatBubbleMessage>
                      <ChatBubbleActionWrapper>
                        {actionIcons.map(({ icon: Icon, type }) => (
                          <ChatBubbleAction
                            key={type}
                            className="size-7"
                            icon={<Icon className="size-4" />}
                            onClick={() =>
                              console.log(
                                `Action "${type}" clicked for message ${index}`
                              )
                            }
                          />
                        ))}
                      </ChatBubbleActionWrapper>
                    </ChatBubble>
                  </motion.div>
                );
              })
            ) : (
              <div className="p-4 text-muted-foreground">No messages</div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </ChatMessageList>
      </div>
    </div>
  );
}
