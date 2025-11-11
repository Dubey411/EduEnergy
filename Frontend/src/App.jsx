// App.jsx
import React from "react";
import "./App.css"; // ✅ Import Tailwind CSS
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard />
    </div>
  );
}
