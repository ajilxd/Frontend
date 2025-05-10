import { createContext } from "react";

import socket from "@/socket";

export type MessageType = {
  room?: string;
  sender?: string;
  message?: string;
  timestamp?: string;
  userId?: string;
  content?: string;
  avatar?: string;
  id?: string;
};

export type SocketContextType = {
  socket: typeof socket;
  connected: boolean;
  connectSocket: (value: MessageType) => void;
  joinRoom: (data: MessageType) => void;
  sendMessage: (data: MessageType) => void;
  receiveMessage: (fn: (data: MessageType) => void) => void;
  activeUsers: (fn: (data: string[]) => void) => void;
};

export const SocketContext = createContext<SocketContextType | null>(null);
