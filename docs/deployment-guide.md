# Deployment Guide

## Recommended Production Topology

- Frontend: Vercel, Netlify, or Nginx static hosting.
- Backend: Node.js container on Render, Railway, AWS ECS, or a VPS.
- AI service: Separate Python container with autoscaling.
- Database: Managed MySQL with automated backups and binary logging.
- Real time: Socket.io served by the backend with sticky sessions if horizontally scaled.

## Environment Variables

Backend:

```text
NODE_ENV=production
PORT=8080
FRONTEND_URL=https://your-frontend-domain
JWT_SECRET=long_random_secret
MYSQL_HOST=your-mysql-host
MYSQL_USER=your-user
MYSQL_PASSWORD=your-password
MYSQL_DATABASE=nexafit_ai_gym
AI_SERVICE_URL=https://your-ai-service
```

Frontend:

```text
VITE_API_URL=https://your-backend-domain
```

## Build Commands

Frontend:

```bash
cd frontend
npm install
npm run build
```

Backend:

```bash
cd backend
npm install
npm start
```

AI service:

```bash
cd ai-service
pip install -r requirements.txt
python run.py
```

## Security Checklist

- Replace demo credentials.
- Use strong `JWT_SECRET`.
- Enforce HTTPS.
- Configure MySQL least-privilege user.
- Store SMTP and database credentials in deployment secrets.
- Enable database backups and recovery drills.
- Add object storage for profile photos and invoice PDFs.
