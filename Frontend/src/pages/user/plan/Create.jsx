import { useEffect, useState } from "react";
import {
  FaSearch,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserFoot from '../../../components/User/user.footer'
const Create = () => {
  const navigate = useNavigate();
  const [suggestion, setSuggestion] = useState([]);

  useEffect(() => {
    fetch("/api/popular.json")
      .then((res) => res.json())
      .then((data) => setSuggestion(data));
  }, []);

  return (
    <div className="min-h-screen  text-white  p-6">
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center mb-8">
        <button
          className="p-4 rounded-full hover:bg-gray-700  transition-colors"
          onClick={() => navigate("/plan")}
        >
          <FaArrowLeft />
        </button>
        <div className="flex items-center gap-4 ml-12 px-4 py-2 rounded-lg border border-gray-800 w-1/3">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search places, trips, people"
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Title Section */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Where do you want to go?
            </h2>
            <p className="text-gray-400 text-sm">
              Pick a primary destination to start your trip. You can add more
              stops later.
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column: Destinations */}
          <section className="col-span-7">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Suggested destinations</h3>
              <button className="text-[#10B981] text-xs">View all</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {suggestion.map((item) => (
                <div
                  key={item.id}
                  className=" rounded-2xl overflow-hidden border border-gray-800 group"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-36 object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-[#10B981] text-black text-[10px] font-bold px-2 py-1 rounded-md">
                      {item.tag || "Trending"}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-sm mb-1">
                      {item.name}, {item.country}
                    </h4>
                    <p className="text-[10px] text-gray-500 mb-3">
                      {item.desc ||
                        "Ideal in May • 5-10 days • Beaches & cafes"}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400">
                        {item.travelers || "32k"} travelers this year
                      </span>
                      <button className="bg-[#14532d] text-[#10B981] px-3 py-1 rounded-lg text-[10px] font-bold">
                        Choose
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Map & Preferences */}
          <section className="col-span-5 flex flex-col gap-6">
            <div className=" p-4 rounded-2xl border border-gray-800">
              <div className="flex justify-between mb-3">
                <h3 className="text-sm font-bold">Map preview</h3>
                <span className="text-[#10B981] text-[10px] cursor-pointer">
                  Open full map
                </span>
              </div>
              <div className="w-full h-48 bg-gray-800 rounded-xl mb-3 overflow-hidden">
                <img
                  src="/"
                  className="w-full h-full object-cover opacity-80"
                  alt="Map"
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>Zoom in to pick a smaller town or region.</span>
                <span className="text-[#10B981]">Map view only</span>
              </div>
            </div>

            <div className=" p-6 rounded-2xl border border-gray-800">
              <h3 className="text-sm font-bold mb-1">Your trip preferences</h3>
              <p className="text-[10px] text-gray-500 mb-6">
                We'll use this to fine-tune suggestions
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Travel style</span>
                  <span>Relaxed - Slow-paced</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Budget comfort</span>
                  <span>Mid-range</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Max flight time</span>
                  <span>Up to 6 hours</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Navigation */}
             <UserFoot nav={"set"} />
    </div>
  );
};

export default Create;
