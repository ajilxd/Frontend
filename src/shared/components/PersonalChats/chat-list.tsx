import { AnimatePresence, motion } from "framer-motion";
import {
  ChatBubbleMessage,
  ChatBubbleTimestamp,
  ChatBubble,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";

import { useEffect, useRef } from "react";
import { IParticipantMetadata, IUserMessage } from "@/types";
import EmptyMessagesState from "./EmptyMessageState";

interface ChatListProps {
  messages: IUserMessage[];
  selectedUser: IParticipantMetadata;
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
                    key={message._id || index}
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
                    {message.type === "text" && (
                      <ChatBubble variant={variant}>
                        <ChatBubbleMessage>
                          {message.content}
                          {message.createdAt && (
                            <ChatBubbleTimestamp
                              timestamp={
                                "" +
                                new Date(message.createdAt).toLocaleTimeString()
                              }
                            />
                          )}
                        </ChatBubbleMessage>
                      </ChatBubble>
                    )}

                    {message.type === "image" && (
                      <ChatBubble variant={variant}>
                        <ChatBubbleMessage>
                          <img
                            src={message.content}
                            className="rounded-xl object-cover w-full max-w-xs max-h-80"
                            alt=""
                          />

                          {message.createdAt && (
                            <ChatBubbleTimestamp
                              timestamp={
                                "" +
                                new Date(message.createdAt).toLocaleTimeString()
                              }
                            />
                          )}
                        </ChatBubbleMessage>
                      </ChatBubble>
                    )}
                  </motion.div>
                );
              })
            ) : (
              <EmptyMessagesState />
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </ChatMessageList>
      </div>
    </div>
  );
}
