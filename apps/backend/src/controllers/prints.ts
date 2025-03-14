import express from 'express'
import type { Request, Response} from 'express'
import {printables, categories, featuredPrintables} from '../../data/prints'


const router = express.Router()

router.get("/printables", (_req: Request, res: Response) => {
    res.json(printables)
  })
  
router.get("/printables/:id", (req: Request, res: Response) => {
    const printable = printables.find((p) => p.id === req.params.id)
    if (printable) {
        res.json(printable)
    } else {
        res.status(404).json({ message: "Printable not found" })
    }
})

router.get("/categories", (_req: Request, res: Response) => {
    res.json(categories)
})

router.get("/featured-printables", (_req: Request, res: Response) => {
    res.json(featuredPrintables)
})

export default router