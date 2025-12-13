# Leave Management System (Leave Only)


Project Description:

This is a Leave Management System built using the MERN stack.
Employees can apply for leave, and managers can approve or reject leave requests.

The system has two roles:

1.Employee
2.Manager

Each role has its own dashboard and permissions.
This project focuses more on working functionality than advanced design.

# Technology Stack Used:

Frontend:

React (Vite)
React Router
Axios
CSS (Responsive design)

Backend:

Node.js
Express.js
MongoDB
Mongoose
JWT (JSON Web Token)
bcrypt.js

Database:

MongoDB Atlas (Cloud database)

# Database Setup Instructions:

1.Create an account on MongoDB Atlas
2.Create a new cluster
3.Copy the MongoDB connection string
4.Inside the backend folder, create a (.env) file
5.Add the following values:

| MONGO_URI=mongodb+srv://Admin:7204646243@book-store-mern.fhu4lo9.mongodb.net/G-leave-management?retryWrites=true&w=majority
| JWT_SECRET=b07d2981f21844e56621e03afecdd211e83e78a2f052a29bcbd3c47d4f2e3b7f/
| NODE_ENV=development
| PORT=5000

# Step-by-Step Instructions to Run the Project Locally:

# Step 1: Clone the project

   git clone <https://github.com/Gowthamsenthil-22/leave_sys>

# Step 2: Backend setup

  cd backend
  npm install
  npm run dev

->Backend will run at:

  http://localhost:5000

# Step 3: Frontend setup

  cd frontend
  npm install
  npm run dev

# Frontend will run at:

  http://localhost:5173

# Deployed Application URL

->Frontend URL:
  <https://leave-sys-frontend.onrender.com>

->Backend API URL:
  <https://leave-sys-backend.onrender.com/>

# Test Login Credentials

->Employee Login:

  Email: employee1@gmail.com
  Password: 12345

->Manager Login:

  Email: manager2@gmail.com
  Password: 12345

Note: Employees must select a manager during registration.

->Known Limitations / Issues:

  No email notifications
  No password reset option
  Leave balance updates only after manager approval
  No public holiday or weekend calculation
  UI is simple and focused on functionality

->Deployed Application (Requirement):

  The application is live and working
  It is accessible for testing
  Test login credentials are provided above


