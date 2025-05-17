import { useEffect, useState, ReactNode } from "react";

import socket from "@/socket";

import { SocketContext } from "./SocketContext";
import { MessageType } from "./SocketContext";

type Props = {
  children: ReactNode;
};

export const SocketProvider = ({ children }: Props) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  const connectSocket = (data: MessageType) => {
    socket.emit("user-connected", data);
  };

  const disconnectSocket = (data: MessageType) => {
    socket.emit("user-disconnected", data);
    socket.disconnect();
    socket.off();
  };

  const joinRoom = (data: MessageType) => {
    socket.emit("join-room", data);
  };

  const sendMessage = (data: MessageType) => {
    socket.emit("send-message", data);
  };

  const receiveMessage = (
    callback: (msg: MessageType) => void
  ): (() => void) => {
    const handler = (data: MessageType) => {
      callback(data);
    };
    socket.on("receive-message", handler);

    return () => {
      socket.off("receive-message", handler);
    };
  };

  const activeUsers = (callback: (data: string[]) => void): (() => void) => {
    const handler = (data: string[]) => {
      callback(data);
    };
    socket.on("online-users", handler);

    return () => {
      socket.off("online-users", handler);
    };
  };

  const getTyping = (callback: (data: string[]) => void): (() => void) => {
    const handler = (data: string[]) => {
      callback(data);
    };
    socket.on("typing", handler);

    return () => {
      socket.off("typing", handler);
    };
  };

  const getStopTyping = (callback: (data: string[]) => void): (() => void) => {
    const handler = (data: string[]) => {
      callback(data);
    };
    socket.on("stop-typing", handler);

    return () => {
      socket.off("stop-typing", handler);
    };
  };

  const sendTyping = (data: MessageType) => {
    socket.emit("typing", data);
  };

  const sendStopTyping = (data: MessageType) => {
    socket.emit("stop-typing", data);
  };

  // const getStopTyping =

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        connectSocket,
        joinRoom,
        sendMessage,
        receiveMessage,
        activeUsers,
        disconnectSocket,
        getStopTyping,
        getTyping,
        sendTyping,
        sendStopTyping,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
