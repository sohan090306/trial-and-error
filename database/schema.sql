DROP DATABASE IF EXISTS nexafit_ai_gym;
CREATE DATABASE nexafit_ai_gym CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nexafit_ai_gym;

CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','trainer','member') NOT NULL,
  otp_hash VARCHAR(255),
  otp_expires_at DATETIME,
  last_login_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_users_role (role)
);

CREATE TABLE admins (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL UNIQUE,
  clearance_level ENUM('owner','manager','operator') DEFAULT 'manager',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE trainers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT UNIQUE,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  phone VARCHAR(30),
  specialization VARCHAR(160),
  bio TEXT,
  hourly_rate DECIMAL(10,2) DEFAULT 0,
  status ENUM('active','inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_trainers_specialization (specialization)
);

CREATE TABLE members (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT UNIQUE,
  trainer_id BIGINT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  phone VARCHAR(30),
  date_of_birth DATE,
  gender ENUM('male','female','other','prefer_not_to_say'),
  fitness_goal VARCHAR(120),
  body_type VARCHAR(60),
  emergency_contact VARCHAR(120),
  health_notes TEXT,
  profile_photo_url VARCHAR(500),
  status ENUM('active','inactive','expiring','suspended') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (trainer_id) REFERENCES trainers(id) ON DELETE SET NULL,
  INDEX idx_members_status_goal (status, fitness_goal),
  FULLTEXT INDEX ft_members_search (name, email, phone, fitness_goal)
);

CREATE TABLE memberships (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL UNIQUE,
  duration_days INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  tier ENUM('basic','pro','elite') DEFAULT 'basic',
  benefits JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE member_memberships (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  member_id BIGINT NOT NULL,
  membership_id BIGINT NOT NULL,
  joining_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  status ENUM('active','expired','upgraded','cancelled') DEFAULT 'active',
  renewal_of BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  FOREIGN KEY (membership_id) REFERENCES memberships(id),
  FOREIGN KEY (renewal_of) REFERENCES member_memberships(id),
  INDEX idx_member_memberships_expiry (expiry_date, status)
);

CREATE TABLE attendance (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  member_id BIGINT NOT NULL,
  check_in DATETIME NOT NULL,
  check_out DATETIME,
  method ENUM('qr','face','manual') NOT NULL,
  zone VARCHAR(80),
  confidence_score DECIMAL(5,2),
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  INDEX idx_attendance_member_date (member_id, check_in),
  INDEX idx_attendance_live (check_out, check_in)
);

CREATE TABLE exercises (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL UNIQUE,
  muscle_group VARCHAR(80) NOT NULL,
  equipment VARCHAR(80),
  difficulty ENUM('beginner','intermediate','advanced') DEFAULT 'beginner',
  form_cues TEXT,
  INDEX idx_exercises_muscle (muscle_group, difficulty)
);

CREATE TABLE workout_plans (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  member_id BIGINT NOT NULL,
  trainer_id BIGINT,
  title VARCHAR(160) NOT NULL,
  goal VARCHAR(120),
  ai_generated BOOLEAN DEFAULT FALSE,
  plan_json JSON NOT NULL,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  FOREIGN KEY (trainer_id) REFERENCES trainers(id) ON DELETE SET NULL,
  INDEX idx_workout_member_ai (member_id, ai_generated)
);

CREATE TABLE schedules (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  trainer_id BIGINT NOT NULL,
  member_id BIGINT,
  starts_at DATETIME NOT NULL,
  ends_at DATETIME NOT NULL,
  session_type VARCHAR(100),
  status ENUM('booked','completed','cancelled') DEFAULT 'booked',
  FOREIGN KEY (trainer_id) REFERENCES trainers(id) ON DELETE CASCADE,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE SET NULL,
  INDEX idx_schedules_trainer_time (trainer_id, starts_at)
);

CREATE TABLE trainer_sessions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  trainer_id BIGINT NOT NULL,
  member_id BIGINT NOT NULL,
  rating DECIMAL(3,2),
  member_retention_score DECIMAL(5,2),
  completed_at DATETIME NOT NULL,
  FOREIGN KEY (trainer_id) REFERENCES trainers(id),
  FOREIGN KEY (member_id) REFERENCES members(id)
);

CREATE TABLE diet_plans (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  member_id BIGINT NOT NULL,
  calories INT NOT NULL,
  macros_json JSON NOT NULL,
  meals_json JSON NOT NULL,
  ai_generated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

CREATE TABLE calorie_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  member_id BIGINT NOT NULL,
  calories INT NOT NULL,
  protein_g DECIMAL(6,2),
  carbs_g DECIMAL(6,2),
  fat_g DECIMAL(6,2),
  water_litres DECIMAL(4,2),
  logged_at DATETIME NOT NULL,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  INDEX idx_calorie_member_day (member_id, logged_at)
);

CREATE TABLE payments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  member_id BIGINT NOT NULL,
  membership_record_id BIGINT,
  amount DECIMAL(10,2) NOT NULL,
  method ENUM('cash','card','upi','online_simulation') DEFAULT 'online_simulation',
  status ENUM('pending','paid','failed','refunded') DEFAULT 'pending',
  invoice_no VARCHAR(40) UNIQUE,
  paid_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  FOREIGN KEY (membership_record_id) REFERENCES member_memberships(id),
  INDEX idx_payments_status_paid (status, paid_at)
);

CREATE TABLE notifications (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  member_id BIGINT,
  type ENUM('membership','payment','workout','achievement','ai_health','system') NOT NULL,
  title VARCHAR(160) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  INDEX idx_notifications_unread (is_read, created_at)
);

CREATE TABLE achievements (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL UNIQUE,
  badge VARCHAR(80) NOT NULL,
  xp_reward INT DEFAULT 0,
  criteria_json JSON NOT NULL
);

CREATE TABLE member_achievements (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  member_id BIGINT NOT NULL,
  achievement_id BIGINT NOT NULL,
  unlocked_at DATETIME NOT NULL,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  FOREIGN KEY (achievement_id) REFERENCES achievements(id),
  UNIQUE KEY uq_member_achievement (member_id, achievement_id)
);

CREATE TABLE fitness_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  member_id BIGINT NOT NULL,
  weight_kg DECIMAL(5,2),
  body_fat DECIMAL(5,2),
  bmi DECIMAL(5,2),
  bmr DECIMAL(7,2),
  performance_score DECIMAL(5,2),
  logged_at DATETIME NOT NULL,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  INDEX idx_fitness_member_time (member_id, logged_at)
);

CREATE TABLE ai_predictions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  member_id BIGINT,
  prediction_type ENUM('fatigue','crowd','future_body','diet','workout','retention') NOT NULL,
  input_json JSON NOT NULL,
  output_json JSON NOT NULL,
  confidence DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  INDEX idx_ai_predictions_type_time (prediction_type, created_at)
);

CREATE TABLE challenges (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(140) NOT NULL,
  challenge_type ENUM('streak','strength','calorie','attendance','rival') NOT NULL,
  starts_at DATETIME NOT NULL,
  ends_at DATETIME NOT NULL,
  reward_xp INT DEFAULT 0,
  rules_json JSON NOT NULL
);

CREATE TABLE leaderboard (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  member_id BIGINT NOT NULL,
  challenge_id BIGINT,
  xp INT DEFAULT 0,
  streak INT DEFAULT 0,
  rank_position INT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE SET NULL,
  INDEX idx_leaderboard_rank (rank_position, xp)
);

CREATE TABLE reports (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  report_type VARCHAR(80) NOT NULL,
  generated_by BIGINT,
  payload_json JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (generated_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE OR REPLACE VIEW vw_live_gym_occupancy AS
SELECT COUNT(*) AS live_count, GROUP_CONCAT(DISTINCT zone ORDER BY zone) AS active_zones
FROM attendance
WHERE DATE(check_in) = CURDATE() AND check_out IS NULL;

CREATE OR REPLACE VIEW vw_member_intelligence AS
SELECT
  m.id,
  m.name,
  m.fitness_goal,
  mm.expiry_date,
  DATEDIFF(mm.expiry_date, CURDATE()) AS days_to_expiry,
  COALESCE(lb.xp, 0) AS xp,
  COALESCE(lb.streak, 0) AS streak,
  MAX(fl.performance_score) AS best_performance
FROM members m
LEFT JOIN member_memberships mm ON mm.member_id = m.id AND mm.status = 'active'
LEFT JOIN leaderboard lb ON lb.member_id = m.id
LEFT JOIN fitness_logs fl ON fl.member_id = m.id
GROUP BY m.id, m.name, m.fitness_goal, mm.expiry_date, lb.xp, lb.streak;

DELIMITER //
CREATE TRIGGER trg_membership_expiry_notification
AFTER INSERT ON member_memberships
FOR EACH ROW
BEGIN
  IF DATEDIFF(NEW.expiry_date, CURDATE()) <= 7 THEN
    INSERT INTO notifications(member_id, type, title, message)
    VALUES(NEW.member_id, 'membership', 'Membership expiring soon', 'Your plan expires within 7 days. Renew to keep your streak alive.');
  END IF;
END//

CREATE TRIGGER trg_payment_invoice
BEFORE INSERT ON payments
FOR EACH ROW
BEGIN
  IF NEW.invoice_no IS NULL THEN
    SET NEW.invoice_no = CONCAT('NXF-', YEAR(CURDATE()), '-', LPAD(FLOOR(RAND() * 99999), 5, '0'));
  END IF;
END//

CREATE PROCEDURE sp_renew_membership(
  IN p_member_id BIGINT,
  IN p_membership_id BIGINT,
  IN p_amount DECIMAL(10,2)
)
BEGIN
  DECLARE v_days INT;
  DECLARE v_record_id BIGINT;
  START TRANSACTION;
    SELECT duration_days INTO v_days FROM memberships WHERE id = p_membership_id;
    UPDATE member_memberships SET status = 'expired'
    WHERE member_id = p_member_id AND status = 'active';
    INSERT INTO member_memberships(member_id, membership_id, joining_date, expiry_date, status)
    VALUES(p_member_id, p_membership_id, CURDATE(), DATE_ADD(CURDATE(), INTERVAL v_days DAY), 'active');
    SET v_record_id = LAST_INSERT_ID();
    INSERT INTO payments(member_id, membership_record_id, amount, status, paid_at)
    VALUES(p_member_id, v_record_id, p_amount, 'paid', NOW());
  COMMIT;
END//

CREATE PROCEDURE sp_peak_hour_analytics(IN p_date DATE)
BEGIN
  SELECT HOUR(check_in) AS gym_hour, COUNT(*) AS visits
  FROM attendance
  WHERE DATE(check_in) = p_date
  GROUP BY HOUR(check_in)
  ORDER BY visits DESC;
END//
DELIMITER ;
