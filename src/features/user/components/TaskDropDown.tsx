import { Edit2, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";

export const TaskDropdown = ({ onUpdate, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-gray-300 dark:focus:ring-gray-600"
        aria-label="Task actions"
      >
        <MoreVertical className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-20 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 backdrop-blur-sm dark:backdrop-blur-sm overflow-hidden">
            <div className="py-1">
              <button
                onClick={() => {
                  onUpdate();
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all duration-200"
              >
                <Edit2 className="h-4 w-4 mr-2 opacity-70 group-hover:opacity-100" />
                Update
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-rose-50/60 dark:hover:bg-rose-900/20 hover:text-rose-600 dark:hover:text-rose-300 transition-all duration-200"
              >
                <Trash2 className="h-4 w-4 mr-2 opacity-70 group-hover:opacity-100" />
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
