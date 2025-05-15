import type { CldUploadWidgetProps } from 'next-cloudinary';

export const getCloudinaryConfig = (options?: {
    folder?: string;
  }):CldUploadWidgetProps => {
    return {
        uploadPreset:process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME  || "pytechhPreset",

        options:{
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ,
          apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ,
          folder:options?.folder || "pytechh",
          clientAllowedFormats: ['jpg', 'png', 'webp'],
          maxFileSize: 5 * 1024 * 1024, 
          sources: ['local', 'url'],
          multiple: false,
          resourceType:'image'
        }
    };
  };



  export  const uploadToCloudinary = async (
      selectedFile: File,
      setIsUploading?: (value: boolean) => void
    ): Promise<string | null>  => {

      if(setIsUploading){
        setIsUploading(true)
      }
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME || "pytechhPreset"
      );
      formData.append("folder", "pytechh");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        return data.secure_url;
      } catch (error) {
        console.error("Upload failed", error);
        return null;
      } finally {
        if(setIsUploading){
          setIsUploading(false);
        }
      }
    };  