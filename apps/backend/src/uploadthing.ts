import { createUploadthing, type FileRouter } from "uploadthing/express";

const f = createUploadthing();

export const uploadRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  modelUploader: f({
    blob: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "64MB",
      maxFileCount: 2,
    },
  }).onUploadComplete(async ({metadata, file}) => {
    console.log("upload completed", metadata);
    console.log("file url", file.ufsUrl );
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
