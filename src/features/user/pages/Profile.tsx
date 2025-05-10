import { baseUrl } from "@/constants/app";
import { useFormik } from "formik";
import { User, Camera } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";

const SimpleProfileEdit = () => {
  const [avatarUrl, setAvatarUrl] = useState("/api/placeholder/200/200");

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    bio: Yup.string()
      .required("Bio is required")
      .min(10, "Bio must be at least 10 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: "Sarah Johnson",
      bio: "Product designer with over 5 years of experience creating intuitive digital experiences and exploring new design systems.",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitted profile:", { ...values, avatarUrl });
      alert("Profile updated successfully!");
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const filename = encodeURIComponent(file.name); // Optional: sanitize or append UUID
    const res = await fetch(`${baseUrl}/s3/presign?filename=${filename}`);
    const { url } = await res.json();

    const uploadRes = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });
    console.log(uploadRes);
    if (uploadRes.ok) {
      const publicUrl = `https://fluentawork-assets.s3.eu-north-1.amazonaws.com/${filename}`;
      console.log("Uploaded to:", publicUrl);
      setAvatarUrl(publicUrl);
    } else {
      console.error("Upload failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center mb-6">Edit Profile</h1>

      <div className="space-y-6">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-300">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>

            <label
              htmlFor="avatar-upload"
              className="absolute -right-2 bottom-0"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white cursor-pointer">
                <Camera className="h-4 w-4" />
              </div>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`w-full p-2 border rounded-md ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-300"
            }`}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          )}
        </div>

        {/* Bio field */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            className={`w-full p-2 border rounded-md ${
              formik.touched.bio && formik.errors.bio
                ? "border-red-500"
                : "border-gray-300"
            }`}
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.bio && formik.errors.bio && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.bio}</div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
};

export default SimpleProfileEdit;
