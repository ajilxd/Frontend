import { Users } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Participant = {
  id: string;
  name: string;
  avatar?: string;
  status: string;
  lastSeen?: string;
};

interface SidebarProps {
  participants: Participant[];
  currentChat?: {
    id: string;
    name: string;
    participants: number;
  };
}

export function ChatSidebar({ participants, currentChat }: SidebarProps) {
  console.log("participants", participants);
  return (
    <div className="w-full h-full border-r border-border flex flex-col">
      {currentChat && (
        <Card className="rounded-none border-b border-t-0 border-l-0 border-r-0">
          <CardHeader className="p-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team chat
              <Badge variant="outline" className="ml-2">
                {currentChat.participants} participants
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>
      )}

      <ScrollArea className="flex-1">
        <div className="p-4">
          <h3 className="text-sm font-medium mb-3">Members</h3>
          <div className="space-y-3">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors"
              >
                <Avatar>
                  <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary/10">
                    {participant.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">
                      {participant.name}
                    </p>
                    <span
                      className={`h-2 w-2 rounded-full ${
                        participant.status === "online"
                          ? "bg-green-500"
                          : participant.status === "away"
                          ? "bg-yellow-500"
                          : "bg-gray-300"
                      }`}
                    />
                  </div>
                  {participant.role && (
                    <p className="text-xs text-muted-foreground">
                      {participant.role}
                    </p>
                  )}
                  {participant.lastSeen && participant.status !== "online" && (
                    <p className="text-xs text-muted-foreground">
                      Last seen: {participant.lastSeen}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
