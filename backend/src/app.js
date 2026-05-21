import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { env } from './config/env.js';
import { authRoutes } from './routes/authRoutes.js';
import { memberRoutes } from './routes/memberRoutes.js';
import { dashboardRoutes } from './routes/dashboardRoutes.js';
import { aiRoutes } from './routes/aiRoutes.js';
import { attendanceRoutes } from './routes/attendanceRoutes.js';
import { paymentRoutes } from './routes/paymentRoutes.js';
import { errorHandler, notFound } from './middleware/error.js';

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: env.frontendUrl, credentials: true }));
  app.use(express.json({ limit: '2mb' }));
  app.use(morgan('dev'));
  app.use(rateLimit({ windowMs: 60_000, max: 240 }));

  app.get('/health', (_req, res) => res.json({ success: true, service: 'nexafit-backend' }));
  app.use('/api/auth', authRoutes);
  app.use('/api/members', memberRoutes);
  app.use('/api/dashboard', dashboardRoutes);
  app.use('/api/ai', aiRoutes);
  app.use('/api/attendance', attendanceRoutes);
  app.use('/api/payments', paymentRoutes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
