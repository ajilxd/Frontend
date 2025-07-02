import { useEffect, useState } from "react";

import { notificationSocket } from "@/socket/notificationSocket";

import { NotificationContext } from "./NotificationContext";

type Props = {
  children: React.ReactNode;
};

type TaskType = {
  id: string;
  name: string;
  updatedTime: string;
  spaceId: string;
  updatedBy: {
    id: string;
    name: string;
    imageUrl?: string;
  };
};

export interface IMediaMeta {
  contentType?: string;
  size?: number;
  originalName?: string;
  duration?: number;
  extension?: string;
}

export type EventType = {
  companyId?: string;
  companyName?: string;
  consumerId?: string;
  consumerName?: string;
  consumerImageUrl?: string;
  consumerRole?: string;
  consumerLastActive?: string;
  consumerOwnerName?: string;
  consumerSpaces?: string[];
  targetSpaceId?: string;
  targetSpaceName?: string;
  timestamp?: string;
  producerName?: string;
  producerId?: string;
  producerImageUrl?: string;
  type?: "notification" | "event" | "both";
  isTaskUpdatedEvent?: boolean;
  task?: TaskType;
  notificationContent?: string;
  notificationType?: "warning" | "info" | "alert";
  notificationTimeStamp?: string;
  storeNotificationOnDb?: boolean;
  notificationSenderId?: string;
};

export type PeerMessageType = {
  _id?: string;

  senderId: string;
  receiverId: string;
  type: string;
  content: string;
  mediaMeta?: IMediaMeta;
  read?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  isLoading?: boolean;
  image?: string;
};

export const NotificationSocketProvider = ({ children }: Props) => {
  const [notifications, setNotifications] = useState<EventType[]>([
    {
      notificationContent: "Welcome user to Fluentawork",
      notificationType: "info",
      notificationTimeStamp: new Date().toLocaleString(),
    },
  ]);

  useEffect(() => {
    const handleNotification = (data: EventType) => {
      console.log("notification received ", data);
      setNotifications((prev) => [...prev, data]);
    };
    notificationSocket.connect();
    notificationSocket.on("notification", handleNotification);

    return () => {
      notificationSocket.off("notification", handleNotification);
    };
  }, []);

  const connectNotificationSocket = (data: EventType) => {
    const {
      companyId,
      consumerId,
      consumerImageUrl,
      consumerLastActive,
      consumerRole,
      consumerSpaces,
      consumerName,
      companyName,
    } = data;
    // console.log("data for socket connection notification", data);
    const payload: EventType = {
      companyId,
      consumerId,
      consumerRole,
      consumerLastActive,
      consumerSpaces,
      consumerImageUrl,
      consumerName,
      companyName,
    };
    notificationSocket.emit("user-connect", payload);
  };

  const sendNotification = (
    companyId: string,
    targetSpaceId: string,
    notificationContent: string,
    notificationType: "warning" | "info" | "alert",
    storeNotificationOnDb: boolean,
    notificationSenderId: string
  ) => {
    const payload: EventType = {
      companyId,
      targetSpaceId,
      notificationContent,
      notificationType,
      notificationTimeStamp: new Date().toISOString(),
      storeNotificationOnDb,
      notificationSenderId,
    };

    notificationSocket.emit("notification", payload);
  };

  const sendMessageToPeer = (data: PeerMessageType) => {
    notificationSocket.emit("send-peer-message", data);
  };

  const receiveMessageFromPeer = (
    callback: (msg: PeerMessageType) => void
  ): (() => void) => {
    const handler = (data: PeerMessageType) => {
      callback(data);
    };
    notificationSocket.on("receive-peer-message", handler);

    return () => {
      notificationSocket.off("receive-peer-message", handler);
    };
  };

  const clearNotification = () => setNotifications([]);

  const updateNotifications = (data: EventType[]) => {
    if (data) {
      setNotifications(data);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notificationSocket,
        sendNotification,
        clearNotification,
        notifications,
        connectNotificationSocket,
        updateNotifications,
        sendMessageToPeer,
        receiveMessageFromPeer,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
