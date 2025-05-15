'use client';

import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { Button } from "./Button";
import Avatar from "./Avatar";
import { uploadToCloudinary } from "../lib/cloudinary/upload";

type ProfileFormProps = {
  userId: string;
  onProfileCreated: (profile: any) => void;
};

export default function ProfileForm({ userId, onProfileCreated }: ProfileFormProps) {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      bio: "",
      imageUrl: "",
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };



  const onSubmit = async (data: { bio: string; imageUrl: string }) => {
    let uploadedImageUrl = data.imageUrl;

    if (selectedFile) {
      const url = await uploadToCloudinary(selectedFile,setIsUploading);
      if (!url) {
        alert("Image upload failed");
        return;
      }
      uploadedImageUrl = url;
    }

    try {
      const res = await fetch("/api/profile/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          imageUrl: uploadedImageUrl,
          userId,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text(); // Try reading the error response
        console.log("Server Error:", errorText);
        throw new Error("Failed to submit profile");
      }

      const result = await res.json();
      onProfileCreated(result);
      reset();
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error("Failed to create profile", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 border p-4 rounded shadow bg-white"
    >
      <div>
        <label className="block font-semibold">Bio</label>
        <textarea {...register("bio")} className="w-full border p-2 rounded" />
      </div>

      <div className="flex justify-center items-center flex-col">
        <Avatar imageUrl={""}/>
        <label className="block font-semibold">Select Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange}  className="border-2 rounded-md m-2 p-2"/>
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview"
            className="h-56 mt-2 object-cover rounded w-full"
            width={200}
            height={200}
          />
        )}
      </div>

      <Button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Create Profile"}
      </Button>
    </form>
  );
}
