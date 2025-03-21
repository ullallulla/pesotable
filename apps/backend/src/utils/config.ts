import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3001;

export const DATABASE_URL = process.env.DATABASE_URL!;

export const UPLOADTHING_TOKEN = process.env.UPLOADTHING_TOKEN;

export const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY!;

export const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY!;
