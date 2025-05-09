import express from 'express';
import cors from 'cors';
import printsRouter from './routes/printmodels';
import { PORT, UPLOADTHING_TOKEN } from './utils/config';
import { connectToDatabase } from './utils/db';
import { createRouteHandler } from 'uploadthing/express';
import { uploadRouter } from './uploadthing';
import { clerkMiddleware } from '@clerk/express';

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => {
    res.json({ message: 'API is working!' });
});

app.use('/api', printsRouter);
app.use(
    '/api/uploadthing',
    createRouteHandler({
        router: uploadRouter,
        config: {
            token: UPLOADTHING_TOKEN,
            isDev: true,
        },
    }),
);

const start = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

start();
