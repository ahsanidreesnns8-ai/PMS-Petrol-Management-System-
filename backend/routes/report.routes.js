const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { authenticate } = require('../middlewares/auth');

router.use(authenticate);

router.get('/dashboard', reportController.getDashboard);
router.get('/daily', reportController.getDaily);
router.get('/monthly', reportController.getMonthly);
router.get('/revenue', reportController.getRevenue);
router.get('/fuel-usage', reportController.getFuelUsage);

module.exports = router;
