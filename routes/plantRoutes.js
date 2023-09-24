import express from 'express'
import {
  addPlants,
  deletePlants,
  editPlants,
  getPlant,
  getPlants,
} from '../controller/plantsController.js'
const router = express.Router()

router.post('/:plantid', getPlant)
router.post('/', getPlants)

router.post('/add', addPlants)

router.put('/update/:plantid', editPlants)

router.delete('/delete/:plantid', deletePlants)

export default router
