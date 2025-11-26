from pydantic import BaseModel

# Input features for prediction
class PredictionRequest(BaseModel):
    feature1: float
    feature2: float
    feature3: float
    feature4: float

# Output response
class PredictionResponse(BaseModel):
    prediction: float
