import Item from '../models/Item.js'

// Get all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 })

    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch items',
      error: error.message,
    })
  }
}

// Get one item
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)

    if (!item) {
      return res.status(404).json({
        message: 'Item not found',
      })
    }

    res.status(200).json(item)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch item',
      error: error.message,
    })
  }
}

// Create an item
export const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body)

    res.status(201).json(item)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create item',
      error: error.message,
    })
  }
}

// Update item status
export const updateItemStatus = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )

    if (!item) {
      return res.status(404).json({
        message: 'Item not found',
      })
    }

    res.status(200).json(item)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update item',
      error: error.message,
    })
  }
}

// Delete an item
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id)

    if (!item) {
      return res.status(404).json({
        message: 'Item not found',
      })
    }

    res.status(200).json({
      message: 'Item deleted successfully',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete item',
      error: error.message,
    })
  }
}