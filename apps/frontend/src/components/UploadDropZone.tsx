import { generateUploadDropzone } from "@uploadthing/react";

export const UploadDropZone = generateUploadDropzone({
    url: "http://localhost:3001/api/uploadthing",
  });

export default UploadDropZone