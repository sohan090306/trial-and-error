import { env } from '../config/env.js';

async function postAI(path, payload) {
  try {
    const response = await fetch(`${env.aiServiceUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`AI service ${response.status}`);
    return await response.json();
  } catch {
    return null;
  }
}

export async function generateWorkout(profile) {
  const ai = await postAI('/api/ai/workout', profile);
  return ai || {
    title: `${profile.goal || 'Adaptive'} Neural Training Protocol`,
    split: ['Push strength', 'Pull hypertrophy', 'Leg power', 'Mobility recovery'],
    exercises: [
      { name: 'Barbell Squat', sets: 4, reps: '6-8', intensity: 'RPE 8' },
      { name: 'Incline Dumbbell Press', sets: 4, reps: '8-10', intensity: 'RPE 7' },
      { name: 'Cable Row', sets: 3, reps: '10-12', intensity: 'RPE 7' },
      { name: 'Zone 2 Bike', sets: 1, reps: '18 min', intensity: '65% HR max' }
    ],
    recoveryScore: 84
  };
}

export async function generateDiet(profile) {
  const ai = await postAI('/api/ai/diet', profile);
  return ai || {
    calories: Math.round((profile.weight || 70) * 32),
    macros: { protein: 160, carbs: 245, fat: 72 },
    meals: ['Oats + whey + berries', 'Paneer quinoa bowl', 'Chicken rice plate', 'Greek yogurt + nuts'],
    hydrationLitres: 3.2
  };
}

export async function predictFatigue(payload) {
  const ai = await postAI('/api/ai/fatigue', payload);
  return ai || {
    fatigueLevel: payload.attendanceConsistency < 55 ? 'high' : 'moderate',
    overtrainingRisk: payload.intensity > 85 ? 72 : 34,
    recoveryScore: Math.max(38, 100 - Math.round(payload.intensity * 0.6)),
    recommendation: 'Reduce volume by 15% and prioritize sleep for the next 48 hours.'
  };
}
