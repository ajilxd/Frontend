import { useQueryClient } from "@tanstack/react-query";
import { Paperclip, Mic, CornerDownLeft } from "lucide-react";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { MessageType } from "@/context/SocketContext";
import { useSocket } from "@/hooks/useSocket";

type Props = {
  user: {
    id: string;
    profile: { name?: string; image?: string };
    role: string;
  };

  chatsLength?: number;
};

export const ChatInputComponent: React.FC<Props> = ({ user, chatsLength }) => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { spaceid } = useParams();
  const { sendMessage, sendTyping, sendStopTyping } = useSocket();
  function typingHandler(data: boolean) {
    console.log("hey iam typing");
    if (!isTyping && data) {
      sendTyping({ room: spaceid, userId: user.id });
    } else if (isTyping && !data) {
      sendStopTyping({ room: spaceid, userId: user.id });
    }
    setIsTyping(data);
  }

  console.log("user is typing", isTyping);
  function updateCurrentMessage(content: string) {
    setMessage(content);
  }

  const handleSendMessage = (newMessage: string) => {
    if (newMessage.trim() === "") return;

    const timestamp = new Date().toLocaleTimeString();

    const message: MessageType = {
      id: `${chatsLength! + 1}`,
      content: newMessage,
      senderImageUrl: user.profile.image ?? "",
      room: spaceid!,
      senderName: user.profile.name,
      senderId: user.id,
      timestamp,
    };
    if (user.role === "user") {
      queryClient.invalidateQueries({ queryKey: ["user", "chats", spaceid] });
    }

    if (user.role === "manager") {
      queryClient.invalidateQueries({
        queryKey: ["manager", "chats", spaceid],
      });
    }
    setIsTyping(false);
    sendStopTyping({ room: spaceid, userId: user.id });
    sendMessage(message);
  };

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  return (
    <div className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1">
      <ChatInput
        placeholder="Type your message here..."
        className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
        updateMessageHandler={updateCurrentMessage}
        typingHandler={typingHandler}
        textAreaRef={textAreaRef}
      />
      <div className="flex items-center p-3 pt-0">
        <Button variant="ghost" size="icon">
          <Paperclip className="size-4" />
          <span className="sr-only">Attach file</span>
        </Button>

        <Button variant="ghost" size="icon">
          <Mic className="size-4" />
          <span className="sr-only">Use Microphone</span>
        </Button>

        <Button
          size="sm"
          className="ml-auto gap-1.5"
          onClick={() => {
            handleSendMessage(message);
            if (textAreaRef.current) {
              textAreaRef.current.value = "";
            }
          }}
        >
          Send Message
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </div>
  );
};
