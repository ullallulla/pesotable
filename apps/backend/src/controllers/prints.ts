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
    const id = Number(req.params.id);
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
            userId: userId!, // requireAuth blocks access so this cannot be null
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

router.put('/printmodels/:id', async (req: Request, res: Response) => {
    const printModel = await PrintModel.findByPk(req.params.id);
    if (!printModel) {
        res.status(404).json({ message: 'Print model not found' });
    } else {
        printModel.title = req.body.title || printModel.title;
        printModel.description = req.body.description || printModel.description;
        printModel.price = req.body.price || printModel.price;
        printModel.isPublished = req.body.isPublished || printModel.isPublished;
        printModel.imageUrl = req.body.imageUrl || printModel.imageUrl;
        printModel.fileUrl = req.body.fileUrl || printModel.fileUrl;
        printModel.downloads = req.body.downloads || printModel.downloads;
        printModel.rating = req.body.rating || printModel.rating;
        printModel.featured = req.body.featured || printModel.featured;
        await printModel.save();
        res.json(printModel);
    }
});

export default router;
