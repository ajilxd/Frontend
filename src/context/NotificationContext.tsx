import { createContext } from "react";
import { Socket } from "socket.io-client";
import { EventType } from "./NotificationContextProvider";


type NotificationSocketContextType = {
  notificationSocket: Socket;
  connectNotificationSocket: (data: EventType) => void
  sendNotification: (companyId: string, targetSpaceId: string, notificationContent: string, notificationType: "warning" | "info" | "alert", storeNotificationOnDb: boolean,notificationSenderId:string) => void
  clearNotification: () => void;
  notifications: EventType[];
  updateNotifications: (data: EventType[]) => void
};

export const NotificationContext =
  createContext<NotificationSocketContextType | null>(null);
