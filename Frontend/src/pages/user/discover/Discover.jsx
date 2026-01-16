import { FaArrowLeft, FaFire, FaCameraRetro, FaCity, FaMap } from "react-icons/fa";
import { GiMountainRoad, GiPartyPopper } from "react-icons/gi";
import { PiForkKnifeFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Discover = () => {
  const navigate = useNavigate();
  const options = [
    { id: 1, name: "Trending", icon: <FaFire />, color: "from-orange-500/20" },
    { id: 2, name: "Nature", icon: <GiMountainRoad />, color: "from-emerald-500/20" },
    { id: 3, name: "Cities", icon: <FaCity />, color: "from-blue-500/20" },
    { id: 4, name: "Food", icon: <PiForkKnifeFill />, color: "from-rose-500/20" },
    { id: 5, name: "Photo", icon: <FaCameraRetro />, color: "from-purple-500/20" },
    { id: 6, name: "Nightlife", icon: <GiPartyPopper />, color: "from-amber-500/20" },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [newAdd, setNewAdd] = useState([]);
  const [week, setWeek] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/pick.json").then((res) => res.json()),
      fetch("/api/popular.json").then((res) => res.json()),
    ])
      .then(([data1, data2]) => {
        setNewAdd(data1);
        setWeek(data2);
      })
      .catch((err) => console.error(err));

    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-100 pb-12 selection:bg-emerald-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0B1120]/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-emerald-500 transition-all"
            >
              <FaArrowLeft className="text-sm" />
            </button>
            <h1 className="text-xl font-black text-white tracking-tight uppercase">Discover</h1>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <div className="w-5 h-5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-10 flex flex-col gap-12">
        {/* Hero Categories */}
        <section>
          <div className="mb-6">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-500 mb-1">Curation</h2>
            <p className="text-gray-400 text-sm">Find curated experiences by category</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {options.map((item) => (
              <button
                key={item.id}
                className={`flex items-center gap-3 bg-gray-900/40 border border-gray-800 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all hover:border-emerald-500/50 hover:bg-gradient-to-br ${item.color} to-transparent group`}
              >
                <span className="text-lg text-gray-500 group-hover:text-emerald-400 group-hover:scale-110 transition-all">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Newly Added */}
            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-black text-white tracking-tighter">Newly Added</h2>
                <button className="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400">View All</button>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map(n => <div key={n} className="h-40 bg-gray-900/50 rounded-3xl animate-pulse" />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {newAdd.slice(0, 4).map((item) => (
                    <div key={item.id} className="group relative rounded-[2rem] overflow-hidden border border-gray-800/80 hover:border-emerald-500/50 transition-all duration-500 cursor-pointer">
                      <img src={item.image} alt={item.name} className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-90" />
                      <div className="absolute bottom-0 left-0 p-5 w-full">
                        <span className="text-[10px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-md uppercase tracking-tighter mb-2 inline-block">New Spot</span>
                        <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">{item.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Popular This Week */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-black text-white tracking-tighter whitespace-nowrap">Popular This Week</h2>
                <div className="h-px bg-gray-800 w-full"></div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map(n => <div key={n} className="h-24 bg-gray-900/50 rounded-2xl animate-pulse" />)}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {week.map((item) => (
                    <div key={item.id} className="group flex flex-col bg-gray-900/40 border border-gray-800 rounded-2xl p-2 hover:border-gray-600 transition-all cursor-pointer">
                      <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded-xl mb-3" />
                      <span className="font-bold text-xs text-gray-300 group-hover:text-white px-2 mb-2 truncate">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Map Preview Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-white tracking-tighter">Live Map</h2>
                <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse delay-75"></div>
                </div>
              </div>
              
              <div className="relative group overflow-hidden rounded-[2.5rem] bg-gray-900/50 border border-gray-800 h-[450px] transition-all hover:border-emerald-500/30">
                {/* Decorative Map Background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(#10b981 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }}>
                </div>
                
                {isLoading ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 gap-4">
                    <div className="w-8 h-8 border-2 border-gray-700 border-t-emerald-500 rounded-full animate-spin"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Syncing GPS...</span>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                        <FaMap className="text-3xl text-emerald-500" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Interactive Preview</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-8">
                      View all trending spots and user posts geographically in real-time.
                    </p>
                    <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-900/20 transition-all">
                        Launch Full Map
                    </button>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Discover;