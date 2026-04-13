import { useState } from "react";
import serviceData from "./services.json";

export default function ServiceSearchFilter() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    category: "",
    price: ""
  });

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    });
  };

  const filtered = serviceData.filter((item) => {
    const search = dataForm.searchTerm.toLowerCase();

    const matchSearch =
      item.name.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search);

    const matchCategory = dataForm.category
      ? item.category === dataForm.category
      : true;

    const matchPrice =
      dataForm.price === "low"
        ? item.price < 3000000
        : dataForm.price === "high"
        ? item.price >= 3000000
        : true;

    return matchSearch && matchCategory && matchPrice;
  });

  const categories = [
    ...new Set(serviceData.map((item) => item.category))
  ];

  return (
    <div className="p-6">

      {/* SEARCH */}
      <input
        type="text"
        name="searchTerm"
        placeholder="Search..."
        onChange={handleChange}
        className="w-full p-2 border mb-3"
      />

      {/* FILTER */}
      <div className="grid md:grid-cols-2 gap-3 mb-4">
        
        <select name="category" onChange={handleChange} className="p-2 border">
          <option value="">All Category</option>
          {categories.map((c, i) => (
            <option key={i}>{c}</option>
          ))}
        </select>

        <select name="price" onChange={handleChange} className="p-2 border">
          <option value="">All Price</option>
          <option value="low">Murah</option>
          <option value="high">Mahal</option>
        </select>

      </div>

      {/* CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow hover:shadow-xl transition">

            <img src={item.image} className="w-full h-40 object-cover" />

            <div className="p-4">
              <h2 className="font-bold">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>

              <p className="text-blue-500 font-semibold">
                Rp {item.price.toLocaleString()}
              </p>

              <p className="text-xs">
                ⭐ {item.details.rating}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}