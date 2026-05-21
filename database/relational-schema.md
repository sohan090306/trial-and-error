# Relational Schema

`users(id, name, email, password_hash, role, otp_hash, otp_expires_at, last_login_at, created_at)`

`admins(id, user_id, clearance_level)`

`trainers(id, user_id, name, email, phone, specialization, bio, hourly_rate, status, created_at)`

`members(id, user_id, trainer_id, name, email, phone, date_of_birth, gender, fitness_goal, body_type, emergency_contact, health_notes, profile_photo_url, status, created_at, updated_at)`

`memberships(id, name, duration_days, price, tier, benefits)`

`member_memberships(id, member_id, membership_id, joining_date, expiry_date, status, renewal_of, created_at)`

`attendance(id, member_id, check_in, check_out, method, zone, confidence_score)`

`exercises(id, name, muscle_group, equipment, difficulty, form_cues)`

`workout_plans(id, member_id, trainer_id, title, goal, ai_generated, plan_json, start_date, end_date, created_at)`

`payments(id, member_id, membership_record_id, amount, method, status, invoice_no, paid_at, created_at)`

`diet_plans(id, member_id, calories, macros_json, meals_json, ai_generated, created_at)`

`calorie_logs(id, member_id, calories, protein_g, carbs_g, fat_g, water_litres, logged_at)`

`achievements(id, name, badge, xp_reward, criteria_json)`

`ai_predictions(id, member_id, prediction_type, input_json, output_json, confidence, created_at)`

`challenges(id, name, challenge_type, starts_at, ends_at, reward_xp, rules_json)`

`leaderboard(id, member_id, challenge_id, xp, streak, rank_position, updated_at)`

`reports(id, report_type, generated_by, payload_json, created_at)`
