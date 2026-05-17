const { body, param } = require('express-validator');

const createBillValidation = [
  body('fuel_id').isInt().withMessage('Fuel ID is required'),
  body('quantity').isFloat({ min: 0.1 }).withMessage('Quantity must be greater than 0'),
  body('gst_percent').optional().isFloat({ min: 0, max: 100 }),
  body('payment_method').optional().isIn(['cash', 'card', 'upi', 'credit', 'easypaisa', 'jazzcash']),
  body('branch_id').optional().isInt(),
  body('customer_name').optional().trim(),
  body('vehicle_number').optional().trim(),
];

const billIdValidation = [param('id').isInt().withMessage('Invalid bill ID')];

module.exports = { createBillValidation, billIdValidation };
