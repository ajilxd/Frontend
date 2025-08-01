import { Edit2, Upload } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import React, { useState, ChangeEvent, useEffect } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { baseUrl } from "@/constants/app";
import {
  managerGetData,
  managerProfileUpdate,
} from "@/features/manager/api/manager.api";
import {
  ownerGetData,
  ownerProfileUpdate,
} from "@/features/owner/api/owner.api";
import { userGetData, userProfileUpdate } from "@/features/user/api/user.api";

export interface Profile {
  image: string;
  name: string;
  bio: string;
  createdAt?: string;
  managerName?: string;
  companyName?: string;
  role?: string;
  userId?: string;
  managerId?: string;
  ownerId?: string;
}

type Props = {
  role: string;
  id: string;
};

const Profile: React.FC<Props> = ({ role, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const [profile, setProfile] = useState<Profile>({
    image: "",
    name: "",
    bio: "",
  });

  useEffect(() => {
    if (role === "user") {
      userGetData(id).then((data) => {
        setProfile(data);
        setAvatarUrl(data.image);
      });
    } else if (role === "manager") {
      managerGetData(id).then((data) => {
        setProfile(data);
        setAvatarUrl(data.image);
      });
    } else if (role === "owner") {
      ownerGetData(id).then((data) => {
        setProfile(data);
        setAvatarUrl(data.image);
      });
    }
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const filename = encodeURIComponent(file.name);
    const res = await fetch(`${baseUrl}/s3/presign?filename=${filename}`);
    const { url } = await res.json();
    console.log(url);

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
      const errorDetails = await uploadRes.text();
      console.error("Upload failed:", errorDetails);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleUserSubmission = async (data: Profile) => {
    const response = await userProfileUpdate(data);
    if (response.success) {
      enqueueSnackbar("profile updation went succesfull", {
        variant: "success",
      });
    } else {
      console.warn("something went wrong", response.message);
    }
  };

  const handleManagerSubmission = async (data: Profile) => {
    const response = await managerProfileUpdate(data);
    if (response.success) {
      enqueueSnackbar("profile updation went succesfull", {
        variant: "success",
      });
    } else {
      console.warn("something went wrong", response.message);
    }
  };

  const handleOwnerSubmission = async (data: Profile) => {
    const response = await ownerProfileUpdate(data);
    if (response.success) {
      enqueueSnackbar("profile updation went succesfull", {
        variant: "success",
      });
    } else {
      console.warn("something went wrong", response.message);
    }
  };

  const handleSubmission = (data: Profile) => {
    if (role === "user") {
      handleUserSubmission(data);
    } else if (role === "manager") {
      handleManagerSubmission(data);
    } else if (role === "owner") {
      handleOwnerSubmission(data);
    } else {
      throw new Error("Unexpected role");
    }
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
                  <AvatarImage src={avatarUrl} alt="Profile" />
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                    {profile.name
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
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="mt-1"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {profile.name}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {role === "user" && (
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Invited By
                  </Label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {profile?.managerName}
                  </p>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Role
                </Label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {profile?.role}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Joined Date
                </Label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {profile?.createdAt &&
                    new Date(profile.createdAt).toDateString()}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Company Name
                </Label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {profile?.companyName}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => {
                  setIsEditing(!isEditing);
                  if (isEditing) {
                    handleSubmission({
                      ...profile,
                      image: avatarUrl,
                      userId: id,
                      managerId: id,
                      ownerId: id,
                    });
                  }
                }}
              >
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

export default Profile;
