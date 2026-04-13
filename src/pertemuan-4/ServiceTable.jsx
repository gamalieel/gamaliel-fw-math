import { useState } from "react";
import serviceData from "./services.json";

export default function ServiceTable({ role }) {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    category: "",
    price: ""
  });

  const handleChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const filtered = serviceData.filter((item) => {
    const search = dataForm.searchTerm.toLowerCase();
    const matchSearch = item.name.toLowerCase().includes(search) || item.description.toLowerCase().includes(search);
    const matchCategory = dataForm.category ? item.category === dataForm.category : true;
    const matchPrice =
      dataForm.price === "low" ? item.price < 3000000 : 
      dataForm.price === "high" ? item.price >= 3000000 : true;

    return matchSearch && matchCategory && matchPrice;
  });

  const categories = [...new Set(serviceData.map((item) => item.category))];

  return (
    <div className="p-6">
      {/* 🔍 SEARCH & FILTER SECTION */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div className="relative flex-1 min-w-[250px]">
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          <input
            type="text"
            name="searchTerm"
            placeholder="Search service name or description..."
            onChange={handleChange}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <select
          name="category"
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>

        <select
          name="price"
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Prices</option>
          <option value="low">Below Rp 3jt</option>
          <option value="high">Above Rp 3jt</option>
        </select>

        <div className="text-sm text-gray-500 ml-auto">
          Showing <b>{filtered.length}</b> results
        </div>
      </div>

      {/* 📊 TABLE */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white uppercase text-xs tracking-wider">
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">Service Name</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4 font-semibold">Provider</th>
              <th className="p-4 font-semibold text-center">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50 transition-colors group">
                  <td className="p-4 text-gray-400 text-sm">#{item.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-gray-800">{item.name}</div>
                    <div className="text-xs text-gray-500 truncate max-w-[200px]">{item.description}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 group-hover:bg-blue-200 group-hover:text-blue-700">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-semibold text-gray-700">
                    Rp {item.price.toLocaleString()}
                  </td>
                  <td className="p-4 text-gray-600">{item.details.provider}</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md border border-yellow-200">
                      ⭐ {item.details.rating}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-12 text-center text-gray-500 italic">
                  No services found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}