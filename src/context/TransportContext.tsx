import {
  Device,
  Transport,
  RtpCapabilities,
  TransportOptions,
  Consumer,
  AppData,
} from "mediasoup-client/types";
import { createContext } from "react";

export interface TransportContextType {
  device: Device | null;
  sendTransport: Transport | null;
  loadDevice: (rtpCapabilities: RtpCapabilities) => Promise<Device | null>;
  createSendTransport: (
    params: TransportOptions,
    activeDevice: Device | null,
    userId: string,
    meetingId: string
  ) => void;
  recvTransport: Transport | null;

  createRecvTransport: (
    params: TransportOptions,
    deviceOverride: Device,
    userId: string,
    meetingId: string
  ) => void;

  consumeFromPeer: (
    producerId: string,
    rtpCapabilities: RtpCapabilities,
    userId: string,
    meetingId: string
  ) => Promise<MediaStream>;

  consumers: Consumer<AppData>[];

  updateConsumer: (data: Consumer<AppData>[]) => void;

  sendTransportConnected: boolean;
  recvTransportConnected: boolean;
}

export const TransportContext = createContext<TransportContextType | undefined>(
  undefined
);
