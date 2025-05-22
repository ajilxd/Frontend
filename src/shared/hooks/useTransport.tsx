import { useContext } from "react";

import {
  TransportContextType,
  TransportContext,
} from "@/context/TransportContext";

export const useTransport = (): TransportContextType => {
  const context = useContext(TransportContext);
  if (!context) {
    throw new Error("❌ useTransport must be used within a TransportProvider");
  }
  return context;
};
