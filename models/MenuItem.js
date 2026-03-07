const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      enum: ['Rice', 'Noodles', 'Drinks', 'Snacks']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    imageUrl: {
      type: String,
      default: 'https://via.placeholder.com/300x180?text=Food+Item'
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);