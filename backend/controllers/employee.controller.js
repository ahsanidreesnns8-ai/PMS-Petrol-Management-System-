const employeeService = require('../services/employee.service');

const getAll = async (req, res, next) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.json({ success: true, data: employees });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const emp = await employeeService.getEmployeeById(req.params.id);
    res.json({ success: true, data: emp });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const emp = await employeeService.createEmployee(req.body);
    res.status(201).json({ success: true, message: 'Employee added', data: emp });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const emp = await employeeService.updateEmployee(req.params.id, req.body);
    res.json({ success: true, message: 'Employee updated', data: emp });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await employeeService.deleteEmployee(req.params.id);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

const markAttendance = async (req, res, next) => {
  try {
    const record = await employeeService.markAttendance(req.body);
    res.json({ success: true, message: 'Attendance recorded', data: record });
  } catch (err) {
    next(err);
  }
};

const getAttendance = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const records = await employeeService.getAttendance(
      req.params.id,
      parseInt(month, 10) || new Date().getMonth() + 1,
      parseInt(year, 10) || new Date().getFullYear()
    );
    res.json({ success: true, data: records });
  } catch (err) {
    next(err);
  }
};

const addSalary = async (req, res, next) => {
  try {
    const record = await employeeService.addSalaryRecord(req.body);
    res.status(201).json({ success: true, message: 'Salary record added', data: record });
  } catch (err) {
    next(err);
  }
};

const getStats = async (req, res, next) => {
  try {
    const stats = await employeeService.getStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  markAttendance,
  getAttendance,
  addSalary,
  getStats,
};
