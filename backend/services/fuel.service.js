const { Fuel, Bill } = require('../models');
const { Op } = require('sequelize');

const getAll = async () => {
  const fuels = await Fuel.findAll({ order: [['category', 'ASC'], ['name', 'ASC']] });
  return fuels.map((f) => ({
    ...f.toJSON(),
    is_low_stock: parseFloat(f.quantity) <= parseFloat(f.low_stock_threshold),
  }));
};

const getById = async (id) => {
  const fuel = await Fuel.findByPk(id);
  if (!fuel) {
    const err = new Error('Fuel not found');
    err.statusCode = 404;
    throw err;
  }
  return {
    ...fuel.toJSON(),
    is_low_stock: parseFloat(fuel.quantity) <= parseFloat(fuel.low_stock_threshold),
  };
};

const create = async (data) => Fuel.create(data);

const update = async (id, data) => {
  const fuel = await Fuel.findByPk(id);
  if (!fuel) {
    const err = new Error('Fuel not found');
    err.statusCode = 404;
    throw err;
  }
  await fuel.update(data);
  return fuel;
};

const remove = async (id) => {
  const fuel = await Fuel.findByPk(id);
  if (!fuel) {
    const err = new Error('Fuel not found');
    err.statusCode = 404;
    throw err;
  }
  const billCount = await Bill.count({ where: { fuel_id: id } });
  if (billCount > 0) {
    await fuel.update({ is_active: false });
    return { message: 'Fuel deactivated (has transaction history)' };
  }
  await fuel.destroy();
  return { message: 'Fuel deleted successfully' };
};

const getLowStock = async () => {
  const fuels = await Fuel.findAll({ where: { is_active: true } });
  return fuels
    .filter((f) => parseFloat(f.quantity) <= parseFloat(f.low_stock_threshold))
    .map((f) => f.toJSON());
};

const getAnalytics = async () => {
  const fuels = await Fuel.findAll();
  const totalStock = fuels.reduce((sum, f) => sum + parseFloat(f.quantity), 0);
  const petrol = fuels.filter((f) => f.category === 'petrol');
  const diesel = fuels.filter((f) => f.category === 'diesel');
  return {
    total_types: fuels.length,
    total_stock_liters: totalStock,
    petrol_stock: petrol.reduce((s, f) => s + parseFloat(f.quantity), 0),
    diesel_stock: diesel.reduce((s, f) => s + parseFloat(f.quantity), 0),
    low_stock_count: fuels.filter(
      (f) => parseFloat(f.quantity) <= parseFloat(f.low_stock_threshold)
    ).length,
  };
};

module.exports = { getAll, getById, create, update, remove, getLowStock, getAnalytics };
