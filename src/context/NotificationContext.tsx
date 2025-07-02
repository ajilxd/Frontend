import { createContext } from "react";
import { Socket } from "socket.io-client";
import { EventType, PeerMessageType } from "./NotificationContextProvider";

type NotificationSocketContextType = {
  notificationSocket: Socket;
  connectNotificationSocket: (data: EventType) => void;
  sendNotification: (
    companyId: string,
    targetSpaceId: string,
    notificationContent: string,
    notificationType: "warning" | "info" | "alert",
    storeNotificationOnDb: boolean,
    notificationSenderId: string
  ) => void;
  clearNotification: () => void;
  notifications: EventType[];
  updateNotifications: (data: EventType[]) => void;
  sendMessageToPeer: (data: PeerMessageType) => void;
  receiveMessageFromPeer: (
    callback: (msg: PeerMessageType) => void
  ) => () => void;
};

export const NotificationContext =
  createContext<NotificationSocketContextType | null>(null);
