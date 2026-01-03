import { FaArrowLeft, FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";

const Card = ({ pkg }) => {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-800 flex flex-col h-full">
      {/* Image Section */}
      <img 
        src={pkg.image || "https://via.placeholder.com/400x200"} 
        alt={pkg.title}
        className="w-full h-48 object-cover" 
      />
      
      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h2 className="font-bold text-lg text-white leading-tight w-2/3">{pkg.title}</h2>
          <div className="text-right">
            <p className="font-bold text-lg text-white">NPR {pkg.price}</p>
            <p className="text-gray-400 text-[10px]">per person</p>
          </div>
        </div>
        
        <p className="text-gray-400 text-xs mb-4">{pkg.subtitle}</p>

        {/* Tags / Vibes */}
        <div className="flex flex-wrap gap-2 mb-6">
          {pkg.vibes?.map((vibe, i) => (
            <span key={i} className="px-3 py-1 bg-[#1a2e25] text-[#4ade80] rounded-full text-[10px] font-medium">
              {vibe}
            </span>
          ))}
        </div>

        {/* Footer Section */}
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-400 text-[11px]">by {pkg.vendor}</p>
              <p className="text-gray-400 text-[11px] flex items-center gap-1">
                {pkg.rating} <span className="text-gray-500 text-[10px]">({pkg.reviews} reviews)</span>
              </p>
            </div>
            <button className="text-emerald-500 text-xs font-semibold hover:underline">View details</button>
          </div>
          
          <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors">
            Select package
          </button>
        </div>
      </div>
    </div>
  );
};

const Package = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
   
    fetch("/api/packages.json")
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch(err => console.log(err));
      
 
  }, []);

  return (
    <div className="min-h-screen  text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-start mb-10">
          <div className="flex gap-4">
            <button className="mt-1 p-2 h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors border border-gray-700">
              <FaArrowLeft size={14} />
            </button>
            <div>
              <h1 className="font-bold text-3xl mb-1">Browse Nepal tour packages</h1>
              <p className="text-gray-400 text-sm">
                Multi-day experiences across Nepal — from city culture to mountains and wildlife.
              </p>
            </div>
          </div>
          <button className="text-gray-400 text-sm font-medium hover:text-white">Back to planner</button>
        </header>

        {/* Sub-header Actions */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">Packages inside Nepal</h3>
          <button className="text-sm font-semibold text-gray-300">Filter & sort</button>
        </div>

        {/* Grid */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((item) => (
            <Card key={item.id} pkg={item} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default Package;