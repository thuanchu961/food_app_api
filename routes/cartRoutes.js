import express from 'express'
import {
  addToCart,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from '../controller/cartsController.js'
const router = express.Router()

router.post('/add', addToCart)

router.put('/:id', updateCartItem)

router.delete('/:id', deleteCartItem)

router.get('/get', getCartItems)

export default router
