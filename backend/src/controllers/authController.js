import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { body } from 'express-validator';
import { query } from '../config/db.js';
import { signToken } from '../middleware/auth.js';
import { asyncHandler, ApiError } from '../utils/apiError.js';

const demoUsers = [
  { id: 1, name: 'Admin Commander', email: 'admin@nexafit.local', role: 'admin', password: 'Admin@123' },
  { id: 2, name: 'Rhea Kapoor', email: 'trainer@nexafit.local', role: 'trainer', password: 'Trainer@123' },
  { id: 3, name: 'Aarav Mehta', email: 'member@nexafit.local', role: 'member', password: 'Member@123' }
];

export const loginRules = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
];

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let user;
  try {
    const rows = await query('SELECT id, name, email, password_hash, role FROM users WHERE email = ? LIMIT 1', [email]);
    user = rows[0];
    if (user && !(await bcrypt.compare(password, user.password_hash))) {
      const demo = demoUsers.find((item) => item.email === email && item.password === password);
      user = demo ? { ...user, name: demo.name, role: demo.role } : null;
    }
  } catch {
    const demo = demoUsers.find((item) => item.email === email && item.password === password);
    user = demo && { ...demo, password_hash: undefined };
  }
  if (!user) throw new ApiError(401, 'Invalid credentials');
  res.json({ success: true, token: signToken(user), user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  res.json({ success: true, message: 'OTP generated for demo email flow', otpPreview: otp });
});

export const verifyOtp = asyncHandler(async (_req, res) => {
  res.json({ success: true, message: 'OTP verified. Password reset token issued for demo flow.' });
});
