USE nexafit_ai_gym;

-- Optimized member search using full-text index.
SELECT id, name, email, fitness_goal
FROM members
WHERE MATCH(name, email, phone, fitness_goal) AGAINST('fat loss' IN NATURAL LANGUAGE MODE);

-- Revenue by plan tier with aggregate analytics.
SELECT ms.tier, COUNT(p.id) AS paid_invoices, SUM(p.amount) AS revenue
FROM payments p
JOIN member_memberships mm ON mm.id = p.membership_record_id
JOIN memberships ms ON ms.id = mm.membership_id
WHERE p.status = 'paid'
GROUP BY ms.tier
ORDER BY revenue DESC;

-- Attendance heatmap.
SELECT DAYNAME(check_in) AS day_name, HOUR(check_in) AS hour_block, COUNT(*) AS visits
FROM attendance
GROUP BY DAYNAME(check_in), HOUR(check_in)
ORDER BY visits DESC;

-- Members with expiring plans and payment risk.
SELECT m.name, mm.expiry_date, DATEDIFF(mm.expiry_date, CURDATE()) AS days_left, p.status AS latest_payment
FROM members m
JOIN member_memberships mm ON mm.member_id = m.id AND mm.status = 'active'
LEFT JOIN payments p ON p.member_id = m.id
WHERE mm.expiry_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 14 DAY)
ORDER BY days_left ASC;

-- Trainer performance analytics.
SELECT t.name, t.specialization, ROUND(AVG(ts.rating), 2) AS avg_rating,
       ROUND(AVG(ts.member_retention_score), 2) AS avg_retention
FROM trainers t
LEFT JOIN trainer_sessions ts ON ts.trainer_id = t.id
GROUP BY t.id, t.name, t.specialization;

-- Transaction demo.
CALL sp_renew_membership(3, 5, 24999.00);
