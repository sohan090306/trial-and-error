import { body } from 'express-validator';
import { asyncHandler } from '../utils/apiError.js';
import { generateWorkout, generateDiet, predictFatigue } from '../services/aiClient.js';

export const profileRules = [
  body('age').optional().isNumeric(),
  body('weight').optional().isNumeric(),
  body('goal').optional().isString(),
  body('experience').optional().isString()
];

export const workout = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await generateWorkout(req.body) });
});

export const diet = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await generateDiet(req.body) });
});

export const fatigue = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await predictFatigue(req.body) });
});

export const chatbot = asyncHandler(async (req, res) => {
  const text = String(req.body.message || '').toLowerCase();
  let answer = 'I can build workouts, diet plans, recovery alerts, and crowd predictions from your fitness profile.';
  if (text.includes('chest')) answer = 'Run incline press, flat dumbbell press, cable fly, weighted dips, and push-up burnout. Keep 90 seconds rest and stop at RPE 8.';
  if (text.includes('calorie')) answer = 'For fat loss, start near bodyweight in kg x 28 calories, keep protein at 1.8-2.2 g/kg, and adjust every 14 days.';
  if (text.includes('fat loss')) answer = 'The best fat-loss plan combines 3 strength days, 2 zone-2 cardio days, a 400-calorie deficit, high protein, and 8k steps.';
  res.json({ success: true, data: { answer } });
});
