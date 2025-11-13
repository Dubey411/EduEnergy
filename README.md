☀️ Solar AI Forecast – Smart Solar Power Prediction Dashboard
⚡ Intelligent Solar Energy Prediction using Machine Learning & Real-Time Data
🧠 Overview

Solar AI Forecast is a smart web-based dashboard designed to predict solar power generation (DC Power) using environmental parameters like ambient temperature, module temperature, and solar irradiation.
It combines Machine Learning (Random Forest Regressor) with a clean React + Tailwind frontend and a Flask backend, offering accurate predictions, system efficiency visualization, and graphical analytics.

🚀 Key Features

✅ Machine Learning-based Power Prediction using Random Forest
✅ Dynamic Graphs — Hourly power trends, temperature vs efficiency, historical vs predicted
✅ System Efficiency Estimation for better panel performance insight
✅ CSV Report Download option for analysis
✅ Evaluation Metrics API (MAE, RMSE, R² Score) to verify model accuracy
✅ Responsive UI built with React + Tailwind CSS
✅ CORS-enabled Flask API for smooth frontend-backend communication

🧩 Tech Stack
Layer	Technologies
Frontend	React.js, Tailwind CSS, Recharts.js, Lucide Icons
Backend	Flask, Pandas, Scikit-learn, Joblib
ML Model	RandomForestRegressor (Scikit-learn)
Data Format	CSV (solar data, weather data)
Other Tools	PapaParse, File-Saver (for CSV download)
🧮 Machine Learning Model

The project uses RandomForestRegressor trained on solar generation data, with features like:

🌡️ Ambient Temperature

🔥 Module Temperature

☀️ Solar Irradiation

🕓 Hour of Day

📅 Day of Year

Model Evaluation (Sample Results):

✅ MAE  : 12.43
✅ RMSE : 18.76
✅ R² Score : 0.875  ← Excellent Accuracy


💡 A high R² score indicates the model explains most of the variance in power generation — meaning predictions are reliable.

📊 Visual Analytics Dashboard

Your dashboard shows:

Hourly Predicted Power (Bar Chart)

Historical vs Predicted Power (Line Chart)

Temperature vs Efficiency Trend (Dual Axis Line Chart)

Efficiency & Irradiation Cards

Download as CSV button for reports

🧰 Installation & Setup
🖥️ Clone the Repository
git clone https://github.com/your-username/solar-ai-forecast.git
cd solar-ai-forecast

📦 Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate      # For Windows
source venv/bin/activate   # For Mac/Linux

pip install -r requirements.txt


Start the Flask Server

python app.py

💻 Frontend Setup
cd frontend
npm install
npm run dev


Runs the React app on http://localhost:5173
Flask API runs on http://localhost:5000

🧪 API Endpoints
Endpoint	Method	Description
/api/predict/manual	POST	Predict solar power based on input
/api/predict	GET	Fetch live solar prediction (optional)
/api/evaluate	GET	Evaluate ML model (MAE, RMSE, R²)
/	GET	Server health check
📈 Sample Output

Prediction Example:

{
  "predictions": [
    {"hour": 8, "predicted_power": 2.5, "actual_power": 2.3, "module_temp": 29, "efficiency": 91.6},
    {"hour": 10, "predicted_power": 4.1, "actual_power": 4.0, "module_temp": 30, "efficiency": 93.2}
  ],
  "system_efficiency": 92.1
}

🧠 Model Evaluation Code Snippet
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)

print("MAE:", mae)
print("RMSE:", rmse)
print("R²:", r2)

📚 Future Enhancements

🔹 Integrate real-time weather API (OpenWeatherMap)
🔹 Add battery & inverter efficiency modeling
🔹 Introduce AI-based anomaly detection for faulty panels
🔹 Deploy on Render / Railway / AWS EC2

👨‍💻 Author

Shubham Dubey
🌐 Frontend & Backend Developer | AI Enthusiast | MERN & ML Learner
📧 shubh6949@gmail.com

🔗 GitHub: Dubey411
