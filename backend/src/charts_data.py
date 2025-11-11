from flask import jsonify
import pandas as pd

def get_charts_summary():
    try:
        df = pd.read_csv("data/processed/latest_prediction.csv")
    except FileNotFoundError:
        # Return dummy data instead of error
        return [
            {"name": "Ambient Temp", "value": 25.0},
            {"name": "Module Temp", "value": 28.0},
            {"name": "Irradiation", "value": 80.0},
            {"name": "Predicted Power", "value": 150.0},
        ]

    chart_data = [
        {"name": "Ambient Temp", "value": float(df.get("ambient_temp", [25])[0])},
        {"name": "Module Temp", "value": float(df.get("module_temp", [28])[0])},
        {"name": "Irradiation", "value": float(df.get("irradiation", [80])[0])},
        {"name": "Predicted Power", "value": float(df.get("predicted_power", [150])[0])},
    ]
    return chart_data
