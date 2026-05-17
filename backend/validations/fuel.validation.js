const { body, param } = require('express-validator');

const createFuelValidation = [
  body('name').trim().notEmpty().withMessage('Fuel name is required'),
  body('category').isIn(['petrol', 'diesel']).withMessage('Category must be petrol or diesel'),
  body('quantity').isFloat({ min: 0 }).withMessage('Quantity must be a positive number'),
  body('price_per_liter').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('low_stock_threshold').optional().isFloat({ min: 0 }),
];

const updateFuelValidation = [
  param('id').isInt().withMessage('Invalid fuel ID'),
  body('name').optional().trim().notEmpty(),
  body('category').optional().isIn(['petrol', 'diesel']),
  body('quantity').optional().isFloat({ min: 0 }),
  body('price_per_liter').optional().isFloat({ min: 0 }),
];

module.exports = { createFuelValidation, updateFuelValidation };
