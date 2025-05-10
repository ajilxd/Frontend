import { CheckCircle, ArrowUpCircle, Calendar } from "lucide-react";

export const getStatusConfig = (status) => {
  const configs = {
    completed: {
      classes:
        "text-green-700 bg-green-50 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-900",
      icon: <CheckCircle className="h-3 w-3 mr-1" />,
      label: "Completed",
    },
    "in-progress": {
      classes:
        "text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900",
      icon: <ArrowUpCircle className="h-3 w-3 mr-1" />,
      label: "In Progress",
    },
    "not-started": {
      classes:
        "text-gray-700 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
      icon: <Calendar className="h-3 w-3 mr-1" />,
      label: "Not Started",
    },
  };

  return (
    configs[status] || {
      classes:
        "text-gray-700 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
      icon: null,
      label: status,
    }
  );
};
