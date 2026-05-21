import { query } from '../config/db.js';
import { asyncHandler } from '../utils/apiError.js';
import { analyticsSnapshot, demoTrainers } from '../utils/demoData.js';

export const getDashboard = asyncHandler(async (_req, res) => {
  try {
    const [active] = await query('SELECT COUNT(*) AS activeMembers FROM members WHERE status = "active"');
    const [live] = await query('SELECT COUNT(*) AS liveAttendance FROM attendance WHERE DATE(check_in) = CURDATE() AND check_out IS NULL');
    const [revenue] = await query('SELECT COALESCE(SUM(amount), 0) AS monthlyRevenue FROM payments WHERE MONTH(paid_at) = MONTH(CURDATE()) AND status = "paid"');
    res.json({ success: true, data: { ...analyticsSnapshot, ...active, ...live, ...revenue } });
  } catch {
    res.json({ success: true, data: analyticsSnapshot });
  }
});

export const getTrainers = asyncHandler(async (_req, res) => {
  try {
    const rows = await query(
      `SELECT t.id, t.name, t.specialization, ROUND(AVG(s.rating), 2) AS rating,
              COUNT(s.id) AS sessions, ROUND(AVG(s.member_retention_score), 1) AS retention
       FROM trainers t
       LEFT JOIN trainer_sessions s ON s.trainer_id = t.id
       GROUP BY t.id
       ORDER BY retention DESC`
    );
    res.json({ success: true, data: rows });
  } catch {
    res.json({ success: true, data: demoTrainers });
  }
});
