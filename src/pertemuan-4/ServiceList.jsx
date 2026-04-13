import serviceData from "./services.json";

export default function ServiceList() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {serviceData.map((item) => (
        <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">
          
          <img src={item.image} className="w-full h-40 object-cover" />

          <div className="p-4">
            <h2 className="font-bold text-lg">{item.name}</h2>
            <p className="text-gray-600 text-sm">{item.description}</p>

            <p className="text-blue-500 font-semibold mt-2">
              Rp {item.price}
            </p>

            <p className="text-xs text-gray-500">
              {item.details.provider} - {item.details.location}
            </p>

            <div className="mt-2">
              {item.tags.map((tag, i) => (
                <span key={i} className="bg-gray-200 px-2 py-1 text-xs mr-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}