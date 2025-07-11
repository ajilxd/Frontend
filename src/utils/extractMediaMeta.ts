export async function extractMediaMeta(file: File): Promise<{
  contentType: string;
  size: number;
  originalName: string;
  duration: number | null;
  extension: string;
}> {
  const contentType = file.type;
  const size = file.size;
  const originalName = file.name;
  const extension = file.name.split(".").pop() || "";

  let duration: number | null = null;

  if (contentType.startsWith("audio/") || contentType.startsWith("video/")) {
    duration = await getMediaDuration(file);
  }

  return {
    contentType,
    size,
    originalName,
    duration,
    extension,
  };
}

async function getMediaDuration(file: File): Promise<number> {
  return new Promise((resolve) => {
    const media = document.createElement(
      file.type.startsWith("video") ? "video" : "audio"
    );
    media.preload = "metadata";

    media.onloadedmetadata = () => {
      URL.revokeObjectURL(media.src);
      resolve(media.duration);
    };

    media.src = URL.createObjectURL(file);
  });
}
