# Quiz Builder

Full-stack application for creating and managing quizzes with multiple question types.

---

## Requirements

- Node.js 18+
- PostgreSQL
- npm or yarn

---

## Run Backend

```bash
cd backend
npm install
```

Create `.env` file in `backend`:

```env
DATABASE_URL=file:./dev.db
PORT=3000
```

Run migrations and start server:

```bash
npx prisma migrate dev
npm run start:dev
```

Backend runs on:  
http://localhost:3000

---

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:  
http://localhost:5175

---

## Database Setup

```sql
CREATE DATABASE quiz_db;
```

Update `DATABASE_URL` in `backend/.env`, then run:

```bash
npx prisma migrate dev
```

---

## Create Sample Quiz

1. Open frontend in browser
2. Click **Create Quiz**
3. Enter quiz title
4. Add questions:
   - True / False
   - Short Answer
   - Multiple Choice
5. Click **Create Quiz**

---

## Tech Stack

- Frontend: React, TypeScript, React Hook Form, Zod
- Backend: NestJS, Prisma
- Database: PostgreSQL

---

## Notes

- Quiz is saved only on explicit submit
- Validation is handled on both frontend and backend
