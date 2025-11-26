import pickle

dummy_model = {"model": "dummy-analytics-model", "version": 1.0}

with open("ml_model.pkl", "wb") as f:
    pickle.dump(dummy_model, f)

print("Dummy model created successfully!")
