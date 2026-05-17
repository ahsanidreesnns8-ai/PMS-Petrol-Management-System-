const fuelService = require('../services/fuel.service');

const getAll = async (req, res, next) => {
  try {
    const fuels = await fuelService.getAll();
    res.json({ success: true, data: fuels });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const fuel = await fuelService.getById(req.params.id);
    res.json({ success: true, data: fuel });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const fuel = await fuelService.create(req.body);
    res.status(201).json({ success: true, message: 'Fuel created', data: fuel });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const fuel = await fuelService.update(req.params.id, req.body);
    res.json({ success: true, message: 'Fuel updated', data: fuel });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await fuelService.remove(req.params.id);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

const getLowStock = async (req, res, next) => {
  try {
    const fuels = await fuelService.getLowStock();
    res.json({ success: true, data: fuels });
  } catch (err) {
    next(err);
  }
};

const getAnalytics = async (req, res, next) => {
  try {
    const data = await fuelService.getAnalytics();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove, getLowStock, getAnalytics };
