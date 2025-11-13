# ☀️ Solar AI Forecast

> **Smart Solar Power Prediction Dashboard**  
> Intelligent solar energy forecasting using Machine Learning & real-time data analytics

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-000000.svg)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎯 Overview

Solar AI Forecast is a full-stack web application that predicts solar power generation using environmental parameters. It combines **Machine Learning** with an intuitive dashboard to provide accurate DC power forecasts, system efficiency insights, and comprehensive analytics.

**Key Prediction Factors:**
- 🌡️ Ambient Temperature
- 🔥 Module Temperature  
- ☀️ Solar Irradiation
- 🕐 Time-based Features (Hour, Day)

---

## ✨ Features

### 🧠 Machine Learning
- **Random Forest Regressor** with feature engineering
- Real-time power generation predictions
- Model evaluation metrics (MAE, RMSE, R²)

### 📊 Analytics Dashboard
- **Hourly Power Trends** — Interactive bar charts
- **Historical vs Predicted** — Comparative line graphs
- **Temperature vs Efficiency** — Dual-axis correlations
- **System Efficiency Cards** — Live performance metrics

### 🛠️ Functionality
- CSV report download for data analysis
- RESTful API with CORS support
- Responsive design for all devices
- Real-time data visualization

---

## 🏗️ Architecture

```
solar-ai-forecast/
├── backend/
│   ├── app.py                 # Flask API server
│   ├── model/
│   │   └── solar_model.pkl    # Trained ML model
│   ├── data/
│   │   └── solar_data.csv     # Training dataset
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.jsx
    │   │   └── Charts.jsx
    │   └── App.jsx
    └── package.json
```

---

## 🚀 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React.js, Tailwind CSS, Recharts, Lucide Icons |
| **Backend** | Flask, Pandas, Scikit-learn, Joblib |
| **ML Model** | Random Forest Regressor |
| **Tools** | PapaParse, File-Saver, CORS |

---

## 📈 Model Performance

The Random Forest model achieves excellent accuracy on solar power prediction:

| Metric | Value | Interpretation |
|--------|-------|----------------|
| **MAE** | 12.43 | Average prediction error |
| **RMSE** | 18.76 | Root mean square error |
| **R² Score** | **0.875** | ⭐ Explains 87.5% of variance |

> **Note:** High R² score indicates the model reliably predicts solar power generation patterns.

---

## 🔧 Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/Dubey411/solar-ai-forecast.git
cd solar-ai-forecast/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run Flask server
python app.py
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🔌 API Endpoints

### Prediction
```http
POST /api/predict/manual
Content-Type: application/json

{
  "ambient_temp": 28.5,
  "module_temp": 32.0,
  "irradiation": 800,
  "hour": 12,
  "day": 180
}
```

**Response:**
```json
{
  "predictions": [
    {
      "hour": 12,
      "predicted_power": 4.2,
      "actual_power": 4.0,
      "module_temp": 32.0,
      "efficiency": 95.2
    }
  ],
  "system_efficiency": 94.8
}
```

### Model Evaluation
```http
GET /api/evaluate
```

**Response:**
```json
{
  "mae": 12.43,
  "rmse": 18.76,
  "r2_score": 0.875
}
```

### Health Check
```http
GET /
```

---

## 💻 Usage Example

### Manual Prediction (Python)

```python
import requests

url = "http://localhost:5000/api/predict/manual"
data = {
    "ambient_temp": 30,
    "module_temp": 35,
    "irradiation": 850,
    "hour": 14,
    "day": 200
}

response = requests.post(url, json=data)
print(response.json())
```

### Model Training Code

```python
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)

print(f"MAE: {mae:.2f}")
print(f"RMSE: {rmse:.2f}")
print(f"R² Score: {r2:.3f}")
```

---

## 📊 Dashboard Preview

The web interface provides:

✅ **Real-time Predictions** — Live solar power forecasts  
✅ **Visual Analytics** — Interactive charts and graphs  
✅ **Performance Metrics** — System efficiency tracking  
✅ **Export Options** — Download CSV reports  
✅ **Responsive Design** — Works on mobile and desktop  

---

## 🔮 Future Enhancements

- [ ] Integrate live weather API (OpenWeatherMap)
- [ ] Battery storage and inverter efficiency modeling
- [ ] AI-based anomaly detection for panel faults
- [ ] Multi-day forecasting with LSTM networks
- [ ] Cloud deployment (AWS/Render/Railway)
- [ ] User authentication and data persistence
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Shubham Dubey**  
Full-Stack Developer | AI/ML Enthusiast | MERN Stack  

📧 Email: [shubh6949@gmail.com](mailto:shubh6949@gmail.com)  
🔗 GitHub: [@Dubey411](https://github.com/Dubey411)  
💼 LinkedIn: [Connect with me](https://linkedin.com/in/shubham-dubey)

---

## 🙏 Acknowledgments

- Scikit-learn for ML framework
- React community for frontend tools
- Flask for backend simplicity
- All contributors and supporters

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ and ☀️ by Shubham Dubey

</div>
