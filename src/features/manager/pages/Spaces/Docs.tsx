import { FilePlus, Edit2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DocumentItem } from "@/shared/components/DocumentItem";
import { EmptyDocState } from "@/shared/components/EmptyDocState";
import { QuillEditor } from "@/shared/components/QuillEditor";
import { DocType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

const initialDocs = [
  {
    _id: "1",
    title: "Welcome Document",
    content:
      "<h1>Welcome to the Document Editor!</h1><p>Start creating your documents here.</p>",
    createdAt: new Date("2025-05-01"),
  },
  {
    _id: "2",
    title: "Project Ideas",
    content:
      "<h1>Project Ideas</h1><p>List of potential projects to work on:</p><ul><li>Document management system</li><li>Task tracker</li></ul>",
    createdAt: new Date("2025-05-03"),
  },
  {
    _id: "3",
    title: "Meeting Notes",
    content:
      "<h1>Meeting Notes - May 5</h1><p>Key points discussed:</p><ul><li>Project deadlines</li><li>Resource allocation</li></ul>",
    createdAt: new Date("2025-05-05"),
  },
];

export default function Docs() {
  const queryClient = useQueryClient();
  const [documents, setDocuments] = useState(initialDocs);
  const [selectedDoc, setSelectedDoc] = useState<Partial<DocType> | null>(null);
  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const [newDocument, setNewDocument] = useState<Partial<DocType> | null>(null);

  const handleSelectDocument = (doc: Partial<DocType>) => {
    setSelectedDoc(doc);
    setActiveDocId(doc._id!);
  };

  const handleContentChange = (newContent: string) => {
    if (selectedDoc) {
      const updatedDocs = documents.map((doc) =>
        doc._id === selectedDoc._id ? { ...doc, content: newContent } : doc
      );

      const newDocument = {
        content: newContent,
      };

      setNewDocument(newDocument);
      setDocuments(updatedDocs);
      setSelectedDoc({ ...selectedDoc, content: newContent });
    }
  };

  const handleCreateDocument = () => {
    const newDoc = {
      _id: String(documents.length + 1),
      title: `New Document ${documents.length + 1}`,
      content: "<h1>New Document</h1><p>Start writing here...</p>",
      createdAt: new Date(),
    };

    setDocuments([newDoc, ...documents]);
    setSelectedDoc(newDoc);
    setActiveDocId(newDoc._id);
  };

  const sortedDocuments = [...documents].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <h2 className="font-bold text-lg">Documents</h2>

          <Button
            onClick={handleCreateDocument}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 h-8 w-8 p-0"
          >
            <FilePlus size={16} />
          </Button>
        </div>

        {/* Document List */}
        <div className="flex-1 overflow-y-auto p-3">
          {sortedDocuments.map((doc) => (
            <DocumentItem
              key={doc._id}
              doc={doc}
              isActive={activeDocId === doc._id}
              onClick={handleSelectDocument}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedDoc ? (
          <>
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 px-4 py-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={selectedDoc.title}
                  onChange={(e) => {
                    const updatedDocs = documents.map((doc) =>
                      doc._id === selectedDoc._id
                        ? { ...doc, title: e.target.value }
                        : doc
                    );
                    setDocuments(updatedDocs);
                    setSelectedDoc({ ...selectedDoc, title: e.target.value });
                  }}
                  className="bg-transparent font-semibold text-lg md:text-xl outline-none w-full"
                />
                <Edit2 className="text-gray-500 dark:text-gray-400 w-4 h-4" />
              </div>

              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {formatDate(selectedDoc.createdAt!)}
              </span>
            </div>

            <div className="flex-1 p-4 overflow-auto">
              <QuillEditor
                content={selectedDoc.content!}
                onContentChange={handleContentChange}
              />
            </div>
          </>
        ) : (
          <EmptyDocState onCreateDocument={handleCreateDocument} />
        )}
      </div>
    </div>
  );
}
