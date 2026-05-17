# Petrol Pump Management System

Full-stack petrol pump management application built with **React + Vite** (frontend) and **Node.js + Express** (backend) using **MVC architecture** and **MySQL**.

## Project Structure

```
petrol-pump-management-system/
├── backend/          # Node.js + Express API (MVC)
│   ├── config/       # Database, Swagger, Multer
│   ├── models/       # Sequelize models
│   ├── controllers/  # Request handlers
│   ├── services/     # Business logic
│   ├── routes/       # REST API routes
│   ├── middlewares/  # Auth, validation, errors
│   ├── validations/  # express-validator rules
│   ├── utils/        # Helpers, logger, seed
│   ├── uploads/      # Uploaded files
│   ├── docs/         # API documentation
│   └── tests/        # Basic API tests
├── frontend/         # React + Vite UI
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── routes/
│       ├── services/
│       ├── hooks/
│       ├── context/
│       ├── store/
│       ├── utils/
│       ├── styles/
│       └── config/
└── database/
    └── schema.sql    # MySQL schema + sample data
```

## Prerequisites

- **Node.js** 18+ ([https://nodejs.org](https://nodejs.org))
- **MySQL** 8+ ([https://dev.mysql.com/downloads](https://dev.mysql.com/downloads))
- **VS Code** (recommended editor)

## Step 1: Create Project on Your PC

1. Open File Explorer and go to `C:\Users\it.care\petrol-pump-management-system` (or copy the folder anywhere).
2. Open the folder in VS Code: **File → Open Folder**.

## Step 2: Setup MySQL Database

1. Start MySQL service (XAMPP/WAMP or MySQL Workbench).
2. Open MySQL command line or Workbench and run:

```sql
source C:/Users/it.care/petrol-pump-management-system/database/schema.sql
```

Or import `database/schema.sql` via MySQL Workbench.

## Step 3: Backend Setup

```bash
cd backend
copy .env.example .env
```

Edit `.env` with your MySQL password:

```
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_secret_key_here
```

Install and run:

```bash
npm install
npm run seed
npm run dev
```

Backend runs at: **http://localhost:5000**  
Swagger docs: **http://localhost:5000/api-docs**

### Demo Login (after seed)

| Role  | Email                   | Password  |
|-------|-------------------------|-----------|
| Admin | admin@petrolpump.com    | admin123  |
| Staff | staff@petrolpump.com    | staff123  |

## Step 4: Frontend Setup

Open a **new terminal**:

```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

## API Endpoints

| Module    | Base URL           |
|-----------|--------------------|
| Auth      | `/api/auth`        |
| Users     | `/api/users`       |
| Fuels     | `/api/fuels`       |
| Billing   | `/api/billing`     |
| Employees | `/api/employees`   |
| Reports   | `/api/reports`     |
| Settings  | `/api/settings`    |

## Features

- JWT authentication with Admin/User roles
- Dashboard with charts and fuel analytics
- Fuel stock management with low-stock alerts
- Billing with GST and printable receipts
- Employee, attendance, and salary records
- Daily/monthly/revenue reports
- Profile, password, and theme settings

## Run Tests

```bash
cd backend
npm test
```

(Server must be running for API tests.)

## Viva / Presentation Tips

1. Explain **MVC**: Models (Sequelize), Views (React pages), Controllers (Express).
2. Show **Swagger** at `/api-docs`.
3. Demo **admin login** → add fuel → generate bill → print receipt.
4. Show **low stock alert** on dashboard when quantity is below threshold.
5. Explain **JWT** flow: login → token in localStorage → Axios interceptor.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MySQL connection error | Check `.env` DB credentials; ensure MySQL is running |
| CORS error | Backend `FRONTEND_URL` or use Vite proxy (already configured) |
| Empty dashboard | Run `npm run seed` in backend |
| Port in use | Change `PORT` in backend `.env` or Vite port in `vite.config.js` |

## Tech Stack

- Frontend: React 18, Vite, Tailwind CSS, Context API, Axios, Chart.js
- Backend: Express, Sequelize, JWT, bcrypt, multer, express-validator, Swagger
- Database: MySQL
