import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Info, Phone, Video } from "lucide-react";
import { ExpandableChatHeader } from "@/components/ui/chat/expandable-chat";
import { IParticipantMetadata } from "@/types";

interface ChatTopbarProps {
  selectedUser: IParticipantMetadata;
}

export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];

export default function ChatTopbar({ selectedUser }: ChatTopbarProps) {
  return (
    <ExpandableChatHeader>
      <div className="flex items-center gap-2">
        <Avatar className="flex justify-center items-center">
          <AvatarImage
            src={selectedUser.image}
            alt={selectedUser.name}
            width={6}
            height={6}
            className="w-10 h-10"
          />
          <AvatarFallback>
            {selectedUser.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{selectedUser.name}</span>
          <span className="text-xs">
            {selectedUser?.lastSeen
              ? new Date(selectedUser.lastSeen)?.toLocaleDateString()
              : ""}
          </span>
        </div>
      </div>

      <div className="flex gap-1"></div>
    </ExpandableChatHeader>
  );
}
