import {
  FaArrowLeft,
  FaFire,
  FaCameraRetro,
  FaCity,
} from "react-icons/fa";
import { GiMountainRoad, GiPartyPopper } from "react-icons/gi";
import { PiForkKnifeFill } from "react-icons/pi";

const Discover = () => {
  const options = [
    { id: 1, name: "Trending", icon: <FaFire /> },
    { id: 2, name: "Nature", icon: <GiMountainRoad /> },
    { id: 3, name: "Cities", icon: <FaCity /> },
    { id: 4, name: "Food", icon: <PiForkKnifeFill /> },
    { id: 5, name: "Photo Spots", icon: <FaCameraRetro /> },
    { id: 6, name: "Nightlife", icon: <GiPartyPopper /> },
  ];

  return (
    <div className="flex flex-col gap-8 py-2 text-white min-h-screen">

      {/* Header */}
      <header className="flex flex-row items-center px-4 py-3 border-b border-gray-700/50">
        <button className="text-xl p-2 rounded-full hover:bg-[#192c3b89] transition">
          <FaArrowLeft />
        </button>

        <div className="w-8 h-8 rounded-full bg-gray-600 ml-auto cursor-pointer border-2 border-emerald-400"></div>
      </header>

      {/* Body */}
      <div className="px-4 max-w-7xl mx-auto w-full flex flex-col gap-8">

        {/* Discover */}
        <section>
          <h2 className="font-semibold text-xl">Discover</h2>
          <p className="text-gray-300 text-sm">
            Find curated experiences and popular destinations
          </p>

          {/* Category Pills */}
          <div className="flex flex-row flex-wrap gap-3 mt-4">
            {options.map((item) => (
              <button
                key={item.id}
                className="flex items-center gap-2 bg-[#1b3a34] px-4 py-2 rounded-2xl 
                           text-sm font-medium border border-emerald-600/40
                           hover:scale-[1.04] hover:bg-emerald-700/80
                           transition-all duration-200"
              >
                <span className="text-emerald-300 text-lg">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Discover;
