const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Fuel = sequelize.define(
  'Fuel',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('petrol', 'diesel'),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
      comment: 'Stock in liters',
    },
    price_per_liter: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    low_stock_threshold: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 500,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'fuels',
  }
);

module.exports = Fuel;
