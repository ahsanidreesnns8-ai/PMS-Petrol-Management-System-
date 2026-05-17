const authService = require('../services/auth.service');
const { User } = require('../models');

const updateProfile = async (req, res, next) => {
  try {
    const user = await authService.updateProfile(req.user.id, req.body);
    res.json({ success: true, message: 'Profile updated', data: user });
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await authService.changePassword(req.user.id, currentPassword, newPassword);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

const updateTheme = async (req, res, next) => {
  try {
    const { theme } = req.body;
    const user = await authService.updateProfile(req.user.id, { theme });
    res.json({ success: true, message: 'Theme updated', data: user });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['created_at', 'DESC']],
    });
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

module.exports = { updateProfile, changePassword, updateTheme, getAllUsers };
