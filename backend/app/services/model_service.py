import os
import pickle
import numpy as np
from app.schemas.prediction_schema import PredictionRequest

# Get base directory → backend/app/services
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Move one level up → backend/app
APP_DIR = os.path.abspath(os.path.join(BASE_DIR, ".."))

# Correct model path
MODEL_PATH = os.path.join(APP_DIR, "models", "ml_model.pkl")

# Load model
with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

def predict(payload):
    # Convert pydantic model to dict
    data = payload.dict()

    # Example: simple sum model (replace with your real model)
    feature_values = [
        data["feature1"],
        data["feature2"],
        data["feature3"],
        data["feature4"]
    ]

    prediction = sum(feature_values)
    return float(prediction)
