import express from 'express';
import type { Request, Response } from 'express';
import { printables, categories, featuredPrintables } from '../../data/prints';
import { clerkClient, requireAuth, getAuth } from '@clerk/express';
import PrintModel from '../models/printmodel';

const router = express.Router();

router.get('/printables', requireAuth(), async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
    const user = await clerkClient.users.getUser(userId as string);
    console.log(user);
    res.json(printables);
});

router.get('/printables/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const printable = printables.find((p) => p.id === id);
    if (printable) {
        res.json(printable);
    } else {
        res.status(404).json({ message: 'Printable not found' });
    }
});

router.get('/categories', (_req: Request, res: Response) => {
    res.json(categories);
});

router.get('/featured-printables', (_req: Request, res: Response) => {
    res.json(featuredPrintables);
});

router.get('/printmodels', async (req: Request, res: Response) => {
    const printModels = await PrintModel.findAll({
        order: [['created_at', 'DESC']],
    });
    res.json(printModels);
});

router.get('/usermodels', requireAuth(), async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
    const printModels = await PrintModel.findAll({
        where: {
            userId: userId,
        },
        order: [['created_at', 'DESC']],
    });
    res.json(printModels);
});

router.post('/printmodels', async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
    const printModel = await PrintModel.create({ ...req.body, userId });
    res.json(printModel);
});

export default router;
