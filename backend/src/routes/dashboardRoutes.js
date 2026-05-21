import { Router } from 'express';
import { getDashboard, getTrainers } from '../controllers/dashboardController.js';
import { authenticate } from '../middleware/auth.js';

export const dashboardRoutes = Router();

dashboardRoutes.get('/', authenticate, getDashboard);
dashboardRoutes.get('/trainers', authenticate, getTrainers);
