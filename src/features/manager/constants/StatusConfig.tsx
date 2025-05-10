import {
  Clock,
  AlertCircle,
  XCircle,
  RotateCw,
  CheckCircle,
} from "lucide-react";

export const getStatusConfig = (status: string) => {
  const statusLower = status.toLowerCase();

  switch (statusLower) {
    case "completed":
      return {
        icon: <CheckCircle className="h-3 w-3 mr-1" />,
        classes:
          "bg-green-50 text-green-700 border-green-200 ring-green-500/20 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800 dark:ring-green-500/30",
        label: "Completed",
      };
    case "pending":
      return {
        icon: <Clock className="h-3 w-3 mr-1" />,
        classes:
          "bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800 dark:ring-amber-500/30",
        label: "Pending",
      };
    case "in_progress":
      return {
        icon: <RotateCw className="h-3 w-3 mr-1" />,
        classes:
          "bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 dark:ring-blue-500/30",
        label: "In Progress",
      };
    case "cancelled":
      return {
        icon: <XCircle className="h-3 w-3 mr-1" />,
        classes:
          "bg-red-50 text-red-700 border-red-200 ring-red-500/20 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800 dark:ring-red-500/30",
        label: "Cancelled",
      };
    default:
      return {
        icon: <AlertCircle className="h-3 w-3 mr-1" />,
        classes:
          "bg-gray-50 text-gray-700 border-gray-200 ring-gray-500/20 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:ring-gray-500/30",
        label: status,
      };
  }
};
