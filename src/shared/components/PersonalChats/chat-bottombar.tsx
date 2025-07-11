import { FileImage, Paperclip, SendHorizontal, ThumbsUp } from "lucide-react";

import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { AnimatePresence, motion } from "framer-motion";
import { EmojiPicker } from "./emoji-picker";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { useNotification } from "@/shared/hooks/useNotification";
import {
  ParticipantsMetaData,
  PeerMessageType,
} from "@/context/NotificationContextProvider";
import { IParticipantMetadata, IUserChatlist } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "@/constants/app";
import { ImageIconUpload } from "./ImageIconUpload";

interface ChatBottombarProps {
  isMobile: boolean;
  user: {
    id: string;
    profile: { name?: string; image?: string };
    company: { id?: string; name?: string };
    role: string;
  };
  selectedUser: IParticipantMetadata;
  selectedChat: IUserChatlist | null;
  refreshChatHandler: () => void;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({
  isMobile,
  user,
  selectedUser,
  selectedChat,
  refreshChatHandler,
}: ChatBottombarProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessageToPeer } = useNotification();
  const queryClient = useQueryClient();

  // const [isLoading, setisLoading] = useState(false);
  if (!user.company.id) {
    throw new Error("Company id havent fetched properly");
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const sendParticipantMetaData: ParticipantsMetaData = {
    name: user.profile.name!,
    role: user.role,
    image: user.profile.image! || "",
    status: "active",
    userId: user.id,
    lastSeen: "" + new Date(),
  };

  const receiveParticipantMetaData: ParticipantsMetaData = {
    name: selectedUser.name,
    role: selectedUser.role,
    image: selectedUser.image,
    status: "active",
    userId: selectedUser.userId,
    lastSeen: "" + new Date(),
  };

  const handleThumbsUp = () => {
    const newMessage: PeerMessageType = {
      senderId: user.id,
      receiverId: selectedUser.userId,
      image: user.profile.image,
      content: "👍",
      type: "text",
      companyId: user.company.id!,
      participantsMetadata: [
        sendParticipantMetaData,
        receiveParticipantMetaData,
      ],
    };
    sendMessageToPeer(newMessage);
    setMessage("");
    refreshChatHandler();
    if (user.role === "user" && selectedChat?.chatId) {
      queryClient.invalidateQueries({
        queryKey: ["user", "peermessages", selectedChat.chatId],
      });
    }

    if (user.role === "manager" && selectedChat?.chatId) {
      queryClient.invalidateQueries({
        queryKey: ["manager", "peermessages", selectedChat.chatId],
      });
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    const filename = encodeURIComponent(file.name).split(".")[0];
    const filetype = encodeURIComponent(file.name).split(".")[1];
    const res = await fetch(`${baseUrl}/s3/presign?filename=${filename}`);
    const { url } = await res.json();
    console.log(url);

    const uploadRes = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });
    console.log(uploadRes);
    if (uploadRes.ok) {
      const publicUrl = `https://fluentawork-assets.s3.eu-north-1.amazonaws.com/${filename}`;
      console.log("Uploaded to:", publicUrl);
      const newMessage: PeerMessageType = {
        senderId: user.id,
        receiverId: selectedUser.userId,
        content: publicUrl,
        type: "image",
        mediaMeta: {
          contentType: file.type,
          size: file.size,
          originalName: filename,
          extension: filetype,
        },
        companyId: user.company.id!,
        participantsMetadata: [
          sendParticipantMetaData,
          receiveParticipantMetaData,
        ],
      };
      sendMessageToPeer(newMessage);
      if (user.role === "user" && selectedChat?.chatId) {
        queryClient.invalidateQueries({
          queryKey: ["user", "peerchats", user.id],
        });
        queryClient.invalidateQueries({
          queryKey: ["user", "peermessages", selectedChat.chatId],
        });
      }

      if (user.role === "manager" && selectedChat?.chatId) {
        queryClient.invalidateQueries({
          queryKey: ["manager", "peerchats", user.id],
        });
        queryClient.invalidateQueries({
          queryKey: ["manager", "peermessages", selectedChat.chatId],
        });
      }
    } else {
      const errorDetails = await uploadRes.text();
      console.error("Upload failed:", errorDetails);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: PeerMessageType = {
        senderId: user.id,
        receiverId: selectedUser.userId,
        image: "",
        content: message,
        type: "text",
        companyId: user.company.id!,
        participantsMetadata: [
          sendParticipantMetaData,
          receiveParticipantMetaData,
        ],
      };
      sendMessageToPeer(newMessage);
      setMessage("");
      refreshChatHandler();
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
    console.log(
      `user is ${user.role} & selected chat id ${selectedChat?.chatId}`
    );
    if (user.role === "user" && selectedChat?.chatId) {
      queryClient.invalidateQueries({
        queryKey: ["user", "peerchats", user.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", "peermessages", selectedChat.chatId],
      });
    }

    if (user.role === "manager" && selectedChat?.chatId) {
      queryClient.invalidateQueries({
        queryKey: ["manager", "peerchats", user.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["manager", "peermessages", selectedChat.chatId],
      });
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="px-2 py-4 flex justify-between w-full items-center gap-2">
      <div className="flex">
        {!message.trim() && !isMobile && (
          <div className="flex">
            <ImageIconUpload onSelect={handleImageUpload} />
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          <ChatInput
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="rounded-full"
            textAreaRef={inputRef}
          />
          <div className="absolute right-4 bottom-2  ">
            <EmojiPicker
              onChange={(value) => {
                setMessage(message + value);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            />
          </div>
        </motion.div>

        {message.trim() ? (
          <Button
            className="h-9 w-9 shrink-0"
            onClick={handleSend}
            // disabled={isLoading}
            variant="ghost"
            size="icon"
          >
            <SendHorizontal size={22} className="text-muted-foreground" />
          </Button>
        ) : (
          <Button
            className="h-9 w-9 shrink-0"
            onClick={handleThumbsUp}
            // disabled={isLoading}
            variant="ghost"
            size="icon"
          >
            <ThumbsUp size={22} className="text-muted-foreground" />
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
}
