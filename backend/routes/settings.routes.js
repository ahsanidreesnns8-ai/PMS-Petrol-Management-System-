const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settings.controller');
const { changePasswordValidation } = require('../validations/auth.validation');
const validate = require('../middlewares/validate');
const { authenticate, authorize } = require('../middlewares/auth');
const upload = require('../config/multer');

router.use(authenticate);

router.put('/profile', settingsController.updateProfile);
router.put('/password', changePasswordValidation, validate, settingsController.changePassword);
router.put('/theme', settingsController.updateTheme);
router.get('/users', authorize('admin'), settingsController.getAllUsers);

router.post('/avatar', upload.single('avatar'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const authService = require('../services/auth.service');
    const user = await authService.updateProfile(req.user.id, {
      avatar: `/uploads/${req.file.filename}`,
    });
    res.json({ success: true, message: 'Avatar uploaded', data: user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
