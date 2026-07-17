<div align="center">

# ⛽ Petrol Pump Management System

**A full-stack, role-based management platform for petrol pump operations — fuel stock, billing, employees, and reporting, all in one place.**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)


[Overview](#-overview) •
[Features](#-features) •
[Tech Stack](#-tech-stack) •
[Getting Started](#-getting-started) •
[API Reference](#-api-reference) •
[Troubleshooting](#-troubleshooting) •
[Presentation Guide](#-viva--presentation-guide)

</div>

---

## 📊 Repository Information

- Language: JavaScript
- Frontend: React + Vite
- Backend: Express.js
- Database: MySQL
- Deployment:
  - Railway
  - Vercel

---

### 📊 Dashboard

<img width="1920" height="1080" alt="Screenshot (989)" src="https://github.com/user-attachments/assets/de05fa80-20d4-4338-8804-8c8c1d357bca" />

---

### 🧾 Billing & PDF Receipt

<img width="1920" height="1080" alt="Screenshot (990)" src="https://github.com/user-attachments/assets/d61237f2-db9f-4fab-a74d-406396f7560a" />

---

## 🌐 Live Demo

🚀 **Frontend**
https://pms-petrol-management-system.vercel.app

📘 **Backend API**
https://pms-petrol-management-system-production.up.railway.app

📚 **Swagger Documentation**
https://pms-petrol-management-system-production.up.railway.app/api-docs


## 🌐 Live Deployment

| Service | Status | URL |
|----------|--------|-----|
| Backend API | ✅ Live | https://pms-petrol-management-system-production.up.railway.app |
| Health Check | ✅ Live | https://pms-petrol-management-system-production.up.railway.app/health |
| Swagger API Documentation | ✅ Live | https://pms-petrol-management-system-production.up.railway.app/api-docs |
| Frontend | ✅ Live | https://pms-petrol-management-system.vercel.app |

---

## 📖 Overview

The **Petrol Pump Management System** is a complete web application for digitizing the day-to-day operations of a fuel station. It replaces manual registers with a secure, role-based dashboard that handles fuel stock, customer billing, staff records, and business reporting.

Built with a clean **MVC architecture** on the backend and a modern **React + Vite** frontend, the project is designed to be easy to read, easy to extend, and easy to demo.

|                  |                                                              |
|------------------|--------------------------------------------------------------|
| Component | Details |
|----------|---------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express (MVC) |
| Database | MySQL |
| Authentication | JWT |
| ORM | Sequelize |
| API Documentation | Swagger UI |
| Backend Deployment | Railway |
| Backend Status | ✅ Live |

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@petrolpump.com | admin123 |
| Staff | staff@petrolpump.com | staff123 |

---

## ✨ Features

### 🔐 Authentication & Access Control
- Secure JWT-based login with token stored client-side
- Role-based access control — **Admin** and **Staff** views
- Axios interceptor for automatic token attachment and refresh handling

### 📊 Dashboard & Analytics
- At-a-glance overview of sales, stock, and revenue
- Interactive charts (Chart.js) for fuel consumption and revenue trends
- Real-time **low-stock alerts** when fuel quantity drops below threshold

### ⛽ Fuel Stock Management
- Add, update, and track multiple fuel types (Petrol, Diesel, CNG, etc.)
- Automatic stock deduction on billing
- Configurable low-stock threshold per fuel type

### 🧾 Billing & Invoicing
- GST-compliant bill generation
- Printable, professional receipts
- Bill history with search and filters

### 👥 Employee Management
- Employee profiles with role and shift assignment
- Attendance tracking
- Salary and payroll records

### 📈 Reports
- Daily, monthly, and custom-range revenue reports
- Exportable summaries for accounting and audits

### ⚙️ Settings
- Profile management and password updates
- Light/dark theme toggle
- Business/station configuration options

---

---

# 🚀 Deployment

The backend API has been successfully deployed on **Railway**.

### Production URLs

**Backend API**

https://pms-petrol-management-system-production.up.railway.app

**Health Check**

https://pms-petrol-management-system-production.up.railway.app/health

**Swagger Documentation**

https://pms-petrol-management-system-production.up.railway.app/api-docs

The frontend is currently being prepared for deployment on **Vercel**.

---

React + Vite
      │
      ▼
Express.js REST API
      │
      ▼
Sequelize ORM
      │
      ▼
MySQL Database

---

## 🛠 Tech Stack

<table>
<tr>
<td valign="top" width="50%">

**Frontend**
- React 18
- Vite
- Tailwind CSS
- Context API (state management)
- Axios (HTTP client)
- Chart.js (data visualization)

</td>
<td valign="top" width="50%">

**Backend**
- Node.js + Express (MVC pattern)
- Sequelize ORM
- MySQL
- JWT (`jsonwebtoken`) for authentication
- bcrypt for password hashing
- Multer for file uploads
- express-validator for input validation
- Swagger for API documentation

</td>
</tr>
</table>

---

## 📁 Project Structure

```
petrol-pump-management-system/
├── backend/                # Node.js + Express API (MVC)
│   ├── config/              # Database, Swagger, and Multer configuration
│   ├── models/               # Sequelize models
│   ├── controllers/          # Request handlers
│   ├── services/              # Business logic
│   ├── routes/                # REST API route definitions
│   ├── middlewares/           # Auth, validation, and error handling
│   ├── validations/            # express-validator rule sets
│   ├── utils/                  # Helpers, logger, and DB seeding scripts
│   ├── uploads/                 # Uploaded files (e.g., receipts, avatars)
│   ├── docs/                     # API documentation
│   └── tests/                     # Basic API tests
│
├── frontend/                # React + Vite UI
│   └── src/
│       ├── components/         # Reusable UI components
│       ├── pages/               # Route-level page components
│       ├── routes/                # App routing configuration
│       └── services/               # API service layer (Axios calls)
│
└── database/
    └── schema.sql            # MySQL schema and seed structure
```

## 📈 Project Statistics

- ✔ 20+ REST APIs
- ✔ JWT Authentication
- ✔ MVC Architecture
- ✔ MySQL Database
- ✔ Sequelize ORM
- ✔ Swagger Documentation
- ✔ Railway Deployment
- ✔ Vercel Deployment
- ✔ PDF Bill Generation
- ✔ Vehicle History
- ✔ Employee Management
- ✔ Fuel Stock Management

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed before you begin:

| Requirement | Version    | Notes                                   |
|--------------|-----------|------------------------------------------|
| Node.js      | 18+       | [Download](https://nodejs.org/)          |
| MySQL        | 8.x       | Via XAMPP, WAMP, or MySQL Workbench      |
| Git          | Any       | To clone the repository                  |

### Step 1 — Clone the Repository

```bash
git clone https://github.com/<your-username>/petrol-pump-management-system.git
cd petrol-pump-management-system
```

Open the folder in your editor of choice (e.g., **File → Open Folder** in VS Code).

### Step 2 — Set Up the Database

1. Start your MySQL service (via XAMPP, WAMP, or MySQL Workbench).
2. Import the schema:

   **Option A — Command line:**
   ```sql
   source /path/to/petrol-pump-management-system/database/schema.sql
   ```

   **Option B — MySQL Workbench:**
   Use **Server → Data Import** and select `database/schema.sql`.

### Step 3 — Backend Setup

```bash
cd backend
cp .env.example .env      # On Windows: copy .env.example .env
```

Edit `.env` with your local configuration:

```env
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_secret_key_here
```

Install dependencies, seed the database, and start the server:

```bash
npm install
npm run seed
npm run dev
```

### Local Development

Backend:
http://localhost:5000

Production Backend:
https://pms-petrol-management-system-production.up.railway.app

#### Demo Login Credentials (after seeding)

| Role  | Email                 | Password  |
|-------|-----------------------|-----------|
| Admin | admin@petrolpump.com  | admin123  |
| Staff | staff@petrolpump.com  | staff123  |

> ⚠️ These are demo credentials for local/testing use only. Change them before deploying to production.

### Step 4 — Frontend Setup

Open a **new terminal window**, then:

```bash
cd frontend
cp .env.example .env      # On Windows: copy .env.example .env
npm install
npm run dev
```

✅ Frontend running at: **http://localhost:5173**

---

## 📡 API Reference

Full interactive documentation is available via Swagger at `/api-docs` once the backend is running. Base routes:

| Module        | Base URL           | Description                                  |
|---------------|--------------------|-----------------------------------------------|
| Auth          | `/api/auth`        | Login, token refresh, session management      |
| Users         | `/api/users`       | User accounts and role management             |
| Fuels         | `/api/fuels`       | Fuel types, stock levels, thresholds          |
| Billing       | `/api/billing`     | Bill generation and history                   |
| Employees     | `/api/employees`   | Employee profiles, attendance, salary         |
| Reports       | `/api/reports`     | Daily/monthly/custom revenue reports          |
| Settings      | `/api/settings`    | Profile, password, and theme configuration    |

---

## ✅ Running Tests

```bash
cd backend
npm test
```

> ℹ️ The backend server must be running for the API tests to pass, since they make live requests against local endpoints.

---

## 🎓 Viva / Presentation Guide

A quick walkthrough script for demos, vivas, or evaluations:

1. **Explain the architecture** — Models (Sequelize), Views (React pages), Controllers (Express route handlers).
2. **Show Swagger docs** at `/api-docs` to demonstrate documented, testable endpoints.
3. **Live demo flow:**
   - Log in as Admin
   - Add a new fuel entry / update stock
   - Generate a bill
   - Print the receipt
4. **Show the low-stock alert** on the dashboard by dropping a fuel quantity below its threshold.
5. **Explain the JWT flow:**
   - User logs in → server issues a JWT
   - Token is stored client-side (localStorage)
   - Axios interceptor attaches the token to every subsequent request
   - Protected routes verify the token via middleware before granting access

---

## 🩺 Troubleshooting

| Issue                     | Solution                                                                 |
|----------------------------|--------------------------------------------------------------------------|
| MySQL connection error     | Check your `.env` DB credentials and confirm MySQL is running            |
| CORS error                 | Set `FRONTEND_URL` in backend `.env`, or rely on the pre-configured Vite proxy |
| Empty dashboard            | Run `npm run seed` inside the `backend` directory                        |
| Port already in use        | Change `PORT` in backend `.env`, or update the Vite dev server port in `vite.config.js` |
| 401 Unauthorized on API calls | Ensure you're logged in and the JWT token hasn't expired               |

---

## 🗺️ Roadmap

## 🗺️ Roadmap

- [x] Backend API Development
- [x] JWT Authentication
- [x] Swagger Documentation
- [x] Railway Backend Deployment
- [x] Frontend Deployment (Vercel)
- [x] PDF Bill Generation
- [x] Export Reports to PDF
- [x] Automatic Report Download
- [x] Multi Branch Management
- [ ] Docker Support
- [ ] Custom Domain
- [ ] CI/CD Pipeline

*(Contributions and suggestions for this roadmap are welcome!)*

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## ⚖️ License

This repository is provided for viewing and educational purposes only.

The source code may not be copied, modified, redistributed, or used in any commercial or personal project without the explicit written permission of the author.

© 2026 M. Ahsan Idrees. All Rights Reserved.

---

## 👨‍💻 Author

**M. Ahsan Idrees**

Cybersecurity Undergraduate • Full Stack Developer

### Connect with me

- GitHub: https://github.com/ahsanidreesnns8-ai
- LinkedIn: https://www.linkedin.com/in/m-ahsan-idrees-664126329

---

![Stars](https://img.shields.io/github/stars/ahsanidreesnns8-ai/PMS-Petrol-Management-System-?style=for-the-badge)

![Issues](https://img.shields.io/github/issues/ahsanidreesnns8-ai/PMS-Petrol-Management-System-?style=for-the-badge)

![Last Commit](https://img.shields.io/github/last-commit/ahsanidreesnns8-ai/PMS-Petrol-Management-System-?style=for-the-badge)

---
<div align="center">

If this project helped you, consider giving it a ⭐ on GitHub!

</div>
