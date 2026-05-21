import { Router } from 'express';
import { forgotPassword, login, loginRules, verifyOtp } from '../controllers/authController.js';
import { validate } from '../middleware/error.js';

export const authRoutes = Router();

authRoutes.post('/login', loginRules, validate, login);
authRoutes.post('/forgot-password', forgotPassword);
authRoutes.post('/verify-otp', verifyOtp);
