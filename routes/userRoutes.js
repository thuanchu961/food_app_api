import express from 'express'
import {
  getAllUsers,
  signin,
  signup,
  updateAddress,
  updateUser,
} from '../controller/usersController.js'
const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)

router.put('/update/:userid', updateUser)
router.put('/address/:userid', updateAddress)

router.get('/getall', getAllUsers)

export default router
