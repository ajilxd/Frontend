import { ImagePlus } from "lucide-react";
import { useRef } from "react";

export function ImageIconUpload({
  onSelect,
}: {
  onSelect: (file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files?.[0]);
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed!");
        return;
      }
      onSelect(file);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="p-3 border rounded-md hover:bg-muted transition-colors"
        type="button"
      >
        <ImagePlus className="w-6 h-6" />
      </button>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={fileInputRef}
        className="hidden"
      />
    </div>
  );
}
