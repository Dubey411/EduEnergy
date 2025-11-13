import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Sun,
  Zap,
  Target,
  Download,
  TrendingUp,
  Thermometer,
} from "lucide-react";
import Papa from "papaparse";

export default function SolarDashboard() {
  const [irradiation, setIrradiation] = useState("");
  const [ambient, setAmbient] = useState("");
  const [moduleTemp, setModuleTemp] = useState("");
  const [data, setData] = useState([]);
  const [efficiency, setEfficiency] = useState(null);
  const [predictedPower, setPredictedPower] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const API_BASE =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://eduenergy-2.onrender.com";

  const handlePredict = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/predict/manual`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ambient_temp: ambient,
          module_temp: moduleTemp,
          irradiation: irradiation,
        }),
      });

      const result = await res.json();

      setData(result.predictions);
      setEfficiency(result.system_efficiency);
      setPredictedPower(result.predictions?.[0]?.predicted_power?.toFixed(2));
      setShowResults(true);
    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handlePredict = async () => {
  //   setIsLoading(true);
  //   try {
  //     // const res = await fetch("http://localhost:5000/api/predict/manual", {
  //     const res = await fetch("https://eduenergy-backend.onrender.com/api/predict/manual", {

  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         ambient_temp: ambient,
  //         module_temp: moduleTemp,
  //         irradiation: irradiation,
  //       }),
  //     });
  //     const result = await res.json();

  //     setData(result.predictions);
  //     setEfficiency(result.system_efficiency);
  //     setPredictedPower(result.predictions?.[0]?.predicted_power?.toFixed(2));
  //     setShowResults(true);
  //   } catch (error) {
  //     console.error("Prediction failed:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleDownloadCSV = () => {
    if (!data.length) return;
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "solar_predictions.csv";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <Sun className="w-16 h-16 text-orange-500 animate-spin-slow" />
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Solar AI Forecast
            </h1>
          </div>
          <p className="text-xl text-gray-600 font-medium">
            Smart Solar Power Prediction Dashboard
          </p>
        </div>

        {/* Input Panel */}
        <div className="flex justify-center items-center mb-12">
          <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl border border-white/50 p-8 hover:shadow-orange-200/50 transition-all duration-500 w-full max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              Input Parameters
            </h2>

            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-blue-500" />
                  Ambient Temperature (°C)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 bg-white/80"
                  placeholder="e.g., 25"
                  value={ambient}
                  onChange={(e) => setAmbient(e.target.value)}
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-red-500" />
                  Module Temperature (°C)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 bg-white/80"
                  placeholder="e.g., 45"
                  value={moduleTemp}
                  onChange={(e) => setModuleTemp(e.target.value)}
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-yellow-500" />
                  Irradiation (W/m²)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 bg-white/80"
                  placeholder="e.g., 800"
                  value={irradiation}
                  onChange={(e) => setIrradiation(e.target.value)}
                />
              </div>

              <button
                onClick={handlePredict}
                disabled={isLoading}
                className="w-full mt-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 group-hover:animate-pulse" />
                    Predict Power
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {showResults && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-slideUp">
            <div className="backdrop-blur-xl bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-2xl p-6 border border-yellow-300/50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500 p-3 rounded-xl">
                  <Sun className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Irradiation
                  </p>
                  <p className="text-3xl font-black text-gray-800">
                    {irradiation}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">W/m²</p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-2xl p-6 border border-green-300/50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="bg-green-500 p-3 rounded-xl">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Predicted Power
                  </p>
                  <p className="text-3xl font-black text-gray-800">
                    {predictedPower}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">kW</p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-2xl p-6 border border-blue-300/50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500 p-3 rounded-xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    System Efficiency
                  </p>
                  <p className="text-3xl font-black text-gray-800">
                    {efficiency}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts Section */}
        {data.length > 0 && (
          <div className="space-y-8 animate-slideUp">
            {/* Hourly Power Bar Chart */}
            <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-8 border border-white/50 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-green-500" />
                Hourly Predicted Power Output
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <defs>
                    <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="hour"
                    stroke="#6b7280"
                    style={{ fontSize: "12px", fontWeight: 600 }}
                  />
                  <YAxis
                    stroke="#6b7280"
                    style={{ fontSize: "12px", fontWeight: 600 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "2px solid #10b981",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar
                    dataKey="predicted_power"
                    fill="url(#colorPower)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Power Comparison Chart */}
            <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-8 border border-white/50 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-orange-500" />
                Historical vs Predicted Power
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="hour"
                    stroke="#6b7280"
                    style={{ fontSize: "12px", fontWeight: 600 }}
                  />
                  <YAxis
                    stroke="#6b7280"
                    style={{ fontSize: "12px", fontWeight: 600 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "2px solid #f97316",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "14px", fontWeight: 600 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted_power"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Predicted Power"
                    dot={{ fill: "#10b981", r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual_power"
                    stroke="#ef4444"
                    strokeWidth={3}
                    name="Historical Power"
                    dot={{ fill: "#ef4444", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Temperature vs Efficiency Chart */}
            <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-8 border border-white/50 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Thermometer className="w-6 h-6 text-blue-500" />
                Temperature vs Efficiency Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="hour"
                    stroke="#6b7280"
                    style={{ fontSize: "12px", fontWeight: 600 }}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="#6b7280"
                    style={{ fontSize: "12px", fontWeight: 600 }}
                    label={{
                      value: "Temp (°C)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#6b7280"
                    style={{ fontSize: "12px", fontWeight: 600 }}
                    label={{
                      value: "Efficiency (%)",
                      angle: 90,
                      position: "insideRight",
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "2px solid #3b82f6",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "14px", fontWeight: 600 }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="module_temp"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Temperature"
                    dot={{ fill: "#3b82f6", r: 4 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="efficiency"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    name="Efficiency"
                    dot={{ fill: "#f59e0b", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Download Button */}
            <div className="flex justify-center">
              <button
                onClick={handleDownloadCSV}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <Download className="w-5 h-5" />
                Download CSV Report
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
