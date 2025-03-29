import axios from 'axios'
import { PrintModelFormValues } from '@/types'

const baseUrl = '/api/printmodels'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createPrintModel = async (newBbject: PrintModelFormValues) => {
    const response = await axios.post(baseUrl, newBbject)
    return response
}

export default { getAll, createPrintModel }