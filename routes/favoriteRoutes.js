import express from 'express'
import {
  addfavorite,
  deletefavorite,
  getFavoriteList,
} from '../controller/favoritesController.js'
const router = express.Router()

router.get('/:userid', getFavoriteList)

router.post('/', addfavorite)

router.delete('/', deletefavorite)

export default router
