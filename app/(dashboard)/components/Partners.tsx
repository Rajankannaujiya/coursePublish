"use client";

import { Button } from "@/app/components/Button";
import { ErrorComp } from "@/app/components/ErrorComp";
import { Input } from "@/app/components/Input";
import MakeCenter from "@/app/components/MakeCenter";
import { uploadToCloudinary } from "@/app/lib/cloudinary/upload";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Partners = () => {
  const [bName, setBName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setimageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  console.log("this I got", imageUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      const url = await uploadToCloudinary(selectedFile);
      if (!url) {
        alert("Image upload failed");
        return;
      }
      setimageUrl(url);
    }

    if (!bName || !imageUrl) {
      setError("all the fields are required");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/partners/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: bName,
          image: imageUrl,
        }),
      });
      if (!response.ok) {
        setError("failed to create partner");
      }

      const data = await response.json();
      console.log("Created brand:", data.brand);
      router.push("/");
    } catch (error) {
      console.log("an error occured", error);
      setError("Internal server error");
    } finally {
      setBName("");
      setError("");
      setimageUrl("")
      setIsSubmitting(false);
    }
  };
  return (
    <MakeCenter>
      <h1 className="text-xl text-midnight-blue-800 font-bold">
        Add a new Partner
      </h1>

      <div>{error && <ErrorComp error={error} />}</div>

      <div className="w-full m-4 p-2">
        <Input
          type="text"
          placeholder="Patner Name"
          value={bName}
          onChange={(e) => setBName(e.target.value)}
          className="border-midnight-blue-800 border-2 rounded-md"
        />
      </div>

      <div className="flex justify-center items-center flex-col">
        <label className="block font-semibold">Select Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border-2 border-midnight-blue-800 rounded-md p-1 w-full m-2"
        />
      </div>
      <div className="flex justify-end gap-3">
        <Button
          className="px-4 py-2 text-sm font-medium text-midnight-blue-700 bg-gray-100 rounded-md hover:bg-gray-200"
          onClick={() => {
            router.push("/");
          }}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          className="px-4 py-2 text-sm font-medium text-white bg-midnight-blue-600 rounded-md hover:bg-midnight-blue-700 disabled:opacity-50 cursor-pointer"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Add Partner"}
        </Button>
      </div>
    </MakeCenter>
  );
};

export default Partners;
