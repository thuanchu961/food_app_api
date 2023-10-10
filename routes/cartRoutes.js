import express from 'express'
import {
  addToCart,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from '../controller/cartsController.js'
const router = express.Router()

router.post('/add', addToCart)

router.put('/update/:id', updateCartItem)

router.delete('/delete/:id', deleteCartItem)

router.get('/getCartItems', getCartItems)

export default router
