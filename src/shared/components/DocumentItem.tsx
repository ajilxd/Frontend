import { FileText } from "lucide-react";

import { DocType } from "@/types";

const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

type Props = {
  doc: Partial<DocType>;
  isActive: boolean;
  onClick: (doc: DocType) => void;
};

export const DocumentItem = ({ doc, isActive, onClick }: Props) => (
  <div
    onClick={() => onClick(doc as DocType)}
    className={cn(
      "p-3 mb-2 rounded-md cursor-pointer transition-colors duration-200",
      isActive
        ? "bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500"
        : "hover:bg-gray-100 dark:hover:bg-gray-800/60"
    )}
  >
    <div className="flex items-center">
      <FileText
        size={18}
        className={cn("mr-2", isActive ? "text-blue-500" : "text-gray-500")}
      />
      <h3 className="font-medium text-sm truncate">{doc.title}</h3>
    </div>
    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
      {formatDate(doc.createdAt!)}
    </p>
  </div>
);
