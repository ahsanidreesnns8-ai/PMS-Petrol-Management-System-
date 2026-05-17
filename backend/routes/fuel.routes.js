const express = require('express');
const router = express.Router();
const fuelController = require('../controllers/fuel.controller');
const { createFuelValidation, updateFuelValidation } = require('../validations/fuel.validation');
const validate = require('../middlewares/validate');
const { authenticate, authorize } = require('../middlewares/auth');

router.use(authenticate);

router.get('/', fuelController.getAll);
router.get('/analytics', fuelController.getAnalytics);
router.get('/low-stock', fuelController.getLowStock);
router.get('/:id', fuelController.getById);
router.post('/', authorize('admin'), createFuelValidation, validate, fuelController.create);
router.put('/:id', authorize('admin'), updateFuelValidation, validate, fuelController.update);
router.delete('/:id', authorize('admin'), fuelController.remove);

module.exports = router;
