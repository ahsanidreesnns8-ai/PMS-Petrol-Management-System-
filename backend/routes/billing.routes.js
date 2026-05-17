const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billing.controller');
const { createBillValidation, billIdValidation } = require('../validations/billing.validation');
const validate = require('../middlewares/validate');
const { authenticate } = require('../middlewares/auth');

router.use(authenticate);

router.get('/vehicles/search', billingController.searchVehicle);
router.get('/', billingController.getAll);
router.get('/daily-revenue', billingController.getDailyRevenue);
router.get('/:id', billIdValidation, validate, billingController.getById);
router.post('/', createBillValidation, validate, billingController.create);

module.exports = router;
