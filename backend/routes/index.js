const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const fuelRoutes = require('./fuel.routes');
const billingRoutes = require('./billing.routes');
const employeeRoutes = require('./employee.routes');
const reportRoutes = require('./report.routes');
const settingsRoutes = require('./settings.routes');
const branchRoutes = require('./branch.routes');

router.use('/auth', authRoutes);
router.use('/branches', branchRoutes);
router.use('/users', settingsRoutes);
router.use('/fuels', fuelRoutes);
router.use('/billing', billingRoutes);
router.use('/employees', employeeRoutes);
router.use('/reports', reportRoutes);
router.use('/settings', settingsRoutes);

module.exports = router;
