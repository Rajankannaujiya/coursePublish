'use client';

import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../../components/Button";
import Avatar from "../../components/Avatar";
import { uploadToCloudinary } from "@/app/lib/cloudinary/upload";
import { useSession } from "next-auth/react";
import CenterComp from "@/app/components/Centercomp";
import { useRouter } from "next/navigation";


export default function Edit() {
  const session = useSession();

  const userId = session.data?.user.id
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      bio: "",
      imageUrl: "",
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

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
      const res = await fetch("/api/profile/update", {
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
      console.log(result)
      reset();
      setSelectedFile(null);
      setPreviewUrl(null);
      window.location.reload();
      router.back()
    } catch (err) {
      console.error("Failed to create profile", err);
    }
  };

  return (
    <CenterComp className="flex justify-center items-center w-full">
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
        {isUploading ? "Updating..." : "Update Profile"}
      </Button>
    </form>
    </CenterComp>
  );
}
