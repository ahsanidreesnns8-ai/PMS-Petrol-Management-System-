/**
 * Sequelize models index - registers all models and associations
 */
const sequelize = require('../config/database');
const User = require('./User');
const Fuel = require('./Fuel');
const Bill = require('./Bill');
const Employee = require('./Employee');
const Attendance = require('./Attendance');
const SalaryRecord = require('./SalaryRecord');
const Branch = require('./Branch');

// Associations
Branch.hasMany(Bill, { foreignKey: 'branch_id', as: 'bills' });
Bill.belongsTo(Branch, { foreignKey: 'branch_id', as: 'branch' });
User.hasMany(Bill, { foreignKey: 'user_id', as: 'bills' });
Bill.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Fuel.hasMany(Bill, { foreignKey: 'fuel_id', as: 'bills' });
Bill.belongsTo(Fuel, { foreignKey: 'fuel_id', as: 'fuel' });

Employee.hasMany(Attendance, { foreignKey: 'employee_id', as: 'attendances' });
Attendance.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee' });

Employee.hasMany(SalaryRecord, { foreignKey: 'employee_id', as: 'salaryRecords' });
SalaryRecord.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee' });

module.exports = {
  sequelize,
  User,
  Fuel,
  Bill,
  Employee,
  Attendance,
  SalaryRecord,
  Branch,
};
