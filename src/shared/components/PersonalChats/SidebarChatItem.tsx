import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IParticipantMetadata, IUserChatlist } from "@/types";
import { cn } from "@/lib/utils";
import { UseQueryResult } from "@tanstack/react-query";
import { buttonVariants } from "@/components/ui/button";

export const SidebarChatItem = ({
  chat,
  isActive,
  onClick: selectUserHandler,
  isCollapsed,
  user,
  selectedChatHandler,
}: {
  chat: IUserChatlist;
  isActive: boolean;
  onClick: (data: IParticipantMetadata) => void;
  isCollapsed: boolean;
  usePeerChatQuery: (userId: string) => UseQueryResult<IUserChatlist[], Error>;
  selectedChatHandler: (data: IUserChatlist) => void;
  user: {
    id: string;
    profile: { name?: string; image?: string };
    company: { id: string; name: string };
    role: string;
  };
}) => {
  console.log(JSON.stringify(chat));
  const avatar = (
    <Avatar className="w-12 h-12">
      <AvatarImage
        src={
          chat?.participantsMetadata.find((i) => i.userId !== user.id)?.image
        }
        alt={chat?.participantsMetadata.find((i) => i.userId !== user.id)?.name}
      />
      <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
        {chat?.participantsMetadata
          .find((i) => i.userId !== user.id)
          ?.name.charAt(0)
          .toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider
        key={
          chat?.participantsMetadata.find((i) => i.userId !== user.id)?.userId
        }
      >
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div
              onClick={() => {
                const otherParticipant = chat?.participantsMetadata.find(
                  (i) => i.userId !== user.id
                );
                if (otherParticipant) {
                  selectUserHandler(otherParticipant);
                  selectedChatHandler(chat);
                }
              }}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-11 w-11 md:h-14 md:w-14 cursor-pointer",
                isActive && "bg-gray-100 dark:bg-gray-800"
              )}
            >
              {avatar}
              <span className="sr-only">
                {
                  chat?.participantsMetadata.find((i) => i.userId !== user.id)
                    ?.name
                }
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-sm">
            {chat?.participantsMetadata.find((i) => i.userId !== user.id)?.name}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div
      onClick={() => {
        const otherParticipant = chat?.participantsMetadata.find(
          (i) => i.userId !== user.id
        );

        if (otherParticipant) {
          selectUserHandler(otherParticipant);
          selectedChatHandler(chat);
        }
      }}
      className={cn(
        "flex items-center p-3 cursor-pointer transition-colors duration-200",
        isActive
          ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-r-2 border-blue-500 dark:border-blue-400"
          : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
      )}
    >
      <div className="relative">
        {avatar}
        {/* You can add online status here if available in your data */}
      </div>

      <div className="flex-1 ml-3 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
            {chat?.participantsMetadata.find((i) => i.userId !== user.id)?.name}
          </h3>
          {/* Add timestamp if available */}
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(
              chat?.participantsMetadata.find((i) => i.userId !== user.id)
                ?.lastSeen ?? ""
            ).toLocaleDateString()}
          </span>
        </div>
        {/* Add last message if available */}
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
          {chat?.lastMessage}
        </p>
      </div>
    </div>
  );
};
