USE nexafit_ai_gym;

INSERT INTO users(name, email, password_hash, role) VALUES
('Admin Commander','admin@nexafit.local','$2a$10$KxYdemoHashForDocsOnly','admin'),
('Rhea Kapoor','trainer@nexafit.local','$2a$10$KxYdemoHashForDocsOnly','trainer'),
('Aarav Mehta','member@nexafit.local','$2a$10$KxYdemoHashForDocsOnly','member');

INSERT INTO admins(user_id, clearance_level) VALUES (1, 'owner');

INSERT INTO trainers(user_id, name, email, phone, specialization, hourly_rate) VALUES
(2,'Rhea Kapoor','rhea@nexafit.local','+91 98000 10001','Strength and Mobility',1800),
(NULL,'Kabir Sethi','kabir@nexafit.local','+91 98000 10002','Fat Loss and HIIT',1600),
(NULL,'Naina Rao','naina@nexafit.local','+91 98000 10003','Yoga Recovery',1400);

INSERT INTO members(user_id, trainer_id, name, email, phone, date_of_birth, gender, fitness_goal, body_type, emergency_contact, health_notes, status) VALUES
(3,1,'Aarav Mehta','aarav@nexafit.local','+91 98765 11001','2002-04-08','male','Hypertrophy','mesomorph','Neha Mehta +91 99999 88888','No injuries','active'),
(NULL,2,'Mira Shah','mira@nexafit.local','+91 98765 11002','2001-11-21','female','Fat Loss','endomorph','Dev Shah +91 99999 77777','Mild asthma','active'),
(NULL,1,'Dev Iyer','dev@nexafit.local','+91 98765 11003','2003-01-16','male','Athletic Performance','ectomorph','Ravi Iyer +91 99999 66666','Knee rehab','expiring');

INSERT INTO memberships(name, duration_days, price, tier, benefits) VALUES
('Monthly',30,2499,'basic',JSON_ARRAY('Gym access','Basic analytics')),
('Quarterly',90,6499,'pro',JSON_ARRAY('Trainer review','AI plans')),
('Half-Yearly',180,11999,'pro',JSON_ARRAY('Nutrition tracking','Smart mirror')),
('Yearly',365,19999,'elite',JSON_ARRAY('Full AI suite','Priority booking')),
('Premium Elite',365,24999,'elite',JSON_ARRAY('Digital twin','Rival system','Recovery coaching'));

INSERT INTO member_memberships(member_id, membership_id, joining_date, expiry_date, status) VALUES
(1,5,'2026-01-01','2026-12-31','active'),
(2,4,'2026-02-15','2027-02-14','active'),
(3,2,'2026-02-26','2026-05-27','active');

INSERT INTO exercises(name, muscle_group, equipment, difficulty, form_cues) VALUES
('Barbell Squat','Legs','Barbell','intermediate','Brace core, knees track over toes'),
('Incline Dumbbell Press','Chest','Dumbbells','intermediate','Scapula set, controlled eccentric'),
('Lat Pulldown','Back','Cable','beginner','Drive elbows down, avoid swinging'),
('Romanian Deadlift','Hamstrings','Barbell','intermediate','Hinge hips, neutral spine'),
('Battle Ropes','Conditioning','Ropes','beginner','Relax shoulders, rhythmic waves');

INSERT INTO workout_plans(member_id, trainer_id, title, goal, ai_generated, plan_json, start_date, end_date) VALUES
(1,1,'Hypertrophy Neural Block','Hypertrophy',TRUE,JSON_OBJECT('days',4,'focus','progressive overload'),'2026-05-01','2026-06-01'),
(2,2,'Fat Loss Ignite','Fat Loss',TRUE,JSON_OBJECT('days',5,'focus','strength plus zone 2'),'2026-05-01','2026-06-01');

INSERT INTO attendance(member_id, check_in, check_out, method, zone, confidence_score) VALUES
(1,NOW() - INTERVAL 2 HOUR,NULL,'face','Strength Deck',97.50),
(2,NOW() - INTERVAL 1 HOUR,NULL,'qr','Cardio Orbit',100.00),
(3,NOW() - INTERVAL 1 DAY,NOW() - INTERVAL 23 HOUR,'qr','Recovery Lab',100.00);

INSERT INTO payments(member_id, membership_record_id, amount, method, status, paid_at) VALUES
(1,1,24999,'upi','paid','2026-01-01 09:30:00'),
(2,2,19999,'card','paid','2026-02-15 18:10:00'),
(3,3,6499,'online_simulation','paid','2026-02-26 07:45:00');

INSERT INTO diet_plans(member_id, calories, macros_json, meals_json, ai_generated) VALUES
(1,2850,JSON_OBJECT('protein',170,'carbs',340,'fat',80),JSON_ARRAY('oats','chicken rice','paneer bowl'),TRUE),
(2,1900,JSON_OBJECT('protein',130,'carbs',190,'fat',60),JSON_ARRAY('eggs','dal rice','curd bowl'),TRUE);

INSERT INTO calorie_logs(member_id, calories, protein_g, carbs_g, fat_g, water_litres, logged_at) VALUES
(1,2760,166,320,78,3.6,NOW()),
(2,1840,128,180,58,3.0,NOW());

INSERT INTO achievements(name, badge, xp_reward, criteria_json) VALUES
('30 Day Streak','streak-core',1500,JSON_OBJECT('streak',30)),
('Iron Discipline','aura-gold',2200,JSON_OBJECT('attendanceConsistency',90)),
('Recovery Master','recovery-blue',1200,JSON_OBJECT('recoveryScore',85));

INSERT INTO challenges(name, challenge_type, starts_at, ends_at, reward_xp, rules_json) VALUES
('May Neural Sprint','attendance','2026-05-01','2026-05-31',2500,JSON_OBJECT('minimumVisits',20)),
('Rival Lift-Off','rival','2026-05-20','2026-05-27',900,JSON_OBJECT('metric','volume_load'));

INSERT INTO leaderboard(member_id, challenge_id, xp, streak, rank_position) VALUES
(1,1,12840,31,1),
(2,1,10120,18,2),
(3,1,7340,9,3);

INSERT INTO fitness_logs(member_id, weight_kg, body_fat, bmi, bmr, performance_score, logged_at) VALUES
(1,76.4,14.2,23.1,1780,91,NOW()),
(2,64.2,24.5,24.0,1390,86,NOW()),
(3,70.8,18.1,22.8,1655,78,NOW());

INSERT INTO ai_predictions(member_id, prediction_type, input_json, output_json, confidence) VALUES
(1,'future_body',JSON_OBJECT('days',90),JSON_OBJECT('weightDelta',-3.8,'muscleGain',2.1),91.5),
(2,'fatigue',JSON_OBJECT('intensity',82),JSON_OBJECT('risk','moderate','recoveryScore',72),84.0);
