CREATE DATABASE IF NOT EXISTS petrol_pump_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE petrol_pump_db;

SELECT * FROM petrol_pump_db;

SELECT * FROM users WHERE email = 'admin@petrolpump.com';

UPDATE users 
SET password = '$2b$10$/HgjOXkceMeKO1HAhx1da...V2egjTNPsfQT1DLtRDgpbp25eBsv.' 
WHERE email = 'admin@petrolpump.com';

UPDATE users 
SET password = '<NEW_HASH>' 
WHERE email = 'admin@petrolpump.com';


USE petrol_pump_db;

UPDATE users
SET password = '$2b$10$/HgjOXkceMeKO1HAhx1da...V2egjTNPsfQT1DLtRDgpbp25eBsv.'
WHERE email = 'admin@petrolpump.com';


