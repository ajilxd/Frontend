import { FilePlus, Edit2 } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store/appStore";
import { DocumentItem } from "@/shared/components/DocumentItem";
import { EmptyDocState } from "@/shared/components/EmptyDocState";
import { QuillEditor } from "@/shared/components/QuillEditor";
import { DocType } from "@/types";

import {
  managerCreateDocument,
  managerUpdateDocument,
} from "../../api/manager.api";
import { useManagerDocumentsQuery } from "@/queries/managers/documents/useUserDocumentsQuery";
import { useNotification } from "@/shared/hooks/useNotification";

const formatDate = (date: Date | string) => {
  const parsedDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return parsedDate.toLocaleDateString("en-US", options);
};

export default function DocumentApp() {
  const manager = useSelector((state: RootState) => state.manager);
  const { spaceid } = useParams();

  if (!spaceid) {
    console.warn("space id is missing...");
    throw new Error("Something went wrong. Try logging in again.");
  }

  const { data: docs = [], refetch } = useManagerDocumentsQuery(spaceid);
  const [selectedDoc, setSelectedDoc] = useState<Partial<DocType> | null>(null);
  const [activeDocId, setActiveDocId] = useState<string | null>(null);

  const { sendNotification } = useNotification();

  const handleSelectDocument = (doc: Partial<DocType>) => {
    setSelectedDoc(doc);
    setActiveDocId(doc._id!);
  };

  const handleContentChange = (newContent: string) => {
    if (!selectedDoc) return;
    const updatedDoc = { ...selectedDoc, content: newContent };

    setSelectedDoc(updatedDoc);
  };

  const handleTitleChange = (newTitle: string) => {
    if (!selectedDoc) return;
    const updatedDoc = { ...selectedDoc, title: newTitle };

    setSelectedDoc(updatedDoc);
  };

  const handleCreateDocument = () => {
    const newDoc: Partial<DocType> = {
      title: selectedDoc?.title,
      content: "<h1>New Document</h1><p>Start writing here...</p>",
      createdAt: new Date(),
      author: manager.id,
    };

    setSelectedDoc(newDoc);
    setActiveDocId(null); // no _id yet
  };

  const handleSubmit = async () => {
    console.log(selectedDoc);
    if (!selectedDoc?.title) {
      enqueueSnackbar("Title is required.", { variant: "warning" });
      return;
    }

    try {
      if (selectedDoc._id) {
        const res = await managerUpdateDocument(selectedDoc._id, selectedDoc);
        if (res.success) {
          enqueueSnackbar("Document updated successfully.");
          sendNotification(
            manager.company.id,
            spaceid,
            `${manager.profile.name} has updated an document , ${selectedDoc.title}`,
            "info",
            true,
            manager.id
          );
          await refetch();
        } else {
          enqueueSnackbar("Failed to update document.", { variant: "error" });
        }
      } else {
        const res = await managerCreateDocument(
          spaceid,
          manager.id,
          selectedDoc.title,
          selectedDoc
        );
        if (res.success) {
          enqueueSnackbar("Document created successfully.");
          sendNotification(
            manager.company.id,
            spaceid,
            `${manager.profile.name} has created an document, ${selectedDoc.title}`,
            "info",
            true,
            manager.id
          );
          await refetch();
        } else {
          enqueueSnackbar("Failed to create document.", { variant: "error" });
        }
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Something went wrong.", { variant: "error" });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
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

        <div className="flex-1 overflow-y-auto p-3">
          {docs.map((doc) => (
            <DocumentItem
              key={doc._id ?? doc.title}
              doc={doc}
              isActive={activeDocId === doc._id}
              onClick={handleSelectDocument}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedDoc ? (
          <>
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 px-4 py-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={selectedDoc.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="bg-transparent font-semibold text-lg md:text-xl outline-none w-full"
                />
                <Edit2 className="text-gray-500 dark:text-gray-400 w-4 h-4" />
              </div>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {selectedDoc.createdAt ? formatDate(selectedDoc.createdAt) : ""}
              </span>
            </div>

            <div className="flex-1 p-4 overflow-auto">
              <QuillEditor
                content={selectedDoc.content || ""}
                onContentChange={handleContentChange}
              />
            </div>

            <div className="flex justify-center my-3">
              <Button className="w-2xl" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </>
        ) : (
          <EmptyDocState onCreateDocument={handleCreateDocument} />
        )}
      </div>
    </div>
  );
}
