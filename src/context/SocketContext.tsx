import { createContext } from "react";

import socket from "@/socket";

export type MessageType = {
  room?: string;
  senderName?: string;
  senderId?: string;
  senderImageUrl?: string;
  message?: string;
  timestamp?: string;
  content?: string;
  id?: string;
  userId?: string;
  typing?: string;
};

export type TypingDataType = {
  userId: string;
  typing: string;
  senderName: string;
  senderImageUrl: string;
}[];

export type SocketContextType = {
  socket: typeof socket;
  connected: boolean;
  connectSocket: (value: MessageType) => void;
  joinRoom: (data: MessageType) => void;
  sendMessage: (data: MessageType) => void;
  receiveMessage: (fn: (data: MessageType) => void) => void;
  activeUsers: (fn: (data: string[]) => void) => void;
  disconnectSocket: (data: MessageType) => void;
  getTyping: (fn: (data: TypingDataType) => void) => void;
  getStopTyping: (fn: (data: TypingDataType) => void) => void;
  sendTyping: (data: MessageType) => void;
  sendStopTyping: (data: MessageType) => void;
};

export const SocketContext = createContext<SocketContextType | null>(null);
