import type { Request, Response } from 'express';
import { getAuth } from '@clerk/express';
import printModelService from '../services/printmodels';

const getPrintModels = async (_req: Request, res: Response) => {
    const printModels = await printModelService.getAllPrintModels();
    res.json(printModels);
};

const getUserPrintModels = async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
    const printModels = await printModelService.getPrintModelsByUser(userId!);
    res.json(printModels);
};

const createPrintModel = async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
    const newPrintModel = await printModelService.createPrintModel({ ...req.body, userId });
    res.json(newPrintModel);
};

const updatePrintModel = async (req: Request, res: Response) => {
    try {
        const updatedPrintModel = await printModelService.updatePrintModel(req.params.id, req.body);
        res.json(updatedPrintModel);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
};

export default { getPrintModels, getUserPrintModels, createPrintModel, updatePrintModel };
