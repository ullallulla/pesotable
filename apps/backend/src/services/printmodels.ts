import PrintModel from "../models/printmodel";
import { PrintModelDataWithoutId } from "../types";


const getAllPrintModels = async () => {
    console.log('goes here, services')
    return await PrintModel.findAll({
        order: [['created_at', 'DESC']]
    })
}

const getPrintModelsByUser = async (userId: string) => {
    return await PrintModel.findAll({
        where: { userId }
    })
}

const createPrintModel = async (data: PrintModelDataWithoutId) => {
    return await PrintModel.create(data)
}

const updatePrintModel = async (id: string, fieldsToUpdate: Partial<PrintModelDataWithoutId>) => {
    const printModel = await PrintModel.findByPk(id)
    if (!printModel) {
        throw new Error('Print model not found')
    }
    printModel.set(fieldsToUpdate)

    await printModel.save()
    return printModel
}


export default { getAllPrintModels, getPrintModelsByUser, createPrintModel, updatePrintModel }