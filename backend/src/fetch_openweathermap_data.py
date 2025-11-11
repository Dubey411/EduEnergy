import requests
import json
import pandas as pd
from datetime import datetime
import os

# 🌍 Load config file
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
config_path = os.path.join(base_dir, "config", "api_config.json")

with open(config_path, "r") as f:
    config = json.load(f)

API_KEY = config["api_key"]
CITY = config["city"]
COUNTRY = config["country"]

# ☀️ Fetch live weather data from OpenWeatherMap API
url = f"https://api.openweathermap.org/data/2.5/weather?q={CITY},{COUNTRY}&appid={API_KEY}&units=metric"
response = requests.get(url)
data = response.json()

# 🕒 Extract current time and weather info
now = datetime.now()

weather_dict = {
    "DATE_TIME": now.strftime("%Y-%m-%d %H:%M:%S"),
    "AMBIENT_TEMPERATURE": data["main"]["temp"],
    "MODULE_TEMPERATURE": data["main"]["feels_like"],  # proxy for solar panel temp
    "IRRADIATION": 100 - data["clouds"]["all"],        # inverse of cloudiness → sunlight level
    "HOUR": now.hour,
    "DAY_OF_YEAR": now.timetuple().tm_yday
}

# 💾 Create DataFrame and save
output_dir = os.path.join(base_dir, "data", "weather_api")
os.makedirs(output_dir, exist_ok=True)

df = pd.DataFrame([weather_dict])
df.to_csv(os.path.join(output_dir, "live_weather_data.csv"), index=False)

print("✅ Live weather data fetched successfully!")
print(df)
