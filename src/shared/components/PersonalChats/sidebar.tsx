import { Link } from "react-router-dom";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { managerFetchCompanyMembers } from "@/features/manager/api/manager.api";
import { userFetchCompanyMembers } from "@/features/user/api/user.api";
import { CompanyMemberType } from "@/types";

interface SidebarProps {
  isCollapsed: boolean;
  onClick?: () => void;
  isMobile: boolean;
  selectUserHandler: (data: CompanyMemberType) => void;
  user: {
    id: string;
    profile: { name?: string; image?: string };
    company: { id: string; name: string };
    role: string;
  };
}

export function Sidebar({
  isCollapsed,
  user,
  selectUserHandler,
}: SidebarProps) {
  const [chats, setChats] = useState<CompanyMemberType[]>([]);

  useEffect(() => {
    async function updateChats() {
      const fetchFn =
        user.role === "manager"
          ? managerFetchCompanyMembers
          : userFetchCompanyMembers;
      const res = await fetchFn(user.company.id);
      console.log(res);
      if (res.success) {
        setChats(res.data.filter((i:CompanyMemberType) => i.userId !== user.id));
      } else {
        console.warn("Error fetching chats", res.message);
      }
    }
    updateChats();
  }, []);

  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        "relative group flex flex-col h-full bg-muted/10 dark:bg-muted/20 gap-4 transition-all",
        isCollapsed ? "p-2" : "p-4"
      )}
    >
      {!isCollapsed && (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-medium">
            <p>Chats</p>
            <span className="text-zinc-400">({chats.length})</span>
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
      )}

      <nav
        className={cn("grid gap-1", isCollapsed ? "justify-center" : "px-2")}
      >
        {chats.map((chat, index) => {
          const variant = chat?.userId || "ghost";
          const avatar = (
            <Avatar className="w-10 h-10">
              <AvatarImage src={chat.image} alt={chat.name} />
              <AvatarFallback>
                {chat.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          );

          if (isCollapsed) {
            return (
              <TooltipProvider key={index}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      to="#"
                      className={cn(
                        buttonVariants({ variant, size: "icon" }),
                        "h-11 w-11 md:h-14 md:w-14",
                        variant === "secondary" &&
                          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      )}
                    >
                      {avatar}
                      <span className="sr-only">{chat.name}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="text-sm">
                    {chat.name}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          }

          return (
            <div
              onClick={() => selectUserHandler(chat)}
              className={cn(
                buttonVariants({ variant, size: "lg" }),
                "justify-start items-center gap-4",
                variant === "secondary" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
              )}
            >
              {avatar}
              <div className="flex flex-col max-w-[8rem]">
                <span className="truncate">{chat.name}</span>
                {/* Uncomment and update if messages needed:
                <span className="text-zinc-400 text-xs truncate">
                  {chat.messages.length > 0 &&
                    `${chat.name.slice(0, 2)}: ${
                      chat.messages[chat.messages.length - 1].isLoading
                        ? "Typing..."
                        : chat.messages[chat.messages.length - 1].content
                    }`}
                </span>
                */}
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
