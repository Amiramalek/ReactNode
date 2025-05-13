
This website is a role-based admin panel built with **React**, **Express**, and **MongoDB**. It supports user authentication and role-based access, allowing users to log in as either an **admin** or **customer**, and providing functionality to manage roles dynamically.

## 🛠 Technologies Used

- React (Frontend)
- Express.js (Backend)
- MongoDB (Database)
- Mongoose (ODM)
- React Router DOM (Routing)
- Node.js (Runtime)

## How to Run the Project

### 1.  got to Master Branch then  Download and Extract

First, download the project folder from the repository and extract it.

### 2. Run Backend Server

Open your terminal and navigate to the server directory:

```bash
cd server
node server
This will start the Express server.

3. Run Frontend Client
In a new terminal window, go back to the root and start the React client:

bash
cd ..
cd client
npm install react-router-dom
npm start
This will launch the frontend in your default browser at http://localhost:3000.

4. Access Admin Panel
To access the admin panel:

bash
http://localhost:3000/admin
You will be able to:

Register a new user

Log in as an admin or customer

Assign and manage user roles

📦 Database Credentials
This project connects to a MongoDB instance using the following credentials:

Email: amiramalek006@gmail.com

Password: Amira@1234

✅ Features
Role-based login and protected routes

Admin can promote users to different roles

MongoDB integration for user data

React frontend with dynamic routing

