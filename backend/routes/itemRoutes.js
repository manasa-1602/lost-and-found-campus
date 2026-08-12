import express from 'express'

import {
  getItems,
  getItemById,
  createItem,
  updateItemStatus,
  deleteItem,
} from '../controllers/itemController.js'

const router = express.Router()

router.get('/', getItems)

router.get('/:id', getItemById)

router.post('/', createItem)

router.put('/:id/status', updateItemStatus)

router.delete('/:id', deleteItem)

export default router