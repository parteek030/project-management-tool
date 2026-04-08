# 🗂️ Project Management Tool

A full-stack project management application with user authentication, project management, and task tracking.

---

## 🎯 Objective

Build a basic project management tool with:

- Python backend (FastAPI)
- React frontend (TypeScript)

---

## 🚀 Features

### 🔐 Authentication

- Register & login with email/password
- JWT-based authentication
- Password hashing (bcrypt)
- Protected API routes

---

### 📁 Projects

- Create, update, delete projects
- View user-specific projects
- Fields:
  - Title
  - Description
  - Status (active, completed)

---

### ✅ Tasks

- Tasks linked to projects
- Fields:
  - Title
  - Description
  - Status (todo, in-progress, done)
  - Due date

- Full CRUD operations
- Filter tasks by status

---

### 💻 Frontend

- Login & Register pages
- Dashboard (projects list)
- Project detail page (tasks)
- Forms for create/edit
- Tailwind CSS styling
- TypeScript throughout

---

### ⭐ Bonus Features Implemented

- Pagination & search (projects)
- Form validation (React Hook Form + Yup)
- Zustand for state management
- Axios interceptor for auth

---

## 🛠️ Tech Stack

### Backend

- FastAPI
- SQLite
- SQLAlchemy
- JWT Authentication
- bcrypt

### Frontend

- React (Vite + TypeScript)
- Tailwind CSS
- Zustand
- React Hook Form + Yup
- Axios

---

## 📂 Project Structure

```
project-management-tool/
├── backend/
│   ├── app/
│   ├── seeds/
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   ├── index.html
│   └── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repo

```
git clone https://github.com/YOUR_USERNAME/project-management-tool.git
cd project-management-tool
```

---

## 🔧 Backend Setup

```
cd backend

python -m venv venv
.\venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend:

```
http://localhost:8000
```

Docs:

```
http://localhost:8000/docs
```

---

## 💻 Frontend Setup

```
cd frontend

npm install
npm run dev
```

Frontend:

```
http://localhost:5173
```

---

## 🔐 Authentication

All protected routes require:

```
Authorization: Bearer <token>
```

Handled via Axios interceptor.

---

## 🌱 Seeder (if applicable)

```
python seeds/seed.py
```

---

## 🧪 How to Use

1. Register a new user
2. Login
3. Create projects
4. Open a project
5. Add tasks
6. Filter tasks

---

## ⚠️ Known Limitations

- No role-based access control
- Minimal UI/UX (focus on functionality)
- No real-time updates
- Limited error handling

---

## 👤 Author

Parteek
