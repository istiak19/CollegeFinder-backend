# 🏫 UniversityFinder Backend

> RESTful API backend for the UniversityFinder application, managing users, colleges, admissions, and reviews. Built with Express, TypeScript, and MongoDB.

🔗 [Frontend Repo](https://github.com/istiak19/CollegeFinder-frontend)
🔗 [Backend Repo](https://github.com/istiak19/CollegeFinder-backend)
🌐 [Live API Base URL](https://college-finder-alpha.vercel.app/api/v1)

---

## 📚 Table of Contents

* [Introduction](#introduction)
* [API Endpoints](#api-endpoints)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Usage](#usage)
* [Environment Variables](#environment-variables)
* [Project Structure](#project-structure)
* [Contributors](#contributors)
* [License](#license)

---

## 🧠 Introduction

The **UniversityFinder Backend** serves as the API layer for the UniversityFinder platform. It enables CRUD operations for users, colleges, and admission data. Built using Express and Mongoose, it provides structured endpoints and database models for reliable data handling.

---

## 🔌 API Endpoints

### 👤 User Routes

| Method | Endpoint       | Description                 |
| ------ | -------------- | --------------------------- |
| POST   | `/user`        | Create a new user           |
| GET    | `/user/:email` | Get a single user by email  |
| PUT    | `/user/:email` | Update a user's information |

### 🏛️ College Routes

| Method | Endpoint        | Description                   |
| ------ | --------------- | ----------------------------- |
| GET    | `/colleges`     | Retrieve list of all colleges |
| GET    | `/colleges/:id` | Get a single college by ID    |

### 📝 Admission Routes

| Method | Endpoint            | Description                         |
| ------ | ------------------- | ----------------------------------- |
| POST   | `/admission`        | Create a new admission record       |
| GET    | `/admission/:email` | Get admissions submitted by a user  |
| GET    | `/review`           | Get all submitted reviews           |
| PUT    | `/admission/:email` | Add review to an admission by email |

---

## ⚙️ Tech Stack

* **Node.js** + **Express.js**
* **TypeScript**
* **MongoDB** + **Mongoose**
* **Dotenv** for environment configuration
* **CORS** for cross-origin requests
* **BcryptJS** for password hashing (if used for auth)

---

## 📦 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/istiak19/CollegeFinder-backend.git
cd CollegeFinder-backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Build the project:**

```bash
npm run build
```

---

## 🚀 Usage

### Start Development Server

```bash
npm run dev
```

> Runs the server using `ts-node-dev` with hot-reload

---

## 🔐 Environment Variables

Create a `.env` file in the root directory and configure the following:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

---

## 📁 Project Structure

```
src/
├── controllers/
│   ├── user.controller.ts
│   ├── college.controller.ts
│   └── admission.controller.ts
├── routes/
│   ├── user.routes.ts
│   ├── college.routes.ts
│   └── admission.routes.ts
├── server.ts
```

---

## 👨‍💻 Contributors

* [istiak19](https://github.com/istiak19) – Creator & Maintainer
