# Task Management System 🚀

A modern, production-ready Daily Task Management Web Application built with Node.js, Express, Nunjucks, and MongoDB. This application features a clean MVC architecture, responsive design, and smooth user flow.

## 🌟 Features

-   **User Authentication**: Secure register, login, and logout with password hashing (bcrypt).
-   **Dashboard**: Overview of task statistics (Total, Pending, Completed) and a progress indicator.
-   **Task CRUD**: Full Create, Read, Update, and Delete operations for tasks.
-   **Advanced Filtering**: Search by title/description and filter by priority or status.
-   **Responsive UI**: Mobile-first design with Tailwind CSS and Dark Mode support.
-   **Icons**: Integrated Lucide Icons for a modern look.
-   **Clean Architecture**: Separation of concerns using Model-View-Controller pattern.

## 🛠️ Tech Stack

-   **Frontend**: Nunjucks, Vanilla JS (ES6+), Tailwind CSS, Vite (Build Tool), Lucide Icons.
-   **Backend**: Node.js, Express.js.
-   **Database**: MongoDB (via Prisma ORM).
-   **Authentication**: express-session, bcrypt.

## 📋 Prerequisites

-   [Node.js](https://nodejs.org/) (v16+ recommended)
-   [MongoDB](https://www.mongodb.com/cloud/atlas) (Local instance or MongoDB Atlas cluster)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/KarthikSarika/Task_Management_System.git
cd Task_Management_System
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL="your_mongodb_connection_string"
PORT=3000
SESSION_SECRET="your_random_secret_key"
NODE_ENV="development"
```

### 4. Database Setup
Push the Prisma schema to your MongoDB database:
```bash
npx prisma db push
```

### 5. Build Assets
Compile Tailwind CSS and bundle JS using Vite:
```bash
npm run build
```

### 6. Run the Application
For production:
```bash
npm start
```
For development with automatic restarts:
```bash
npm run start:dev
```

## 🌍 Deployment

https://task-management-system-tfh9.onrender.com

The application is ready for deployment on platforms like **Render**, **Railway**, or **Vercel**.

1.  Set up a **MongoDB Atlas** database.
2.  Connect your repository.
3.  Set the **Build Command**: `npm install && npm run build && npx prisma generate`
4.  Set the **Start Command**: `npm start`
5.  Configure your **Environment Variables** in the hosting platform's dashboard.

## 📄 License

This project is licensed under the ISC License.

