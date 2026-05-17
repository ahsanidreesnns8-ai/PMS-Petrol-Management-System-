-- ============================================================
-- Petrol Pump Management System - MySQL Database Schema
-- ============================================================
-- Run this in MySQL Workbench or command line:
--   mysql -u root -p < database/schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS petrol_pump_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE petrol_pump_db;

-- Users table (authentication)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  phone VARCHAR(20),
  theme ENUM('light', 'dark') DEFAULT 'light',
  avatar VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Fuel stock table
CREATE TABLE IF NOT EXISTS fuels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  category ENUM('petrol', 'diesel') NOT NULL,
  quantity DECIMAL(12, 2) NOT NULL DEFAULT 0,
  price_per_liter DECIMAL(10, 2) NOT NULL,
  low_stock_threshold DECIMAL(10, 2) DEFAULT 500,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bills / transactions table
CREATE TABLE IF NOT EXISTS bills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bill_number VARCHAR(30) NOT NULL UNIQUE,
  user_id INT NOT NULL,
  fuel_id INT NOT NULL,
  customer_name VARCHAR(100),
  vehicle_number VARCHAR(20),
  quantity DECIMAL(10, 2) NOT NULL,
  rate DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(12, 2) NOT NULL,
  gst_percent DECIMAL(5, 2) DEFAULT 18,
  gst_amount DECIMAL(12, 2) NOT NULL,
  total DECIMAL(12, 2) NOT NULL,
  payment_method ENUM('cash', 'card', 'upi', 'credit') DEFAULT 'cash',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (fuel_id) REFERENCES fuels(id)
);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(20) NOT NULL,
  role VARCHAR(50) DEFAULT 'attendant',
  salary DECIMAL(12, 2) NOT NULL,
  hire_date DATE NOT NULL,
  address TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  date DATE NOT NULL,
  status ENUM('present', 'absent', 'half_day', 'leave') DEFAULT 'present',
  check_in TIME,
  check_out TIME,
  notes VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  UNIQUE KEY unique_attendance (employee_id, date)
);

-- Salary records table
CREATE TABLE IF NOT EXISTS salary_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  month INT NOT NULL CHECK (month BETWEEN 1 AND 12),
  year INT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  bonus DECIMAL(12, 2) DEFAULT 0,
  deductions DECIMAL(12, 2) DEFAULT 0,
  net_amount DECIMAL(12, 2) NOT NULL,
  paid_date DATE,
  status ENUM('pending', 'paid') DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  UNIQUE KEY unique_salary (employee_id, month, year)
);

-- Sample data (passwords are bcrypt hashed 'admin123' and 'staff123')
-- Use npm run seed in backend for proper hashed passwords

INSERT INTO fuels (name, category, quantity, price_per_liter, low_stock_threshold) VALUES
('Premium Petrol', 'petrol', 10000.00, 105.50, 500.00),
('High Speed Diesel', 'diesel', 15000.00, 92.75, 800.00);
