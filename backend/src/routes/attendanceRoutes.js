import { Router } from 'express';
import { checkIn, qrToken } from '../controllers/attendanceController.js';
import { authenticate } from '../middleware/auth.js';

export const attendanceRoutes = Router();

attendanceRoutes.get('/qr-token', authenticate, qrToken);
attendanceRoutes.post('/check-in', authenticate, checkIn);
