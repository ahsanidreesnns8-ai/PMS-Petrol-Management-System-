const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branch.controller');
const { authenticate } = require('../middlewares/auth');

router.use(authenticate);
router.get('/', branchController.getAll);
router.get('/nearest', branchController.getNearest);
router.get('/city/:city', branchController.getByCity);

module.exports = router;
