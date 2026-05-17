const billingService = require('../services/billing.service');

const create = async (req, res, next) => {
  try {
    const bill = await billingService.createBill(req.user.id, req.body);
    res.status(201).json({ success: true, message: 'Bill generated', data: bill });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const bill = await billingService.getBillById(req.params.id);
    if (!bill) return res.status(404).json({ success: false, message: 'Bill not found' });
    res.json({ success: true, data: bill });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const data = await billingService.getAllBills(req.query);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const getDailyRevenue = async (req, res, next) => {
  try {
    const data = await billingService.getDailyRevenue();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const searchVehicle = async (req, res, next) => {
  try {
    const { vehicle_number, startDate, endDate } = req.query;
    if (!vehicle_number) {
      return res.status(400).json({ success: false, message: 'vehicle_number is required' });
    }
    const data = await billingService.searchByVehicle(vehicle_number, startDate, endDate);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

module.exports = { create, getById, getAll, getDailyRevenue, searchVehicle };
