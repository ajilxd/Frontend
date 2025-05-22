import { useContext } from "react";

import { PeerSocketContext } from "@/context/PeerSocket";

export const usePeerSocket = () => {
  const context = useContext(PeerSocketContext);

  if (!context) {
    throw new Error(
      "❌ usePeerSocket must be used within a PeerSocketProvider"
    );
  }

  return context;
};
