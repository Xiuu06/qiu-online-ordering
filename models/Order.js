const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      maxlength: [100, 'Student name cannot exceed 100 characters']
    },
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      trim: true,
      maxlength: [30, 'Student ID cannot exceed 30 characters']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: [20, 'Phone cannot exceed 20 characters']
    },
    pickupTime: {
      type: String,
      required: [true, 'Pickup time is required'],
      trim: true
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: 'At least one item is required'
      }
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ['Pending', 'Preparing', 'Ready', 'Collected'],
      default: 'Pending'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);