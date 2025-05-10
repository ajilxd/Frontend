import { Send, PlusCircle, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageType } from "@/context/SocketContext";
import { useSocket } from "@/hooks/useSocket";
import { RootState } from "@/redux/store/appStore";

// Mock data for group members
const groupMembers = [
  {
    id: 1,
    name: "Alex Thompson",
    avatar: "/api/placeholder/24/24",
    status: "online",
  },
  {
    id: 2,
    name: "Morgan Lee",
    avatar: "/api/placeholder/24/24",
    status: "online",
  },
];

export default function GroupChatPage() {
  const { connected, joinRoom, sendMessage, receiveMessage, activeUsers } =
    useSocket();
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const { spaceid } = useParams();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!connected || !spaceid) return;

    joinRoom({ room: spaceid });

    const unsubscribe = receiveMessage((msg: MessageType) => {
      setMessages((prev) => [...prev, msg]);
    });

    const onlineUsers = activeUsers((data) =>
      setOnlineUsersCount(data.length + 1)
    );

    return () => {
      unsubscribe();
      onlineUsers();
    };
  }, [connected, spaceid, receiveMessage, joinRoom]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const timestamp = new Date().toLocaleTimeString();

    const message: MessageType = {
      id: `${messages.length + 1}`,
      content: newMessage,
      avatar: user.profile.image ?? "",
      room: spaceid!,
      sender: user.profile.name,
      timestamp,
    };

    sendMessage(message);
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Weekend Plans</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">5 members</p>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
            MEMBERS
          </h3>
          <div className="space-y-3"></div>
        </div>

        <Separator />

        <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <Settings size={16} />
            <span>Group Settings</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Weekend Plans</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {onlineUsersCount} online
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2"></div>
          </div>
        </div>

        {/* Messages area */}
        <ScrollArea className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
          <div className="space-y-4">
            {messages.map((message) => {
              const isCurrentUser = message.sender === user.profile.name;
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${isCurrentUser ? "justify-end" : ""}`}
                >
                  {!isCurrentUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.avatar} alt={message.sender} />
                      <AvatarFallback className="text-xs bg-gray-200 dark:bg-gray-600">
                        {message.sender
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-md ${
                      isCurrentUser
                        ? "bg-blue-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg"
                        : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-tl-lg rounded-tr-lg rounded-br-lg"
                    } px-4 py-2 shadow-sm`}
                  >
                    {!isCurrentUser && (
                      <p className="text-xs font-medium mb-1">
                        {message.sender}
                      </p>
                    )}
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp}
                    </p>
                  </div>
                  {isCurrentUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.avatar} alt={message.sender} />
                      <AvatarFallback className="text-xs bg-blue-100 dark:bg-blue-900">
                        {message.sender[0]}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <PlusCircle size={20} />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="pr-12 rounded-full"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
