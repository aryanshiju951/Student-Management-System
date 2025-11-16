# 🎓 Student Management System

A simple **Student Management** application built with **Node.js, Express, MongoDB (Mongoose)** for the backend and **HTML, CSS, JavaScript** for the frontend.  
This project demonstrates CRUD operations (Create, Read, Update, Delete) for managing student records.

---

## 🚀 Features
- ➕ Add new students with name, age, and course  
- 📋 View all students in a clean table UI  
- ✏️ Edit student details  
- 🗑️ Delete students with confirmation  
- ✅ Input validation on both frontend and backend  
- 🎨 Responsive, modern UI without frameworks (pure HTML/CSS/JS)  

---

## 🛠️ Tech Stack
**Backend**
- Node.js
- Express.js
- Mongoose 
- Morgan 
- CORS
- Body-parser

**Frontend**
- HTML5
- CSS3
- Vanilla JavaScript

**Database**
- MongoDB (local)

---

## 📁 Project Structure

```
Student-Management-System/
├── backend/ 
│ ├── node_modules/
│ ├── backend.js
│ ├── package.json
│ └── package-lock.json
└── frontend/
  ├── index.html
  ├── styles.css
  └── script.js
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/aryanshiju951/Student-Management-System.git
cd Student-Management-System
```
### 2. Install dependencies
```bash
npm install
```
### 3. Configure MongoDB
- If using local MongoDB, ensure it’s running on mongodb://localhost:27017.
- If using MongoDB Atlas, replace the connection string in backend.js:
`mongoose.connect(process.env.MONGO_URI)`
and set `MONGO_URI` in your environment variables (`.env` file).

### 4. Run the backend
#### i) Run using node
```bash
cd backend
node backend.js
```

#### ii) Run using nodemon (auto-restart on changes)

```bash
cd backend
npm install -g nodemon 
```
Do this 👆, if not installed before
```bash
cd backend
nodemon backend.js
```

Server will start at: `http://localhost:5000`

### 5. Open the frontend
- Simply open frontend/index.html in your browser.
- The frontend will connect to the backend API.

---

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| 🟩 GET | `/students` | Get all students |
| 🟦 POST | `/students` | Add a new student |
| 🟨 PUT | `/students/:id` | Update student by ID |
| 🟥 DELETE | `/students/:id` | Delete student by ID |


