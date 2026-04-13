import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import ServiceList from "./ServiceList";
import ServiceTable from "./ServiceTable";
import ServiceSearchFilter from "./ServiceSearchFilter";
import ResponsiveDesign from "./ResponsiveDesign";
import "./tailwind.css";

function App() {
  const [role, setRole] = useState("guest");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* HEADER & ROLE SWITCHER */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Service Dashboard</h1>
          <p className="text-gray-500 text-sm">Manage and view your services easily</p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg mt-4 md:mt-0">
          <button
            onClick={() => setRole("guest")}
            className={`px-6 py-2 rounded-md transition-all ${
              role === "guest" ? "bg-white shadow text-blue-600 font-bold" : "text-gray-500"
            }`}
          >
            Guest View
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`px-6 py-2 rounded-md transition-all ${
              role === "admin" ? "bg-white shadow text-red-600 font-bold" : "text-gray-500"
            }`}
          >
            Admin Panel
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* CONDITIONAL RENDERING */}
        {role === "guest" ? (
          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                Featured Services
              </h2>
              <ServiceList />
            </section>
            
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Explore All Services</h2>
              <ServiceSearchFilter />
            </section>

            <ResponsiveDesign />
          </div>
        ) : (
          <section className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-800">Service Management</h2>
              <p className="text-sm text-gray-500">Filter, search, and manage service inventory</p>
            </div>
            {/* Tabel Admin tanpa card di bawahnya */}
            <ServiceTable role="admin" />
          </section>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);