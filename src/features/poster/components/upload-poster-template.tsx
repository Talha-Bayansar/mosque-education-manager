"use client";

import { UploadDropzone } from "@/lib/uploadthing";

export const UploadPosterTemplate = () => {
  return (
    <UploadDropzone
      endpoint="imageUploader"
      onDrop={(files) => {
        console.log(files);
      }}
      onBeforeUploadBegin={async (files) => {
        console.log(files);
        return files;
      }}
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};
