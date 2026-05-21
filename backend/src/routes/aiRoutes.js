import { Router } from 'express';
import { chatbot, diet, fatigue, profileRules, workout } from '../controllers/aiController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/error.js';

export const aiRoutes = Router();

aiRoutes.post('/workout', authenticate, profileRules, validate, workout);
aiRoutes.post('/diet', authenticate, profileRules, validate, diet);
aiRoutes.post('/fatigue', authenticate, fatigue);
aiRoutes.post('/chatbot', authenticate, chatbot);
