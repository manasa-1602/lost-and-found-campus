import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ['Lost', 'Found'],
      required: true,
    },

    status: {
      type: String,
      enum: ['Lost', 'Found', 'Returned'],
      default: 'Lost',
    },

    image: {
      type: String,
      default: '',
    },

    contact: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const Item = mongoose.model('Item', itemSchema)

export default Item