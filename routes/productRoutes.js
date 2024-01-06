import express, { Router } from 'express'
import {
    getAllProducts,
    getProduct,
    addProduct,
    editProduct,
    deleteProduct,
    searchProducts
} from '../controller/productController.js'
import { isAuth } from '../middlewares/auth.js'
const router = express.Router();

router.get('/getAllProducts/', getAllProducts)
router.get('/getProduct/:productid', getProduct)
router.get('/searchProducts/:name', searchProducts)
router.post('/add',isAuth, addProduct)
router.put('/update/:productid',isAuth, editProduct)
router.delete('/delete/:productid',isAuth, deleteProduct)

export default router