import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Search,
  User,
  MoreHorizontal,
  SquarePen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { managerFetchCompanyMembers } from "@/features/manager/api/manager.api";
import { userFetchCompanyMembers } from "@/features/user/api/user.api";
import {
  CompanyMemberP2PChatType,
  IParticipantMetadata,
  IUserChatlist,
} from "@/types";

import { SidebarUserItem } from "./SidebarUserItem";
import { SidebarChatItem } from "./SidebarChatItem";
import { UseQueryResult } from "@tanstack/react-query";

interface SidebarProps {
  isCollapsed: boolean;
  selectUserHandler: (data: IParticipantMetadata) => void;
  user: {
    id: string;
    profile: { name?: string; image?: string };
    company: { id: string; name: string };
    role: string;
  };
  selectedUser: IParticipantMetadata | null;
  usePeerChatQuery: (userId: string) => UseQueryResult<IUserChatlist[], Error>;
  selectedChatHandler: (data: IUserChatlist | null) => void;
  refreshChatHandler: () => void;
  refreshChat: boolean;
}

export function Sidebar({
  isCollapsed,
  selectUserHandler,
  selectedUser,
  user,
  usePeerChatQuery,
  selectedChatHandler,
  refreshChat,
}: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [availableUsers, setAvailableUsers] = useState<IParticipantMetadata[]>(
    []
  );

  const { data: chats, refetch } = usePeerChatQuery(user.id);

  useEffect(() => {
    refetch();
  }, [refreshChat]);

  useEffect(() => {
    async function updateMembers() {
      const fetchFn =
        user.role === "manager"
          ? managerFetchCompanyMembers
          : userFetchCompanyMembers;
      const res = await fetchFn(user.company.id);

      if (res.success) {
        setAvailableUsers(
          res.data.filter((i: CompanyMemberP2PChatType) => i.userId !== user.id)
        );
      } else {
        console.warn("Error fetching chats", res.message);
      }
    }
    updateMembers();
  }, [user.company.id, user.id, user.role]);

  const filteredChats = chats?.filter((chat) =>
    chat.participantsMetadata.some((i) =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredUsers = availableUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isCollapsed) {
    return (
      <div
        data-collapsed={isCollapsed}
        className={cn(
          "relative group flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 gap-4 transition-all p-2"
        )}
      >
        <nav className="grid gap-1 justify-center">
          {filteredChats?.map((chat) => (
            <SidebarChatItem
              key={chat.chatId}
              chat={chat}
              isActive={false}
              onClick={selectUserHandler}
              isCollapsed={isCollapsed}
              usePeerChatQuery={usePeerChatQuery}
              user={user}
              selectedChatHandler={selectedChatHandler}
            />
          ))}
        </nav>
      </div>
    );
  }

  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        "relative group flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 gap-4 transition-all "
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-gray-100">
            <p className="text-lg">Chats</p>
            <span className="text-gray-400 dark:text-gray-500">
              ({chats?.length})
            </span>
          </div>
          <div className="flex gap-1">
            <Link
              to="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9"
              )}
            >
              <MoreHorizontal size={20} />
            </Link>
            <Link
              to="#"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9"
              )}
            >
              <SquarePen size={20} />
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search chats and users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
        {/* User's Chats Section */}
        <div className="p-4 pb-2">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Your Chats
          </h2>
        </div>

        <div className="space-y-1">
          {filteredChats && filteredChats?.length > 0 ? (
            filteredChats.map((chat) => (
              <SidebarChatItem
                chat={chat}
                isActive={
                  (selectedUser &&
                    selectedUser.userId ===
                      chat?.participantsMetadata.find(
                        (i) => i.userId !== user.id
                      )?.userId) ??
                  false
                }
                onClick={selectUserHandler}
                selectedChatHandler={selectedChatHandler}
                isCollapsed={isCollapsed}
                usePeerChatQuery={usePeerChatQuery}
                user={user}
              />
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No chats found</p>
            </div>
          )}
        </div>

        <div className="p-4 pb-2 pt-6">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Available Users
          </h2>
        </div>

        <div className="space-y-1 pb-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((availableUser) => (
              <SidebarUserItem
                user={availableUser}
                onStartChat={selectUserHandler}
                selectedChatHandler={selectedChatHandler}
              />
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No users found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
