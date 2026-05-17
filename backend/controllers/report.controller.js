const reportService = require('../services/report.service');

const getDashboard = async (req, res, next) => {
  try {
    const data = await reportService.getDashboard();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const getDaily = async (req, res, next) => {
  try {
    const date = req.query.date || new Date().toISOString().split('T')[0];
    const data = await reportService.getDailyReport(date);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const getMonthly = async (req, res, next) => {
  try {
    const year = parseInt(req.query.year, 10) || new Date().getFullYear();
    const month = parseInt(req.query.month, 10) || new Date().getMonth() + 1;
    const data = await reportService.getMonthlyReport(year, month);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const getRevenue = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const data = await reportService.getRevenueReport(startDate, endDate);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const getFuelUsage = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const data = await reportService.getFuelUsageReport(startDate, endDate);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboard, getDaily, getMonthly, getRevenue, getFuelUsage };
