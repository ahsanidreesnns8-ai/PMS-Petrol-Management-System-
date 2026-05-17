const { body, param } = require('express-validator');

const createEmployeeValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('salary').isFloat({ min: 0 }).withMessage('Valid salary is required'),
  body('hire_date').isISO8601().withMessage('Valid hire date is required'),
  body('role').optional().trim(),
  body('email').optional().isEmail(),
];

const attendanceValidation = [
  body('employee_id').isInt().withMessage('Employee ID is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('status').isIn(['present', 'absent', 'half_day', 'leave']),
  body('check_in').optional(),
  body('check_out').optional(),
];

const salaryValidation = [
  body('employee_id').isInt(),
  body('month').isInt({ min: 1, max: 12 }),
  body('year').isInt({ min: 2000 }),
  body('amount').isFloat({ min: 0 }),
  body('net_amount').isFloat({ min: 0 }),
];

const idParam = [param('id').isInt().withMessage('Invalid ID')];

module.exports = {
  createEmployeeValidation,
  attendanceValidation,
  salaryValidation,
  idParam,
};
