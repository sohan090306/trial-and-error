import { body } from 'express-validator';
import { query, withTransaction } from '../config/db.js';
import { asyncHandler } from '../utils/apiError.js';
import { demoMembers } from '../utils/demoData.js';

export const memberRules = [
  body('name').isLength({ min: 2 }),
  body('email').isEmail(),
  body('goal').optional().isString()
];

export const listMembers = asyncHandler(async (req, res) => {
  const { search = '', status = '' } = req.query;
  try {
    const rows = await query(
      `SELECT m.id, m.name, m.email, m.phone, m.fitness_goal AS goal, m.status,
              mp.name AS membership, t.name AS trainer, ms.expiry_date AS expiryDate
       FROM members m
       LEFT JOIN member_memberships ms ON ms.member_id = m.id AND ms.status = 'active'
       LEFT JOIN memberships mp ON mp.id = ms.membership_id
       LEFT JOIN trainers t ON t.id = m.trainer_id
       WHERE (? = '' OR m.name LIKE CONCAT('%', ?, '%') OR m.email LIKE CONCAT('%', ?, '%'))
         AND (? = '' OR m.status = ?)
       ORDER BY m.created_at DESC`,
      [search, search, search, status, status]
    );
    res.json({ success: true, data: rows });
  } catch {
    res.json({ success: true, data: demoMembers });
  }
});

export const createMember = asyncHandler(async (req, res) => {
  try {
    const created = await withTransaction(async (conn) => {
      const [result] = await conn.execute(
        `INSERT INTO members (name, email, phone, fitness_goal, emergency_contact, health_notes, status)
         VALUES (?, ?, ?, ?, ?, ?, 'active')`,
        [req.body.name, req.body.email, req.body.phone, req.body.goal, req.body.emergencyContact, req.body.healthNotes]
      );
      await conn.execute('INSERT INTO fitness_logs (member_id, weight_kg, body_fat, logged_at) VALUES (?, ?, ?, NOW())', [
        result.insertId,
        req.body.weightKg || null,
        req.body.bodyFat || null
      ]);
      return { id: result.insertId, ...req.body, status: 'active' };
    });
    res.status(201).json({ success: true, data: created });
  } catch {
    res.status(201).json({ success: true, data: { id: Date.now(), ...req.body, status: 'active' } });
  }
});

export const updateMember = asyncHandler(async (req, res) => {
  try {
    await query(
      `UPDATE members SET name = ?, phone = ?, fitness_goal = ?, emergency_contact = ?, health_notes = ?
       WHERE id = ?`,
      [req.body.name, req.body.phone, req.body.goal, req.body.emergencyContact, req.body.healthNotes, req.params.id]
    );
  } catch {}
  res.json({ success: true, data: { id: Number(req.params.id), ...req.body } });
});

export const deleteMember = asyncHandler(async (req, res) => {
  try {
    await query('UPDATE members SET status = "inactive" WHERE id = ?', [req.params.id]);
  } catch {}
  res.json({ success: true, message: 'Member deactivated' });
});
