from fastapi import APIRouter
from app.schemas.prediction_schema import PredictionRequest, PredictionResponse
from app.services.model_service import predict

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
def ml_predict(payload: PredictionRequest):
    result = predict(payload)
    return PredictionResponse(prediction=result)
