/**
 * Database seed script - creates sample data for demo/presentation
 * Run: npm run seed
 */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize, User, Fuel, Employee, Bill, Attendance, SalaryRecord, Branch } = require('../models');
const { generateBillNumber, calculateGST } = require('./helpers');
const logger = require('./logger');

const seed = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    logger.info('Database synced (tables recreated)');

    const hashed = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@petrolpump.com',
      password: hashed,
      role: 'admin',
      phone: '9876543210',
    });
    const user = await User.create({
      name: 'Staff User',
      email: 'staff@petrolpump.com',
      password: await bcrypt.hash('staff123', 10),
      role: 'user',
      phone: '9876543211',
    });

    const petrol = await Fuel.create({
      name: 'Premium Petrol',
      category: 'petrol',
      quantity: 10000,
      price_per_liter: 105.5,
      low_stock_threshold: 500,
    });
    const diesel = await Fuel.create({
      name: 'High Speed Diesel',
      category: 'diesel',
      quantity: 15000,
      price_per_liter: 92.75,
      low_stock_threshold: 800,
    });

    const branches = await Branch.bulkCreate([
      {
        name: 'JUTT GM - Lahore Main',
        code: 'JGM-LHR-01',
        city: 'Lahore',
        address: 'Ferozepur Road, Lahore',
        phone: '042-1111111',
        lat: 31.5204,
        lng: 74.3587,
        easypaisa_account: '0321-1111111',
        jazzcash_account: '0300-1111111',
      },
      {
        name: 'JUTT GM - Karachi Clifton',
        code: 'JGM-KHI-01',
        city: 'Karachi',
        address: 'Clifton Block 5, Karachi',
        phone: '021-2222222',
        lat: 24.8138,
        lng: 67.0299,
        easypaisa_account: '0321-2222222',
        jazzcash_account: '0300-2222222',
      },
      {
        name: 'JUTT GM - Islamabad',
        code: 'JGM-ISB-01',
        city: 'Islamabad',
        address: 'Blue Area, Islamabad',
        phone: '051-3333333',
        lat: 33.6844,
        lng: 73.0479,
        easypaisa_account: '0321-3333333',
        jazzcash_account: '0300-3333333',
      },
      {
        name: 'JUTT GM - Multan',
        code: 'JGM-MUL-01',
        city: 'Multan',
        address: 'Cantt Road, Multan',
        phone: '061-4444444',
        lat: 30.1575,
        lng: 71.5249,
        easypaisa_account: '0321-4444444',
        jazzcash_account: '0300-4444444',
      },
    ]);
    const mainBranch = branches[0];

    const emp1 = await Employee.create({
      name: 'Rahul Sharma',
      email: 'rahul@petrolpump.com',
      phone: '9123456780',
      role: 'manager',
      salary: 35000,
      hire_date: '2022-01-15',
    });
    const emp2 = await Employee.create({
      name: 'Priya Patel',
      email: 'priya@petrolpump.com',
      phone: '9123456781',
      role: 'attendant',
      salary: 18000,
      hire_date: '2023-06-01',
    });

    const today = new Date().toISOString().split('T')[0];
    await Attendance.bulkCreate([
      { employee_id: emp1.id, date: today, status: 'present', check_in: '08:00:00', check_out: '17:00:00' },
      { employee_id: emp2.id, date: today, status: 'present', check_in: '09:00:00', check_out: '18:00:00' },
    ]);

    await SalaryRecord.bulkCreate([
      {
        employee_id: emp1.id,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        amount: 35000,
        net_amount: 35000,
        status: 'paid',
        paid_date: today,
      },
      {
        employee_id: emp2.id,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        amount: 18000,
        net_amount: 18000,
        status: 'pending',
      },
    ]);

    const qty = 25;
    const subtotal = qty * parseFloat(petrol.price_per_liter);
    const { gst_amount, total } = calculateGST(subtotal, 18);
    await Bill.create({
      bill_number: generateBillNumber(),
      user_id: admin.id,
      branch_id: mainBranch.id,
      fuel_id: petrol.id,
      customer_name: 'Walk-in Customer',
      vehicle_number: 'LEA-1234',
      quantity: qty,
      rate: petrol.price_per_liter,
      subtotal,
      gst_percent: 18,
      gst_amount,
      total,
      payment_method: 'easypaisa',
    });
    await petrol.update({ quantity: parseFloat(petrol.quantity) - qty });

    logger.info('Seed completed successfully!');
    logger.info('Login: admin@petrolpump.com / admin123');
    logger.info('Login: staff@petrolpump.com / staff123');
    process.exit(0);
  } catch (err) {
    logger.error('Seed failed:', err.message);
    process.exit(1);
  }
};

seed();
