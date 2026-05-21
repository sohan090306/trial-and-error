import math
from datetime import datetime


def workout_plan(profile):
    goal = profile.get("goal", "hybrid strength")
    experience = profile.get("experience", "intermediate")
    intensity = {"beginner": "RPE 6-7", "intermediate": "RPE 7-8", "advanced": "RPE 8-9"}.get(experience, "RPE 7-8")
    return {
        "title": f"AI {goal.title()} Protocol",
        "split": ["Neural warmup", "Prime lift", "Accessory density", "Metabolic finisher", "Recovery scan"],
        "exercises": [
            {"name": "Trap Bar Deadlift", "sets": 4, "reps": "5", "intensity": intensity},
            {"name": "Incline Press", "sets": 4, "reps": "8", "intensity": intensity},
            {"name": "Lat Pulldown", "sets": 3, "reps": "10-12", "intensity": "controlled tempo"},
            {"name": "Sled Push", "sets": 6, "reps": "20 m", "intensity": "explosive"},
        ],
        "recoveryScore": 86,
        "generatedAt": datetime.utcnow().isoformat() + "Z",
    }


def diet_plan(profile):
    weight = float(profile.get("weight") or 70)
    goal = str(profile.get("goal") or "").lower()
    multiplier = 28 if "loss" in goal else 34 if "muscle" in goal else 31
    calories = round(weight * multiplier)
    protein = round(weight * 2.0)
    fat = round(weight * 0.9)
    carbs = round((calories - (protein * 4 + fat * 9)) / 4)
    return {
        "calories": calories,
        "macros": {"protein": protein, "carbs": max(carbs, 80), "fat": fat},
        "meals": [
            "Protein oats, banana, chia",
            "Grilled paneer/chicken, rice, greens",
            "Whey smoothie, peanuts, berries",
            "Dal, roti, curd, salad",
        ],
        "supplements": ["Creatine monohydrate 3-5 g", "Vitamin D if deficient"],
        "hydrationLitres": round(weight * 0.045, 1),
    }


def fatigue_detection(payload):
    consistency = float(payload.get("attendanceConsistency") or 70)
    intensity = float(payload.get("intensity") or 65)
    sleep = float(payload.get("sleepHours") or 7)
    risk = min(99, max(1, (intensity * 0.65) + ((100 - consistency) * 0.25) + ((8 - sleep) * 6)))
    return {
        "fatigueLevel": "high" if risk > 70 else "moderate" if risk > 42 else "low",
        "overtrainingRisk": round(risk),
        "recoveryScore": round(100 - risk * 0.72),
        "recommendation": "Lower training volume and add mobility work." if risk > 70 else "Keep progressive overload steady.",
    }


def crowd_prediction(payload):
    hour = int(payload.get("hour") or datetime.now().hour)
    crowd = 45 + 35 * math.sin((hour - 14) / 24 * math.pi * 2)
    return {
        "hour": hour,
        "crowdScore": round(max(8, min(98, crowd))),
        "leastCrowdedHours": ["06:00", "13:00", "22:00"],
        "machineAvailability": "high" if crowd < 40 else "medium" if crowd < 70 else "low",
    }


def future_body_prediction(profile):
    consistency = float(profile.get("consistency") or 82) / 100
    current_weight = float(profile.get("weight") or 75)
    return {
        "30Days": {"weight": round(current_weight - 1.8 * consistency, 1), "aura": round(72 + 8 * consistency)},
        "90Days": {"weight": round(current_weight - 5.4 * consistency, 1), "aura": round(78 + 13 * consistency)},
        "180Days": {"weight": round(current_weight - 9.5 * consistency, 1), "aura": round(84 + 15 * consistency)},
    }
