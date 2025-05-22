import {
  RtpCapabilities,
  Device,
  Transport,
  TransportOptions,
  Consumer,
  AppData,
} from "mediasoup-client/types";
import { useState, ReactNode, useCallback, useRef } from "react";

import { usePeerSocket } from "@/shared/hooks/usePeerSocket";

import { TransportContext } from "./TransportContext";

export const TransportProvider = ({ children }: { children: ReactNode }) => {
  const connectedTransports = useRef(new Set<string>());
  const { connectTransport, produceMedia, consumeMedia } = usePeerSocket();
  const [device, setDevice] = useState<Device | null>(null);
  const [sendTransport, setSendTransport] = useState<Transport | null>(null);
  const [recvTransport, setRecvTransport] = useState<Transport | null>(null);
  const [consumers, setConsumers] = useState<Consumer[]>([]);

  const loadDevice = useCallback(
    async (rtpCapabilities: RtpCapabilities): Promise<Device | null> => {
      if (device) return device;

      const newDevice = new Device();
      try {
        await newDevice.load({ routerRtpCapabilities: rtpCapabilities });
        console.log("✅ Device loaded with RTP Capabilities");
        setDevice(newDevice);
        return newDevice;
      } catch (err) {
        console.error("❌ Failed to load device:", err);
        return null;
      }
    },
    [device]
  );

  const createSendTransport = useCallback(
    (
      params: TransportOptions,
      targetDevice: Device | null = null,
      userId: string,
      meetingId: string
    ) => {
      const activeDevice = targetDevice ?? device;
      if (!activeDevice) {
        console.error("❌ Device not initialized yet");
        return;
      }

      const transport = activeDevice.createSendTransport(params);

      transport.on("connect", async ({ dtlsParameters }, callback, errback) => {
        if (connectedTransports.current.has(transport.id)) {
          console.log("🚫 Transport already connected, skipping connect call");
          callback();
          return;
        }
        try {
          await connectTransport(
            transport.id,
            dtlsParameters,
            userId,
            meetingId
          );
          connectedTransports.current.add(transport.id);
          callback();
        } catch (err) {
          errback(err);
        }
      });

      transport.on(
        "produce",
        async ({ kind, rtpParameters }, callback, errback) => {
          try {
            const { id: serverProducerId } = await produceMedia(
              transport.id,
              kind,
              rtpParameters,
              userId,
              meetingId
            );
            callback({ id: serverProducerId });
          } catch (error) {
            errback(error);
          }
        }
      );

      transport.on("connectionstatechange", (state) => {
        console.log("🔌 Send transport connection state:", state);
        if (
          state === "disconnected" ||
          state === "closed" ||
          state === "failed"
        ) {
          connectedTransports.current.delete(transport.id);
          setSendTransport(null);
        }
      });

      setSendTransport(transport);
    },
    [device, connectTransport, produceMedia]
  );

  const createRecvTransport = useCallback(
    (
      params: TransportOptions,
      targetDevice: Device | null = null,
      userId: string,
      meetingId: string
    ) => {
      const activeDevice = targetDevice ?? device;
      if (!activeDevice) {
        console.error("❌ Device not initialized");
        return;
      }

      const transport = activeDevice.createRecvTransport(params);

      transport.on("connect", async ({ dtlsParameters }, callback, errback) => {
        try {
          await connectTransport(
            transport.id,
            dtlsParameters,
            userId,
            meetingId
          );
          callback();
        } catch (err) {
          errback(err);
        }
      });

      transport.on("connectionstatechange", (state) => {
        console.log("🔌 Recv transport connection state:", state);
        if (
          state === "disconnected" ||
          state === "closed" ||
          state === "failed"
        ) {
          setRecvTransport(null);
        }
      });

      setRecvTransport(transport);
    },
    [device, connectTransport]
  );

  // 👇 Call this function once you get a producerId from another peer
  const consumeFromPeer = useCallback(
    async (
      producerId: string,
      rtpCapabilities: RtpCapabilities,
      userId: string,
      meetingId: string
    ) => {
      if (!recvTransport || !device) {
        throw new Error("Recv transport or device not initialized");
      }

      try {
        const { id, kind, rtpParameters } = await consumeMedia(
          recvTransport.id,
          producerId,
          rtpCapabilities,
          userId,
          meetingId
        );

        const consumer = await recvTransport.consume({
          id,
          producerId,
          kind,
          rtpParameters,
          appData: { userId },
        });

        setConsumers((prev) => [...prev, consumer]);

        // 🔥 Convert the consumer track into a MediaStream
        const mediaStream = new MediaStream([consumer.track]);

        return mediaStream;
      } catch (error) {
        console.error("❌ Failed to consume media:", error);
        throw error;
      }
    },
    [recvTransport, device, consumeMedia]
  );

  const updateConsumer = useCallback(
    (data: Consumer<AppData>[]) => setConsumers(data),
    []
  );

  return (
    <TransportContext.Provider
      value={{
        device,
        sendTransport,
        loadDevice,
        createSendTransport,
        createRecvTransport,
        recvTransport,
        consumeFromPeer,
        consumers,
        updateConsumer,
      }}
    >
      {children}
    </TransportContext.Provider>
  );
};
