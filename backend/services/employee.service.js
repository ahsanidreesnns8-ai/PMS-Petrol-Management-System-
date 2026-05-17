const { Employee, Attendance, SalaryRecord } = require('../models');
const { Op } = require('sequelize');

const getAllEmployees = async () =>
  Employee.findAll({ order: [['name', 'ASC']] });

const getEmployeeById = async (id) => {
  const emp = await Employee.findByPk(id, {
    include: [
      { model: Attendance, as: 'attendances', limit: 30, order: [['date', 'DESC']] },
      { model: SalaryRecord, as: 'salaryRecords', limit: 12, order: [['year', 'DESC'], ['month', 'DESC']] },
    ],
  });
  if (!emp) {
    const err = new Error('Employee not found');
    err.statusCode = 404;
    throw err;
  }
  return emp;
};

const createEmployee = async (data) => Employee.create(data);

const updateEmployee = async (id, data) => {
  const emp = await Employee.findByPk(id);
  if (!emp) {
    const err = new Error('Employee not found');
    err.statusCode = 404;
    throw err;
  }
  await emp.update(data);
  return emp;
};

const deleteEmployee = async (id) => {
  const emp = await Employee.findByPk(id);
  if (!emp) {
    const err = new Error('Employee not found');
    err.statusCode = 404;
    throw err;
  }
  await emp.update({ is_active: false });
  return { message: 'Employee deactivated' };
};

const markAttendance = async (data) => {
  const [record] = await Attendance.findOrCreate({
    where: { employee_id: data.employee_id, date: data.date },
    defaults: data,
  });
  if (!record.isNewRecord) {
    await record.update(data);
  }
  return record;
};

const getAttendance = async (employeeId, month, year) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);
  return Attendance.findAll({
    where: {
      employee_id: employeeId,
      date: { [Op.between]: [start, end] },
    },
    order: [['date', 'ASC']],
  });
};

const addSalaryRecord = async (data) => SalaryRecord.create(data);

const getStats = async () => {
  const total = await Employee.count({ where: { is_active: true } });
  const today = new Date().toISOString().split('T')[0];
  const presentToday = await Attendance.count({
    where: { date: today, status: 'present' },
  });
  return { total_employees: total, present_today: presentToday };
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  markAttendance,
  getAttendance,
  addSalaryRecord,
  getStats,
};
