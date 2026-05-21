import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/apiError.js';

export function signToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role, email: user.email, name: user.name },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}

export function authenticate(req, _res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    throw new ApiError(401, 'Authentication token missing');
  }
  try {
    req.user = jwt.verify(header.slice(7), env.jwtSecret);
    next();
  } catch {
    throw new ApiError(401, 'Invalid or expired token');
  }
}

export function authorize(...roles) {
  return (req, _res, next) => {
    if (!roles.includes(req.user?.role)) {
      throw new ApiError(403, 'You do not have access to this resource');
    }
    next();
  };
}
