import joblib

# Load once (GLOBAL)
model = joblib.load("models/model.pkl")
scaler = joblib.load("models/scaler.pkl")

FEATURES = ["AMBIENT_TEMPERATURE", "MODULE_TEMPERATURE", "IRRADIATION", "HOUR", "DAY_OF_YEAR"]

def get_model():
    return model, scaler, FEATURES
