import { io } from "socket.io-client";

export const peerSocket = io("http://localhost:8000/peers", {
  autoConnect: false,
});
