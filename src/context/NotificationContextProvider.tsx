import { useEffect, useState } from "react";

import { notificationSocket } from "@/socket/notificationSocket";

import { NotificationContext } from "./NotificationContext";

type Props = {
  children: React.ReactNode;
};

type Notification = {
  roomId?: string;
  message: string;
  from?: string;
  timestamp?: string;
  type: string;
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
}


export type EventType ={
  companyId:string;
  consumerId?:string;
  consumerName?:string;
  consumerImageUrl?:string;
  consumerRole?:string;
  consumerLastActive?:string;
  consumerSpaces?:string[];
  targetSpaceId?:string;
  targetSpaceName?:string;
  timestamp?:string;
  producerName?:string;
  producerId?:string;
  producerImageUrl?:string;
  type?:"notification"|"event"|"both";
  isTaskUpdatedEvent?:boolean;
  task?:TaskType;
  notificationContent?:string
  notificationType?:"warning"|"info"|"alert";
  storeNotificationOnDb?:boolean
}

export const NotificationSocketProvider = ({ children }: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      message: "Welcome user to Fluentawork",
      type: "info",
      timestamp: new Date().toLocaleString(),
    },
  ]);

  useEffect(() => {
    const handleNotification = (data: Notification) => {
      console.log("notification received ", data);
      setNotifications((prev) => [...prev, data]);
    };
    notificationSocket.connect();
    notificationSocket.on("notification", handleNotification);

    return () => {
      notificationSocket.off("notification", handleNotification);
    };
  }, []);

  const connectNotificationSocket =(data:EventType)=>{
    const {companyId,consumerId,consumerImageUrl,consumerLastActive,consumerRole,consumerSpaces,consumerName} =data
    const payload:EventType={
      companyId,consumerId,consumerRole,consumerLastActive,consumerSpaces,consumerImageUrl,consumerName
    }
    notificationSocket.emit("user-connect",payload)
  }

  const sendNotification = (roomId: string, message: string, type: string) => {
    const payload: Notification = {
      roomId,
      message,
      type,
      timestamp: new Date().toISOString(),
    };

    notificationSocket.emit("notification", { roomId, ...payload });
  };

  const clearNotification = () => setNotifications([]);

  return (
    <NotificationContext.Provider
      value={{
        notificationSocket,
        sendNotification,
        clearNotification,
        notifications,
        connectNotificationSocket
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
