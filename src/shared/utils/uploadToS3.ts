import { baseUrl } from "@/constants/app";

export const uploadToS3 = async (file: File) => {
  const res = await fetch(
    `${baseUrl}/s3/presign?filename=${encodeURIComponent(file.name)}`
  );
  const data = await res.json();

  if (!data.url) throw new Error("Failed to get presigned URL");

  const uploadUrl = data.url;

  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error("Upload failed");
  }

  const publicUrl = uploadUrl.split("?")[0];
  return publicUrl;
};
