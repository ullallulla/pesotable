import { getAuth, clerkClient } from '@clerk/express';
import { createUploadthing, type FileRouter } from 'uploadthing/express';
import { UploadThingError } from 'uploadthing/server';
const f = createUploadthing();

export const uploadRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    modelUploader: f({
        blob: {
            /**
             * For full list of options and defaults, see the File Route API reference
             * @see https://docs.uploadthing.com/file-routes#route-config
             */
            maxFileSize: '64MB',
            maxFileCount: 1,
        },
    })
        .middleware(async ({ req }) => {
            const { userId } = getAuth(req);
            const user = await clerkClient.users.getUser(userId as string);
            const isAdmin = user?.publicMetadata?.role === 'admin';
            if (!userId) {
                throw new UploadThingError('No user found');
            }

            if (!isAdmin) {
                throw new UploadThingError('Unauthorized');
            }

            return { userId };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log('upload completed', metadata);
            console.log('file url', file.ufsUrl);
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
