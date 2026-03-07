const express = require('express');
const { body } = require('express-validator');
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');

const router = express.Router();

const orderValidation = [
  body('studentName')
    .trim()
    .notEmpty().withMessage('Student name is required')
    .isLength({ min: 3, max: 100 }).withMessage('Student name must be 3 to 100 characters'),
  body('studentId')
    .trim()
    .notEmpty().withMessage('Student ID is required')
    .isLength({ min: 3, max: 30 }).withMessage('Student ID must be 3 to 30 characters'),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone is required')
    .isLength({ min: 8, max: 20 }).withMessage('Phone must be 8 to 20 characters'),
  body('pickupTime')
    .trim()
    .notEmpty().withMessage('Pickup time is required'),
  body('items')
    .isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.menuItemId')
    .notEmpty().withMessage('Menu item ID is required'),
  body('items.*.title')
    .trim()
    .notEmpty().withMessage('Item title is required'),
  body('items.*.price')
    .isFloat({ min: 0 }).withMessage('Price must be a valid positive number'),
  body('items.*.quantity')
    .isInt({ min: 1 }).withMessage('Quantity must be at least 1')
];

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post('/', orderValidation, createOrder);
router.patch('/:id/status', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;