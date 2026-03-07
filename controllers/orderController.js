const { validationResult } = require('express-validator');
const Order = require('../models/Order');

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('getOrders error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to load orders'
    });
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('getOrderById error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to load order'
    });
  }
};

const createOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { studentName, studentId, phone, pickupTime, items } = req.body;

    const totalAmount = items.reduce((sum, item) => {
      return sum + Number(item.price) * Number(item.quantity);
    }, 0);

    const order = await Order.create({
      studentName,
      studentId,
      phone,
      pickupTime,
      items,
      totalAmount,
      status: 'Pending'
    });

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error) {
    console.error('createOrder error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to place order'
    });
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['Pending', 'Preparing', 'Ready', 'Collected'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status'
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    console.error('updateOrderStatus error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to update order status'
    });
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('deleteOrder error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete order'
    });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
};