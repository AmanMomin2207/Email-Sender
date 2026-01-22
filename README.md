# 📧 Email Scheduler & Sender

A full-stack **Email Scheduling and Sending** application built with **Node.js (Express)**, **PostgreSQL**, **Redis**, **BullMQ**, and **Prisma**, with a frontend dashboard for composing, scheduling, and tracking emails.

---

## 🚀 Tech Stack

### Backend

* Node.js + Express
* PostgreSQL (via Prisma ORM)
* Redis
* BullMQ (Scheduling, rate limiting, concurrency)
* Nodemailer
* Ethereal Email (SMTP testing)

### Frontend

* React
* Authentication
* Dashboard
* Email composer & scheduler
* Data tables

---

## 🧠 Architecture Overview

### 📅 Scheduling

* Emails are scheduled using **BullMQ delayed jobs**
* A job is created with a delay based on scheduled time
* Redis stores job metadata until execution

### 🧱 Persistence on Restart

* **PostgreSQL (Prisma)** stores email metadata and status
* **Redis** persists BullMQ jobs
* On server restart:

  * Redis reloads pending jobs
  * Prisma reloads persisted emails
  * No scheduled emails are lost

### ⏱️ Rate Limiting

* BullMQ rate limiter prevents excessive email sending
* Protects SMTP provider from throttling

### 🔀 Concurrency

* Worker concurrency controls parallel email sending
* Configurable using environment variables

---

## 🗂️ Project Structure

```
Email-Sender/
│
├── server/
│   ├── prisma/
│   ├── config/
│   ├── queues/
│   ├── workers/
│   ├── controllers/
│   ├── routes/
│   └── index.js
│
├── client/
│   ├── src/
│   └── public/
│
└── README.md
```

---

## 🛠️ Backend Setup (Express + Prisma + Redis + BullMQ)

### 📦 Install Dependencies

```bash
cd server
npm install
```

---

## 🗄️ Prisma ORM Setup

### Install Prisma

```bash
npm install prisma @prisma/client
```

### Initialize Prisma

```bash
npx prisma init
```

Creates:

```
prisma/
 └── schema.prisma
.env
```

---

### 🔗 Prisma Database Configuration

`prisma/schema.prisma`

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL_EXTERNAL")
}

generator client {
  provider = "prisma-client-js"
}
```

---

### 🧱 Prisma Commands

#### Generate Prisma Client

```bash
npx prisma generate
```

#### Create Migration (Development)

```bash
npx prisma migrate dev --name init
```

#### Apply Migrations (Production)

```bash
npx prisma migrate deploy
```

#### Open Prisma Studio

```bash
npx prisma studio
```

Access at:

```
http://localhost:5555
```

---

### 🔄 Prisma Usage

```js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;
```

Used for:

* Email metadata storage
* Status tracking (`PENDING`, `SENT`, `FAILED`)
* Persistence across restarts

---

## 🔐 Environment Variables

Create a `.env` file inside `server/`:

```env
PORT=4000

# PostgreSQL
DATABASE_URL_INTERNAL=postgresql://email_scheduler_y7g3_user:hhTSzRMqxkZdtmX6WOsDKso4acERU1iC@dpg-d5oc8sq4d50c73c7hc6g-a/email_scheduler_y7g3
DATABASE_URL_EXTERNAL=postgresql://email_scheduler_y7g3_user:hhTSzRMqxkZdtmX6WOsDKso4acERU1iC@dpg-d5oc8sq4d50c73c7hc6g-a.oregon-postgres.render.com/email_scheduler_y7g3

# Redis
REDIS_URL=redis://red-d5oajcq4d50c73c68o4g:6379

# Ethereal Email
ETHEREAL_USER=your_ethereal_email
ETHEREAL_PASS=your_ethereal_password

# Auth
JWT_SECRET=your_secret_key

# Worker
WORKER_CONCURRENCY=5
EMAIL_RATE_LIMIT=10
```

---

## ▶️ Run Backend

```bash
npx nodemon src/index.ts
```

Server runs on:

```
http://localhost:4000
```

---

## ⚙️ BullMQ Worker

* Processes scheduled email jobs
* Applies rate limits
* Controls concurrency
* Updates email status via Prisma

⚠️ Worker **must be running** for emails to send.

---

## 🌐 Frontend Setup

### Install Dependencies

```bash
cd client
npm install
```

### Run Frontend

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## ✉️ Ethereal Email Setup

Used for safe email testing.

### Steps:

1. Visit [https://ethereal.email](https://ethereal.email)
2. Create a test account
3. Copy SMTP credentials
4. Add to `.env`

Emails can be viewed directly in the Ethereal dashboard.

---

## ✅ Features Implemented

### 🔧 Backend

| Feature                | Status |
| ---------------------- | ------ |
| Email Scheduling       | ✅      |
| Delayed Jobs           | ✅      |
| PostgreSQL Persistence | ✅      |
| Prisma ORM             | ✅      |
| Redis Queue            | ✅      |
| Restart Recovery       | ✅      |
| Rate Limiting          | ✅      |
| Concurrency Control    | ✅      |
| Worker Processing      | ✅      |

---

### 🎨 Frontend

| Feature         | Status |
| --------------- | ------ |
| Login           | ✅      |
| Dashboard       | ✅      |
| Compose Email   | ✅      |
| Schedule Email  | ✅      |
| Email Tables    | ✅      |
| API Integration | ✅      |

---

## 🧪 Testing Notes

* Emails are sent via **Ethereal (test-only)**
* Redis must be running
* Worker must be active

---

## 📦 Deployment Notes

* **Internal DB URL** → Render internal services
* **External DB URL** → Local development
* **Redis** → Managed Redis instance

---
