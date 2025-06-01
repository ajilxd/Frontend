import {
  DtlsParameters,
  MediaKind,
  RtpCapabilities,
  RtpParameters,
} from "mediasoup-client/types";
import { createContext } from "react";
import { Socket } from "socket.io-client";

type ProducersForConsumingType = {
  id: string;
  kind: MediaKind;
  userId: string;
}[];

type PeerSocketContextType = {
  peerSocket: Socket;
  connected: boolean;
  connectTransport: (
    transportId: string,
    dtlsParameters: DtlsParameters,
    userId: string,
    meetingId: string
  ) => Promise<void>;

  produceMedia: (
    transportId: string,
    kind: "audio" | "video",
    rtpParameters: RtpParameters,
    userId: string,
    meetingId: string
  ) => Promise<{ id: string }>;

  consumeMedia: (
    transportId: string,
    producerId: string,
    rtpCapabilities: RtpCapabilities,
    userId: string,
    meetingId: string
  ) => Promise<{
    id: string;
    producerId: string;
    kind: MediaKind;
    rtpParameters: RtpParameters;
  }>;

  joinMeeting: (
    userId: string,
    meetingId: string
  ) => Promise<
    Array<{
      id: string;
      kind: MediaKind;
      userId: string;
    }>
  >;

  producersForConsuming: ProducersForConsumingType;
  resetNewParticipant: () => void;
  newParticipant: string | null;

  terminateMeeting: (userId: string, meetingId: string) => void;
  leaveMeeting: (userId: string, meetingId: string, name: string) => void;

  recentQuitter: { name: string; userId: string } | null;
  resetRecentQuitter: () => void;

  resetMeetingTermination: () => void;
  meetingIsTerminated:boolean;

  resetRefreshMeeting: () => void;
  refreshMeeting:boolean

  triggerRefreshMeeting: (spaceId: string) => void
};

export const PeerSocketContext = createContext<PeerSocketContextType | null>(
  null
);
