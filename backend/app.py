



from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import pandas as pd
import joblib
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# ✅ 1. API for live data prediction (optional)
@app.route('/api/predict', methods=['GET'])
def predict_solar_power():
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        weather_path = os.path.join(base_dir, "data", "weather_api", "live_weather_data.csv")
        weather_df = pd.read_csv(weather_path)

        model_path = os.path.join(base_dir, "models", "model.pkl")
        scaler_path = os.path.join(base_dir, "models", "scaler.pkl")

        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)

        features = ['AMBIENT_TEMPERATURE', 'MODULE_TEMPERATURE', 'IRRADIATION', 'HOUR', 'DAY_OF_YEAR']
        X_live = weather_df[features]
        X_scaled = scaler.transform(X_live)
        prediction = model.predict(X_scaled)[0]

        result = {
            "datetime": str(weather_df['DATE_TIME'][0]),
            "ambient_temp": float(weather_df['AMBIENT_TEMPERATURE'][0]),
            "module_temp": float(weather_df['MODULE_TEMPERATURE'][0]),
            "irradiation": float(weather_df['IRRADIATION'][0]),
            "predicted_dc_power": float(prediction)
        }
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)})


# ✅ 2. API for manual input and hourly predictions
@app.route('/api/predict/manual', methods=['POST'])
def manual_prediction():
    try:
        data = request.get_json()
        amb = float(data.get("ambient_temp", 25))
        mod = float(data.get("module_temp", 28))
        irr = float(data.get("irradiation", 80))

        base_power = irr * 0.01
        hourly_predictions = []
        for h in [8, 10, 12, 14, 16, 18]:
            predicted = base_power * (0.6 + 0.1 * (h % 5))
            actual = predicted * (0.9 + 0.05 * ((h % 3) - 1))  # simulate real data
            eff = (predicted / (irr * 0.01)) * 100
            hourly_predictions.append({
                "hour": h,
                "predicted_power": round(predicted, 2),
                "actual_power": round(actual, 2),
                "module_temp": mod + (h % 5),
                "efficiency": round(eff, 2)
            })

        efficiency = sum(d["efficiency"] for d in hourly_predictions) / len(hourly_predictions)

        return jsonify({
            "predictions": hourly_predictions,
            "system_efficiency": round(efficiency, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/evaluate', methods=['GET'])
def evaluate_model():
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        data_path = os.path.join(base_dir, "data", "solar_data.csv")

        df = pd.read_csv(data_path)
        features = ['AMBIENT_TEMPERATURE', 'MODULE_TEMPERATURE', 'IRRADIATION', 'HOUR', 'DAY_OF_YEAR']
        target = 'DC_POWER'

        X = df[features]
        y = df[target]

        model_path = os.path.join(base_dir, "models", "model.pkl")
        scaler_path = os.path.join(base_dir, "models", "scaler.pkl")
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)

        X_scaled = scaler.transform(X)
        y_pred = model.predict(X_scaled)

        mae = mean_absolute_error(y, y_pred)
        rmse = np.sqrt(mean_squared_error(y, y_pred))
        r2 = r2_score(y, y_pred)

        return jsonify({
            "MAE": round(mae, 3),
            "RMSE": round(rmse, 3),
            "R2_Score": round(r2, 3),
            "status": "✅ Model evaluation successful"
        })
    except Exception as e:
        return jsonify({"error": str(e)})

# ✅ 3. Root route
@app.route('/')
def home():
    return jsonify({"message": "☀️ Solar AI Forecast Backend Running!"})


if __name__ == "__main__":
    app.run(debug=True)
