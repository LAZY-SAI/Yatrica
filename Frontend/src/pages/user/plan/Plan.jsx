import {
  FaArrowLeft,
  FaMapMarkedAlt,
  FaBrain,
  FaSuitcaseRolling,
  FaCalendarAlt,
  FaUsers,
  FaDollarSign,
  FaMagic,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Standardized Styled Input
const QuickStartInput = ({ placeholder, icon: Icon, type = "text" }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-[10px] font-bold uppercase text-gray-500 ml-1 tracking-widest">
      {placeholder}
    </label>
    <div className="relative flex items-center bg-gray-900/50 border border-gray-700/50 rounded-xl h-12 px-4 focus-within:ring-1 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all duration-300 group">
      <Icon className="text-gray-500 mr-3 text-lg group-focus-within:text-emerald-400 transition-colors" />
      <input
        type={type}
        placeholder={`Enter ${placeholder.toLowerCase()}...`}
        className="bg-transparent w-full text-white text-sm placeholder-gray-600 focus:outline-none"
      />
    </div>
  </div>
);

const Plan = () => {
  const [planOptions, setPlanOptions] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const ICONS = {
    map: <FaMapMarkedAlt />,
    brain: <FaBrain />,
    suitcase: <FaSuitcaseRolling />,
  };

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        name: "Manual Itinerary",
        icon: "map",
        description: "Set destination, dates, and budget step-by-step.",
        Link: "/plan/create",
        isFeatured: false,
      },
      {
        id: 2,
        name: "AI Travel Genius",
        icon: "brain",
        description: "Vibe-based planning. Just describe your dream trip.",
        Link: "/AiPlan",
        isFeatured: true,
      },
      {
        id: 3,
        name: "Curated Packages",
        icon: "suitcase",
        description: "Hand-picked tours from our trusted local partners.",
        Link: "/plan/packages",
        isFeatured: false,
      },
    ];

    setTimeout(() => {
      setPlanOptions(mockData);
      setIsLoading(false);
    }, 400);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-100 selection:bg-emerald-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0B1120]/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <button
              className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-emerald-500 transition-all active:scale-95"
              onClick={() => navigate("/userdash")}
            >
              <FaArrowLeft className="text-sm" />
            </button>
            <div>
                <h1 className="text-lg font-black tracking-tight text-white uppercase">Planner</h1>
                <p className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase">Travel Studio</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/plan/myplan')}
              className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-emerald-400 transition-colors mr-4"
            >
              My Plans
            </button>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center cursor-pointer hover:bg-emerald-500/20 transition-all">
                <div className="w-6 h-6 rounded-lg bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        
        {/* Method Selection Section */}
        <section>
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">How would you like to plan?</h2>
            <p className="text-gray-500 text-sm max-w-xl">Choose your preferred method of crafting your next adventure. AI-powered or manually curated.</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {planOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => navigate(option.Link)}
                  className={`group relative p-8 rounded-3xl border transition-all duration-500 cursor-pointer overflow-hidden ${
                    option.isFeatured 
                    ? "bg-emerald-500/5 border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.2)]" 
                    : "bg-gray-900/40 border-gray-800 hover:border-gray-600"
                  }`}
                >
                  {/* Decorative Gradient for AI */}
                  {option.isFeatured && (
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
                  )}

                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                    option.isFeatured ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-gray-800 text-gray-400"
                  }`}>
                    {ICONS[option.icon]}
                  </div>

                  <h3 className="text-xl font-black text-white mb-2">{option.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {option.description}
                  </p>

                  <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest ${
                    option.isFeatured ? "text-emerald-400" : "text-gray-400 group-hover:text-white"
                  }`}>
                    Select Method <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Quick Start Section */}
        <section className="relative">
          <div className="bg-gray-900/40 border border-gray-800 rounded-[2.5rem] p-8 lg:p-12 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-3xl -z-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="lg:w-1/3">
                <h2 className="text-2xl font-black text-white mb-3 tracking-tight">Quick Start</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Already have the basics in mind? Fill in the core details to initialize your itinerary dashboard immediately.
                </p>
                <div className="mt-8 flex items-center gap-4 text-emerald-500 font-bold text-xs uppercase tracking-tighter">
                    <span className="w-8 h-px bg-emerald-500/30"></span>
                    Ready to launch
                </div>
              </div>

              <div className="lg:w-2/3 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <QuickStartInput placeholder="Destination" icon={FaMapMarkedAlt} />
                  <QuickStartInput placeholder="Travel Dates" icon={FaCalendarAlt} type="date" />
                  <QuickStartInput placeholder="Group Size" icon={FaUsers} type="number" />
                  <QuickStartInput placeholder="Budget Range" icon={FaDollarSign} type="number" />
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10">
                  <button
                    onClick={() => navigate("/AiPlan")}
                    className="px-6 py-3 text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <FaMagic className="animate-pulse" />
                    Use AI Instead
                  </button>
                  <button
                    onClick={() => navigate("/plan/create")}
                    className="px-10 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-emerald-900/20 transition-all active:scale-95 flex items-center justify-center"
                  >
                    Start Crafting Trip
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Plan;