import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 3001

export const DATABASE_URL = process.env.DATABASE_URL!

export const UPLOADTHING_TOKEN = process.env.UPLOADTHING_TOKEN