import { CldUploadWidget } from 'next-cloudinary'
import React from 'react';

import { getCloudinaryConfig } from '@/app/lib/cloudinary/upload'


const UploadImagComp = ({
  imageUrl,
  setimageUrl,
}: {
  imageUrl: string | null;
  setimageUrl: (url: string | null) => void;
}) => {
  const cloudinaryConfig = getCloudinaryConfig({
    folder: "partner_logos",
  });

  return (
    <div className="w-full m-0 p-0">
      <CldUploadWidget
        {...cloudinaryConfig}
        onSuccess={(result:any) => {
          if (result?.event === "success") {
            console.log("this is the result", result.info);
            setimageUrl(result?.info?.secure_url);
          }
        }}
        onQueuesEnd={(result, { widget }) => {
          widget.close();
        }}
      >
        {({ open }) => {
          if (typeof open !== "function") {
            console.error("open is not a function", open);
            return null;
          }

          const handleOnClick = () => {
            setimageUrl(null);
            open();
          };

          return (
            <div className="flex justify-center w-full">
              <button
                onClick={handleOnClick}
                className="border-2 w-full border-midnight-blue-800 m-2 mb-10 p-2 rounded-md"
              >
                {imageUrl ? "Upload another Image" : "Upload an Image"}
              </button>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};


export default UploadImagComp