import { Router } from 'express';
import { invoice } from '../controllers/paymentController.js';
import { authenticate } from '../middleware/auth.js';

export const paymentRoutes = Router();

paymentRoutes.get('/:id/invoice', authenticate, invoice);
