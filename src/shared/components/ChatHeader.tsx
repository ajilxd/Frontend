

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


interface ChatHeaderProps {
  name: string;
  status?: "online" | "offline" | "away";
  avatarSrc?: string;
  onVideoCall?: () => void;
}

export function ChatHeader({
  name = "John Doe",
  status = "online",
  avatarSrc,

}: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-sm font-medium">{name}</h2>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <span
              className={`h-2 w-2 rounded-full ${
                status === "online"
                  ? "bg-green-500"
                  : status === "away"
                  ? "bg-yellow-500"
                  : "bg-gray-500"
              }`}
            />
            {status}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
       
      </div>
    </header>
  );
}
