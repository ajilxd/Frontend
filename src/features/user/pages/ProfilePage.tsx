import { Edit2, Upload } from "lucide-react";
import React, { useState, ChangeEvent } from "react";

import { baseUrl } from "@/constants/app";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Profile {
  image: string;
  fullName: string;
  bio: string;
  invitedBy: string;
  role: string;
  joinedDate: string;
  companyName: string;
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    image: "https://via.placeholder.com/96",
    fullName: "John Doe",
    bio: "Software engineer passionate about building scalable web applications.",
    invitedBy: "Jane Smith",
    role: "Developer",
    joinedDate: "January 15, 2023",
    companyName: "Tech Corp",
  });

  const handleImageUpload = async (e) => {
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
      const errorDetails = await uploadRes.text(); // Get error details from AWS
      console.error("Upload failed:", errorDetails);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="max-w-2xl w-full mx-auto">
      <Card className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="relative flex h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700">
                  <AvatarImage src={profile.image} alt="Profile" />
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                    {profile.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label
                    htmlFor="image-upload"
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition"
                  >
                    <Upload size={16} />
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Editable Fields */}
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="fullName"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    id="fullName"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {profile.fullName}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="bio"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Bio
                </Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    className="mt-1"
                    rows={4}
                  />
                ) : (
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {profile.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Non-editable Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Invited By
                </Label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {profile.invitedBy}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Role
                </Label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {profile.role}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Joined Date
                </Label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {profile.joinedDate}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Company Name
                </Label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {profile.companyName}
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex justify-end">
              <Button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Save Profile" : "Edit Profile"}
                {!isEditing && <Edit2 className="ml-2" size={16} />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
