import express, { Router } from 'express'
import {
    getAllStores,
    getStore,
    addStore,
    editStore,
    deleteStore
} from '../controller/storesController.js'

const router = express.Router();

router.get('/getAllStores', getAllStores)
router.get('/getStore/:storeid', getStore)

router.post('/add', addStore)
router.put('/update/:storeid', editStore)
router.delete('/delete/:storeid', deleteStore)

export default router