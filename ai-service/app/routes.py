from flask import Blueprint, request

from .engine import (
    crowd_prediction,
    diet_plan,
    fatigue_detection,
    future_body_prediction,
    workout_plan,
)

ai = Blueprint("ai", __name__)


@ai.post("/workout")
def workout():
    return workout_plan(request.json or {})


@ai.post("/diet")
def diet():
    return diet_plan(request.json or {})


@ai.post("/fatigue")
def fatigue():
    return fatigue_detection(request.json or {})


@ai.post("/crowd")
def crowd():
    return crowd_prediction(request.json or {})


@ai.post("/future-body")
def future_body():
    return future_body_prediction(request.json or {})
