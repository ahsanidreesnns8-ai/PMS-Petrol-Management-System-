const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const {
  createEmployeeValidation,
  attendanceValidation,
  salaryValidation,
  idParam,
} = require('../validations/employee.validation');
const validate = require('../middlewares/validate');
const { authenticate, authorize } = require('../middlewares/auth');

router.use(authenticate);

router.get('/stats', employeeController.getStats);
router.get('/', employeeController.getAll);
router.get('/:id', idParam, validate, employeeController.getById);
router.get('/:id/attendance', idParam, validate, employeeController.getAttendance);
router.post('/', authorize('admin'), createEmployeeValidation, validate, employeeController.create);
router.post('/attendance', attendanceValidation, validate, employeeController.markAttendance);
router.post('/salary', authorize('admin'), salaryValidation, validate, employeeController.addSalary);
router.put('/:id', authorize('admin'), idParam, validate, employeeController.update);
router.delete('/:id', authorize('admin'), idParam, validate, employeeController.remove);

module.exports = router;
