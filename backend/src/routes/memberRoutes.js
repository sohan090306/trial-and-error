import { Router } from 'express';
import { createMember, deleteMember, listMembers, memberRules, updateMember } from '../controllers/memberController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/error.js';

export const memberRoutes = Router();

memberRoutes.get('/', authenticate, listMembers);
memberRoutes.post('/', authenticate, authorize('admin', 'trainer'), memberRules, validate, createMember);
memberRoutes.put('/:id', authenticate, authorize('admin', 'trainer'), memberRules, validate, updateMember);
memberRoutes.delete('/:id', authenticate, authorize('admin'), deleteMember);
