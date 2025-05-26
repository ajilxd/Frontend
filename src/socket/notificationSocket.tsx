import { io } from "socket.io-client";

export const notificationSocket = io("http://localhost:8000/notifications", {
  autoConnect: false,
});
