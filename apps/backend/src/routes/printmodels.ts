import express from 'express'
import { requireAuth } from '@clerk/express';
import printModelController from '../controllers/printmodels'

const router = express.Router()

router.get('/printmodels', printModelController.getPrintModels)
router.get('/usermodels', requireAuth(), printModelController.getUserPrintModels)
router.post('/printmodels', printModelController.createPrintModel)
router.put('/printmodels/:id', printModelController.updatePrintModel)

export default router