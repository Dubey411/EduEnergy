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

  const handlePredict = async () => {
    setIsLoading(true);
    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/predict/manual`;
      console.log("Calling API:", apiUrl); // check the URL

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ambient_temp: ambient,
          module_temp: moduleTemp,
          irradiation: irradiation,
        }),
      });

      const result = await res.json();
      console.log("API response:", result);

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
  //     const res = await fetch(
  //       `${import.meta.env.VITE_API_BASE_URL}/api/predict/manual`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           ambient_temp: ambient,
  //           module_temp: moduleTemp,
  //           irradiation: irradiation,
  //         }),
  //       }
  //     );

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
        <div className="text-center mb-10 animate-fadeIn">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <Sun className="w-14 h-14 text-orange-500 animate-spin-slow" />
            <h1 className="text-5xl font-black bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Solar AI Forecast
            </h1>
          </div>
          <p className="text-lg text-gray-600 font-medium">
            Smart Solar Power Prediction Dashboard
          </p>
        </div>

        {/* Input Panel - Centered */}
        <div className="mb-10">
          <div className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-2xl border border-white/60 p-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              Input Parameters
            </h2>

            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-blue-500" />
                  Ambient Temperature (°C)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300 bg-white"
                  placeholder="e.g., 25"
                  value={ambient}
                  onChange={(e) => setAmbient(e.target.value)}
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-red-500" />
                  Module Temperature (°C)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300 bg-white"
                  placeholder="e.g., 45"
                  value={moduleTemp}
                  onChange={(e) => setModuleTemp(e.target.value)}
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-yellow-500" />
                  Irradiation (W/m²)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-300 bg-white"
                  placeholder="e.g., 800"
                  value={irradiation}
                  onChange={(e) => setIrradiation(e.target.value)}
                />
              </div>

              <button
                onClick={handlePredict}
                disabled={isLoading}
                className="w-full mt-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 animate-slideUp">
            <div className="backdrop-blur-xl bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-xl p-5 border border-yellow-300/50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-500 p-2.5 rounded-lg">
                  <Sun className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Irradiation
                  </p>
                  <p className="text-2xl font-black text-gray-800">
                    {irradiation}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">W/m²</p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-xl p-5 border border-green-300/50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 p-2.5 rounded-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Predicted Power
                  </p>
                  <p className="text-2xl font-black text-gray-800">
                    {predictedPower}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">kW</p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-xl p-5 border border-blue-300/50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-2.5 rounded-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    System Efficiency
                  </p>
                  <p className="text-2xl font-black text-gray-800">
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
          <div className="space-y-6 animate-slideUp">
            {/* Hourly Power Bar Chart */}
            <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-6 border border-white/50 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-500" />
                Hourly Predicted Power Output
              </h3>
              <ResponsiveContainer width="100%" height={280}>
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
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar
                    dataKey="predicted_power"
                    fill="url(#colorPower)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Power Comparison Chart */}
            <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-6 border border-white/50 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                Historical vs Predicted Power
              </h3>
              <ResponsiveContainer width="100%" height={280}>
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
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "13px", fontWeight: 600 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted_power"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    name="Predicted Power"
                    dot={{ fill: "#10b981", r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual_power"
                    stroke="#ef4444"
                    strokeWidth={2.5}
                    name="Historical Power"
                    dot={{ fill: "#ef4444", r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Temperature vs Efficiency Chart */}
            <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-6 border border-white/50 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-blue-500" />
                Temperature vs Efficiency Trend
              </h3>
              <ResponsiveContainer width="100%" height={280}>
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
                      style: { fontSize: "12px" },
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
                      style: { fontSize: "12px" },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "2px solid #3b82f6",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "13px", fontWeight: 600 }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="module_temp"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    name="Temperature"
                    dot={{ fill: "#3b82f6", r: 3 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="efficiency"
                    stroke="#f59e0b"
                    strokeWidth={2.5}
                    name="Efficiency"
                    dot={{ fill: "#f59e0b", r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Download Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={handleDownloadCSV}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
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
            transform: translateY(30px);
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
