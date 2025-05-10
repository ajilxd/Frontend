import Quill from "quill";
import { useEffect, useRef } from "react";

import "quill/dist/quill.snow.css";

export const QuillEditor = ({
  content,
  onContentChange,
}: {
  content: string;
  onContentChange: (data: string) => void;
}) => {
  const editorRef = useRef(null);
  const quillInstanceRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillInstanceRef.current) {
      quillInstanceRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Type something epic...",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        },
      });

      quillInstanceRef.current.on("text-change", () => {
        if (onContentChange && quillInstanceRef.current) {
          onContentChange(quillInstanceRef.current.root.innerHTML);
        }
        console.log(
          quillInstanceRef.current && quillInstanceRef.current.root.innerHTML
        );
      });
    }

    return () => {
      // Cleanup if needed
    };
  }, [onContentChange]);

  useEffect(() => {
    if (quillInstanceRef.current && content) {
      if (quillInstanceRef.current.root.innerHTML !== content) {
        quillInstanceRef.current.root.innerHTML = content;
      }
    }
  }, [content]);

  return (
    <div className="w-full">
      <div
        ref={editorRef}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md"
        style={{ height: "calc(100vh - 180px)" }}
      />
    </div>
  );
};
