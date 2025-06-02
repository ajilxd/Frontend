import { createContext } from "react";
import { Socket } from "socket.io-client";
import { EventType } from "./NotificationContextProvider";

type Notification = {
  message: string;
  from?: string;
  timestamp?: string;
};

type NotificationSocketContextType = {
  notificationSocket: Socket;
  connectNotificationSocket: (data: EventType) => void
  sendNotification: (roomId: string, message: string, type: string) => void;
  clearNotification: () => void;
  notifications: Notification[];
};

export const NotificationContext =
  createContext<NotificationSocketContextType | null>(null);
