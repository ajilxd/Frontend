import { Menu, Moon, Search, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NotificationComponent } from "@/shared/components/Notification";

type NavbarPropsType = {
  toggleSidebar: VoidFunction;
  isDarkMode: boolean;
  toggleTheme: VoidFunction;
};

export const Navbar: React.FC<NavbarPropsType> = ({
  toggleSidebar,
  isDarkMode,
  toggleTheme,
}) => {
  return (
    <>
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative hidden md:block max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 focus-visible:ring-blue-500"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        <NotificationComponent />
      </div>
    </>
  );
};
