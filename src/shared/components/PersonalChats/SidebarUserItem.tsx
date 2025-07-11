import { IParticipantMetadata, IUserChatlist } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

export const SidebarUserItem = ({
  user,
  onStartChat,
  selectedChatHandler,
}: {
  user: IParticipantMetadata;
  onStartChat: (data: IParticipantMetadata) => void;
  selectedChatHandler: (data: IUserChatlist | null) => void;
}) => (
  <div className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors duration-200 group">
    <div className="relative">
      <Avatar className="w-10 h-10">
        <AvatarImage src={user.image} alt={user.name} />
        <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
          {user.name.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      {user.lastSeen && (
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
      )}
    </div>

    <div className="flex-1 ml-3 min-w-0">
      <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
        {user.name}
      </h3>
      {user.lastSeen && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {"" + user.lastSeen}
        </p>
      )}
    </div>

    <button
      onClick={() => {
        onStartChat(user);
        selectedChatHandler(null);
      }}
      className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100"
    >
      <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
    </button>
  </div>
);
