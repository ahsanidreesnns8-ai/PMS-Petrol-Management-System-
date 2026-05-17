const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Branch = sequelize.define(
  'Branch',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    city: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    lat: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: false,
    },
    lng: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: false,
    },
    easypaisa_account: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    jazzcash_account: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { tableName: 'branches' }
);

module.exports = Branch;
