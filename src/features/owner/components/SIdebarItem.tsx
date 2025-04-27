import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <Button
      onClick={onClick}
      variant={isActive ? "secondary" : "ghost"} // or use "default" if you want bold active
      className={cn(
        "justify-start gap-3 w-full",
        isActive && "bg-gray-800 text-purple-400 hover:bg-gray-800"
      )}
    >
      <Icon size={20} />
      {label}
    </Button>
  );
};

export default SidebarItem;
