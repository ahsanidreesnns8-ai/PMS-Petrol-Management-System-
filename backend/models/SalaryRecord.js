const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SalaryRecord = sequelize.define(
  'SalaryRecord',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 12 },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    bonus: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    deductions: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    net_amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    paid_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'paid'),
      defaultValue: 'pending',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'salary_records',
    indexes: [{ unique: true, fields: ['employee_id', 'month', 'year'] }],
  }
);

module.exports = SalaryRecord;
