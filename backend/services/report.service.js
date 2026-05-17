const { Bill, Fuel, Employee } = require('../models');
const { Op, fn, col, literal } = require('sequelize');

const getDailyReport = async (date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const bills = await Bill.findAll({
    where: { created_at: { [Op.between]: [start, end] } },
    include: [{ model: Fuel, as: 'fuel', attributes: ['name', 'category'] }],
  });

  const revenue = bills.reduce((s, b) => s + parseFloat(b.total), 0);
  const byFuel = {};
  bills.forEach((b) => {
    const key = b.fuel?.name || 'Unknown';
    if (!byFuel[key]) byFuel[key] = { liters: 0, revenue: 0 };
    byFuel[key].liters += parseFloat(b.quantity);
    byFuel[key].revenue += parseFloat(b.total);
  });

  return {
    date,
    total_transactions: bills.length,
    total_revenue: revenue,
    total_liters: bills.reduce((s, b) => s + parseFloat(b.quantity), 0),
    fuel_breakdown: byFuel,
    bills,
  };
};

const getMonthlyReport = async (year, month) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59, 999);

  const bills = await Bill.findAll({
    where: { created_at: { [Op.between]: [start, end] } },
    attributes: [
      [fn('DATE', col('created_at')), 'sale_date'],
      [fn('SUM', col('total')), 'revenue'],
      [fn('SUM', col('quantity')), 'liters'],
      [fn('COUNT', col('id')), 'count'],
    ],
    group: [fn('DATE', col('created_at'))],
    raw: true,
  });

  const summary = await Bill.findOne({
    where: { created_at: { [Op.between]: [start, end] } },
    attributes: [
      [fn('SUM', col('total')), 'total_revenue'],
      [fn('SUM', col('quantity')), 'total_liters'],
      [fn('COUNT', col('id')), 'total_transactions'],
    ],
    raw: true,
  });

  return {
    year,
    month,
    summary: {
      total_revenue: parseFloat(summary?.total_revenue || 0),
      total_liters: parseFloat(summary?.total_liters || 0),
      total_transactions: parseInt(summary?.total_transactions || 0, 10),
    },
    daily_breakdown: bills,
  };
};

const getRevenueReport = async (startDate, endDate) => {
  const bills = await Bill.findAll({
    where: {
      created_at: {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      },
    },
    attributes: [
      [fn('SUM', col('subtotal')), 'subtotal'],
      [fn('SUM', col('gst_amount')), 'gst'],
      [fn('SUM', col('total')), 'total'],
      [fn('COUNT', col('id')), 'transactions'],
    ],
    raw: true,
  });

  return bills[0] || { subtotal: 0, gst: 0, total: 0, transactions: 0 };
};

const getFuelUsageReport = async (startDate, endDate) => {
  return Bill.findAll({
    where: {
      created_at: {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      },
    },
    attributes: [
      'fuel_id',
      [fn('SUM', col('quantity')), 'total_liters'],
      [fn('SUM', col('total')), 'total_revenue'],
      [fn('COUNT', col('id')), 'transactions'],
    ],
    include: [{ model: Fuel, as: 'fuel', attributes: ['name', 'category'] }],
    group: ['fuel_id', 'fuel.id', 'fuel.name', 'fuel.category'],
  });
};

const getDashboard = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const todayBills = await Bill.findAll({
    where: { created_at: { [Op.between]: [today, end] } },
  });

  const dailyRevenue = todayBills.reduce((s, b) => s + parseFloat(b.total), 0);
  const dailyLiters = todayBills.reduce((s, b) => s + parseFloat(b.quantity), 0);

  const fuels = await Fuel.findAll({ where: { is_active: true } });
  const lowStock = fuels.filter(
    (f) => parseFloat(f.quantity) <= parseFloat(f.low_stock_threshold)
  );

  const employeeCount = await Employee.count({ where: { is_active: true } });

  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const dEnd = new Date(d);
    dEnd.setHours(23, 59, 59, 999);
    const dayBills = await Bill.findAll({
      where: { created_at: { [Op.between]: [d, dEnd] } },
    });
    last7Days.push({
      date: d.toISOString().split('T')[0],
      revenue: dayBills.reduce((s, b) => s + parseFloat(b.total), 0),
      transactions: dayBills.length,
    });
  }

  return {
    daily_revenue: dailyRevenue,
    daily_transactions: todayBills.length,
    daily_liters_sold: dailyLiters,
    fuel_stock: fuels.map((f) => ({
      name: f.name,
      category: f.category,
      quantity: f.quantity,
      is_low: parseFloat(f.quantity) <= parseFloat(f.low_stock_threshold),
    })),
    low_stock_alerts: lowStock.length,
    employee_count: employeeCount,
    revenue_chart: last7Days,
  };
};

module.exports = {
  getDailyReport,
  getMonthlyReport,
  getRevenueReport,
  getFuelUsageReport,
  getDashboard,
};
