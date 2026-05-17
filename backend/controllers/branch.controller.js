const branchService = require('../services/branch.service');

const getAll = async (req, res, next) => {
  try {
    const data = await branchService.getAll();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const getNearest = async (req, res, next) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ success: false, message: 'lat and lng required' });
    }
    const data = await branchService.findNearest(parseFloat(lat), parseFloat(lng));
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const getByCity = async (req, res, next) => {
  try {
    const data = await branchService.getByCity(req.params.city);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getNearest, getByCity };
