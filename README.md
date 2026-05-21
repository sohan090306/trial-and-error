# NexaFit AI Smart Gym Platform

NexaFit is a complete final-year software engineering project for an AI-powered smart gym management and fitness intelligence SaaS. It combines gym operations, advanced MySQL DBMS design, real-time dashboards, AI workout and nutrition engines, gamification, futuristic UI, and production-style modular architecture.

## Major Modules

- JWT authentication with admin, trainer, and member roles.
- Member, trainer, membership, attendance, workout, diet, payment, notification, achievement, and leaderboard systems.
- Real-time analytics with Socket.io.
- Python Flask AI microservice for workout, diet, fatigue, crowd, and future body predictions.
- MySQL schema with primary keys, foreign keys, indexes, full-text search, views, triggers, stored procedures, and transactions.
- React futuristic dashboard using Tailwind CSS, Framer Motion, Three.js, Recharts, and lucide icons.

## Demo Login

Backend fallback demo users work even before MySQL is connected:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@nexafit.local` | `Admin@123` |
| Trainer | `trainer@nexafit.local` | `Trainer@123` |
| Member | `member@nexafit.local` | `Member@123` |

## Folder Structure

```text
backend/        Express MVC API, JWT, Socket.io, MySQL pool
frontend/       React futuristic SaaS UI
ai-service/     Flask AI microservice
database/       MySQL schema, seed data, queries, ER diagram
docs/           Deployment and project documentation
```

## Setup

1. Install Node dependencies:

```bash
npm install
```

2. Install Python dependencies:

```bash
cd ai-service
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

3. Create the database:

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

4. Configure backend:

```bash
copy backend\.env.example backend\.env
```

5. Run the full stack:

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:8080`  
AI service: `http://localhost:5001`

## DBMS Assets

- [database/schema.sql](database/schema.sql) contains normalized DDL, constraints, indexes, views, triggers, and procedures.
- [database/seed.sql](database/seed.sql) contains sample admins, trainers, members, plans, attendance, payments, workouts, diet logs, achievements, and predictions.
- [database/queries.sql](database/queries.sql) contains complex joins, aggregates, full-text search, heatmap analytics, and transaction procedure usage.
- [database/diagrams/er-diagram.mmd](database/diagrams/er-diagram.mmd) contains the ER diagram in Mermaid format.
- [database/relational-schema.md](database/relational-schema.md) documents relational tables.

## API Overview

- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `GET /api/dashboard`
- `GET /api/dashboard/trainers`
- `GET /api/members`
- `POST /api/members`
- `GET /api/attendance/qr-token`
- `POST /api/attendance/check-in`
- `POST /api/ai/workout`
- `POST /api/ai/diet`
- `POST /api/ai/fatigue`
- `POST /api/ai/chatbot`
- `GET /api/payments/:id/invoice`

## Final-Year Presentation Highlights

- Demonstrate DB normalization and relationships through the ER diagram.
- Run `sp_renew_membership` to show a transaction that renews a plan and records payment atomically.
- Show `vw_live_gym_occupancy` and `vw_member_intelligence` as analytical views.
- Trigger live dashboard changes through Socket.io check-ins.
- Present the AI digital twin, future body prediction, fatigue detection, smart mirror concept, rival/leaderboard, and fitness aura system.
