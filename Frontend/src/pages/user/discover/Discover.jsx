import { FaArrowLeft, FaFire, FaCameraRetro, FaCity } from "react-icons/fa";
import { GiMountainRoad, GiPartyPopper } from "react-icons/gi";
import { PiForkKnifeFill } from "react-icons/pi";
import { useEffect, useState } from "react";

const Discover = () => {
  const options = [
    { id: 1, name: "Trending", icon: <FaFire /> },
    { id: 2, name: "Nature", icon: <GiMountainRoad /> },
    { id: 3, name: "Cities", icon: <FaCity /> },
    { id: 4, name: "Food", icon: <PiForkKnifeFill /> },
    { id: 5, name: "Photo Spots", icon: <FaCameraRetro /> },
    { id: 6, name: "Nightlife", icon: <GiPartyPopper /> },
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [newAdd, setNewAdd] = useState([]);
  const [week, setWeek] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch("/api/pick.json").then((res) => res.json()),
      fetch("api/popular.json").then((res) => res.json()),
    ])

      .then(([data1, data2]) => {
        setNewAdd(data1);
        setWeek(data2);
      })
      .catch((err) => console.error(err));

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="flex flex-col gap-8 py-2 text-white min-h-screen ">
      {/* Header */}
      <header className="flex items-center px-4 py-3 border-b border-gray-700/40">
        <button className="text-xl p-2 rounded-full hover:bg-[#192c3b89] transition">
          <FaArrowLeft />
        </button>

        {/* Profile Badge */}
        <div className="w-9 h-9 rounded-full bg-gray-600 ml-auto cursor-pointer border-2 border-emerald-400"></div>
      </header>

      <div className="px-4 max-w-7xl mx-auto w-full flex flex-col gap-8">
        {/* Discover Section */}
        <section>
          <h2 className="font-semibold text-xl">Discover</h2>
          <p className="text-gray-300 text-sm">
            Find curated experiences and popular destinations
          </p>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 mt-4">
            {options.map((item) => (
              <button
                key={item.id}
                className="flex items-center gap-2 bg-[#1b3a34] px-4 py-2 rounded-2xl 
                           text-sm font-medium border border-emerald-600/40
                           hover:scale-[1.05] hover:bg-emerald-700/70
                           transition-all duration-200"
              >
                <span className="text-emerald-300 text-lg">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>
        </section>

     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Content */}
          <section className="md:col-span-2 flex flex-col gap-6">
            {/* Newly Added */}
            <div>
              <h2 className="font-semibold text-xl mb-2">Newly Added</h2>

              {isLoading ? (
                <div className="text-gray-300 py-10">Loading.....</div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {newAdd.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl overflow-hidden border border-gray-700/40    hover:scale-[1.02] transition"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2 text-sm">{item.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Popular This Week */}
            <div>
              <h2 className="font-semibold text-xl mb-2">Popular This Week</h2>

              {isLoading ? (
                <div className="text-gray-400 py-10">Loading........</div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {week.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl overflow-hidden bg-[#15252e] hover:scale-[1.02] transition cursor-pointer"
                    >
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-24 object-cover"
                      />
                      {/* Text/Title */}
                      <div className="p-2">
                        <span className="font-medium text-sm text-gray-100 block truncate">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Map Preview */}
          <section>
            <h2 className="font-semibold text-xl mb-3">Map Preview</h2>
            <div className="bg-[#192c3b89] rounded-xl p-4 h-64 border border-gray-600/30">
              {/* Map placeholder */}
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Map Loading...
                </div>
              ) : (
                <div className="h-full"></div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Discover;
