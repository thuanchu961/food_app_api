import express, { Router } from 'express'
import {
    getAllStores,
    getStore,
    addStore,
    editStore,
    deleteStore,
    searchStores
} from '../controller/storesController.js'

const router = express.Router();

router.get('/getAllStores/', getAllStores)
router.get('/getStore/:storeid', getStore)
router.get('/searchStores/:name', searchStores)
router.post('/add', addStore)
router.put('/update/:storeid', editStore)
router.delete('/delete/:storeid', deleteStore)

export default router