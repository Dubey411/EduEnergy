# import pandas as pd
# import joblib
# import os
# from datetime import datetime
# import matplotlib.pyplot as plt

# MODEL_PATH = "../models/model.pkl"
# SCALER_PATH = "../models/scaler.pkl"
# LIVE_DATA_PATH = "../data/weather_api/live_weather_data.csv"


# model = joblib.load(MODEL_PATH)
# scaler = joblib.load(SCALER_PATH)


# df = pd.read_csv(LIVE_DATA_PATH)


# features = ['AMBIENT_TEMPERATURE', 'MODULE_TEMPERATURE', 'IRRADIATION', 'HOUR', 'DAY_OF_YEAR']


# df = df[features].fillna(0)


# X_scaled = scaler.transform(df)


# predicted_power = model.predict(X_scaled)[0]


# print("⚡ Real-Time Solar Power Prediction ⚡")
# print(f"Date & Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
# print(f"Predicted DC Power Output: {predicted_power:.2f} W")
# plt.figure(figsize=(5,3))
# plt.bar(["Predicted DC Power"], [predicted_power], color='orange')
# plt.ylabel("Power (W)")
# plt.title("Real-Time Solar Power Prediction")
# plt.show()



# import pandas as pd
# import joblib
# import json

# def predict_from_live_data():
#     """
#     Fetch latest weather data from CSV,
#     scale features, and predict solar DC power output.
#     """

#     # Load model and scaler
#     model = joblib.load("models/model.pkl")
#     scaler = joblib.load("models/scaler.pkl")

#     # Read latest weather data
#     df = pd.read_csv("data/weather_api/live_weather_data.csv")

#     # Ensure feature alignment
#     features = ['AMBIENT_TEMPERATURE', 'MODULE_TEMPERATURE', 'IRRADIATION', 'HOUR', 'DAY_OF_YEAR']
#     X_scaled = scaler.transform(df[features])

#     # Predict DC Power
#     prediction = model.predict(X_scaled)[0]

#     result = {
#         "predicted_power": round(prediction, 2),
#         "unit": "Watt",
#         "message": "✅ Solar DC Power Predicted Successfully!"
#     }

#     # Optional: Save prediction
#     pd.DataFrame([result]).to_csv("data/processed/latest_prediction.csv", index=False)

#     # Return JSON (for API or frontend)
#     return json.dumps(result)



import pandas as pd
import joblib
import numpy as np

def predict_from_live_data():
    """
    Fetch latest weather data from CSV,
    scale features, and predict solar DC power output.
    """

    # Load model and scaler
    model = joblib.load("models/model.pkl")
    scaler = joblib.load("models/scaler.pkl")

    # Read latest weather data
    df = pd.read_csv("data/weather_api/live_weather_data.csv")

    # Ensure feature alignment
    features = ['AMBIENT_TEMPERATURE', 'MODULE_TEMPERATURE', 'IRRADIATION', 'HOUR', 'DAY_OF_YEAR']
    X_scaled = scaler.transform(df[features])

    # Predict DC Power
    prediction = model.predict(X_scaled)[0]

    # Convert numpy types to native Python types
    result = {
        "predicted_power": float(round(prediction, 2)),
        "unit": "Watt",
        "message": "✅ Solar DC Power Predicted Successfully!"
    }

    # Optional: Save prediction
    pd.DataFrame([result]).to_csv("data/processed/latest_prediction.csv", index=False)

    # ✅ Return dict (NOT JSON string) so Flask jsonify() can handle it safely
    return result
