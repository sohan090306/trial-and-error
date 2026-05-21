import { validationResult } from 'express-validator';
import { logger } from '../utils/logger.js';

export function validate(req, _res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ statusCode: 422, message: 'Validation failed', details: errors.array() });
  }
  next();
}

export function notFound(req, _res, next) {
  next({ statusCode: 404, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;
  if (statusCode >= 500) logger.error(error.stack || error.message);
  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal server error',
    details: error.details
  });
}
