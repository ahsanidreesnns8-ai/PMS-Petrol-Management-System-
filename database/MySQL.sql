CREATE DATABASE IF NOT EXISTS petrol_pump_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE petrol_pump_db;

-- Check database and user entry
SELECT * FROM users WHERE email = 'admin@petrolpump.com';

-- Update password with the correct bcrypt hash
UPDATE users
SET password = '$2b$10$/HgjOXkceMeKO1HAhx1da...V2egjTNPsfQT1DLtRDgpbp25eBsv.'
WHERE email = 'admin@petrolpump.com';
