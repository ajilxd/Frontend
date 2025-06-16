import { Menu, Moon, Sun, Bell, Search } from "lucide-react";
import { useContext } from "react";

import { ThemeContext } from "@/context/ThemeContext";

type NavbarProps = {
  toggleSidebar: () => void;
};

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="h-16 px-6 border-b flex items-center justify-between bg-white text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-white dark:border-gray-700">
      <div className="flex items-center">
        <button className="lg:hidden mr-2" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
        <div className="relative mx-4 lg:mx-0"></div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <Bell size={20} />
        </button>

        <button
          onClick={toggleTheme}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="flex items-center focus:outline-none">
          <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
            A
          </div>
        </button>
      </div>
    </header>
  );
}
