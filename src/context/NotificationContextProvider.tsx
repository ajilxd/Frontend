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
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
