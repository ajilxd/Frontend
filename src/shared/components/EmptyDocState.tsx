import { FilePlus, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

export const EmptyDocState = ({
  onCreateDocument,
}: {
  onCreateDocument: () => void;
}) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <FileText size={64} className="text-gray-400 mb-4" />
    <h2 className="text-2xl font-bold mb-2">No Document Selected</h2>
    <p className="text-gray-500 dark:text-gray-400 mb-6">
      Select a document from the sidebar or create a new one
    </p>
    <Button
      onClick={onCreateDocument}
      className="bg-blue-600 hover:bg-blue-700"
    >
      <FilePlus className="mr-2 h-4 w-4" /> Create New Document
    </Button>
  </div>
);
