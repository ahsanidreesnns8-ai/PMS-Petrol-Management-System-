const { Bill, Fuel, User, Branch } = require('../models');
const { Op } = require('sequelize');
const { generateBillNumber, calculateGST } = require('../utils/helpers');

const createBill = async (userId, data) => {
  const fuel = await Fuel.findByPk(data.fuel_id);
  if (!fuel || !fuel.is_active) {
    const err = new Error('Fuel not found or inactive');
    err.statusCode = 404;
    throw err;
  }

  const qty = parseFloat(data.quantity);
  if (parseFloat(fuel.quantity) < qty) {
    const err = new Error('Insufficient fuel stock');
    err.statusCode = 400;
    throw err;
  }

  const rate = parseFloat(fuel.price_per_liter);
  const subtotal = Math.round(qty * rate * 100) / 100;
  const gstPercent = data.gst_percent ?? process.env.DEFAULT_GST_PERCENT ?? 18;
  const { gst_amount, total } = calculateGST(subtotal, gstPercent);

  const bill = await Bill.create({
    bill_number: generateBillNumber(),
    user_id: userId,
    fuel_id: fuel.id,
    customer_name: data.customer_name,
    vehicle_number: data.vehicle_number,
    quantity: qty,
    rate,
    subtotal,
    gst_percent: gstPercent,
    gst_amount,
    total,
    branch_id: data.branch_id || null,
    payment_method: data.payment_method || 'cash',
    notes: data.notes,
  });

  await fuel.update({ quantity: parseFloat(fuel.quantity) - qty });

  return getBillById(bill.id);
};

const getBillById = async (id) =>
  Bill.findByPk(id, {
    include: [
      { model: Fuel, as: 'fuel', attributes: ['id', 'name', 'category'] },
      { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
      { model: Branch, as: 'branch', attributes: ['id', 'name', 'city', 'code', 'easypaisa_account', 'jazzcash_account'] },
    ],
  });

const getAllBills = async ({ page = 1, limit = 20, startDate, endDate, vehicle_number }) => {
  const where = {};
  if (startDate && endDate) {
    where.created_at = { [Op.between]: [new Date(startDate), new Date(endDate)] };
  }
  if (vehicle_number) {
    where.vehicle_number = { [Op.like]: `%${vehicle_number.trim()}%` };
  }

  const offset = (page - 1) * limit;
  const { count, rows } = await Bill.findAndCountAll({
    where,
    include: [
      { model: Fuel, as: 'fuel', attributes: ['name', 'category'] },
      { model: Branch, as: 'branch', attributes: ['name', 'city', 'code'] },
    ],
    order: [['created_at', 'DESC']],
    limit: parseInt(limit, 10),
    offset,
  });

  return { bills: rows, total: count, page, totalPages: Math.ceil(count / limit) };
};

const getDailyRevenue = async () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const bills = await Bill.findAll({
    where: { created_at: { [Op.between]: [start, end] } },
    attributes: ['total', 'quantity', 'fuel_id'],
  });

  const revenue = bills.reduce((s, b) => s + parseFloat(b.total), 0);
  const liters = bills.reduce((s, b) => s + parseFloat(b.quantity), 0);

  return { date: start.toISOString().split('T')[0], revenue, transactions: bills.length, liters_sold: liters };
};

const searchByVehicle = async (vehicleNumber, startDate, endDate) => {
  const where = {
    vehicle_number: { [Op.like]: `%${vehicleNumber.trim()}%` },
  };
  if (startDate && endDate) {
    where.created_at = { [Op.between]: [new Date(startDate), new Date(endDate)] };
  }
  return Bill.findAll({
    where,
    include: [
      { model: Fuel, as: 'fuel', attributes: ['name', 'category'] },
      { model: Branch, as: 'branch', attributes: ['name', 'city'] },
      { model: User, as: 'user', attributes: ['name'] },
    ],
    order: [['created_at', 'DESC']],
  });
};

module.exports = { createBill, getBillById, getAllBills, getDailyRevenue, searchByVehicle };
