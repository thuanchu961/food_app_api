import express from 'express'
import {
  getAllUsers,
  signin,
  signup,
  updateAddress,
  updateUser,
} from '../controller/usersController.js'
import { isAuth } from '../middlewares/auth.js'
const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)

router.put('/update/:userid',isAuth, updateUser)
router.put('/address/:userid',isAuth, updateAddress)

router.get('/getall', getAllUsers)

export default router
//đã sửa