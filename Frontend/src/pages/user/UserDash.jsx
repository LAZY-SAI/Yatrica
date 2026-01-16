import { FaSearch, FaHeart, FaCompass, FaMapMarkedAlt, FaLayerGroup } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDash = () => {
  const [tag, setTag] = useState([]);
  const [active, setActive] = useState("Popular");
  const [popularItems, setPopularItems] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const planButtons = [
    { name: "Explore", icon: <FaCompass />, active: true },
    { name: "Trip Planner", icon: <FaMapMarkedAlt />, active: false },
    { name: "Itineraries", icon: <FaLayerGroup />, active: false },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      fetch("/api/types.json").then((res) => res.json()),
      fetch("/api/popular.json").then((res) => res.json()),
      fetch("/api/post.json").then((res) => res.json()),
    ])
      .then(([data1, data2, data3]) => {
        setTag(data1);
        setPopularItems(data2);
        setPosts(data3);
      })
      .catch((err) => console.error(err));

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-100 pb-20">
      {/* Navbar / Search */}
      <header className="sticky top-0 z-50 bg-[#0B1120]/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <span className="text-2xl font-black text-white tracking-tighter italic">Yatrica.</span>

          <div className="flex-grow max-w-2xl relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-500 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Where to next?"
              className="w-full bg-gray-900/50 border border-gray-800 text-white text-sm rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all placeholder:text-gray-600 shadow-inner"
            />
          </div>

          <div className="flex items-center gap-6">
            <span 
              onClick={() => navigate('/plan/myplan')}
              className="hidden md:block text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors"
            >
              My Plans
            </span>
            <div 
              className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 cursor-pointer hover:border-emerald-500 transition-all overflow-hidden"
              onClick={() => navigate('/profile')}
            >
                <div className="w-full h-full bg-gradient-to-tr from-emerald-500/20 to-blue-500/20"></div>
            </div>
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="max-w-7xl mx-auto px-6 py-2 flex gap-2 overflow-x-auto scrollbar-hide no-scrollbar">
          {tag.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.tag)}
              className={`px-5 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap border ${
                active === item.tag
                  ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/20"
                  : "bg-gray-900/40 border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-700"
              }`}
            >
              {item.tag}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* Call to Action Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-black text-white tracking-tight">Plan your next escape</h2>
            <p className="text-sm text-gray-500">Discover hand-picked destinations and build custom itineraries.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {planButtons.map((button) => (
              <button
                key={button.name}
                onClick={() => navigate('/plan')}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all border ${
                  button.active
                    ? "bg-emerald-600/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    : "bg-gray-900/40 border-gray-800 text-gray-500 hover:border-gray-700 hover:text-gray-300"
                }`}
              >
                <span className="text-lg">{button.icon}</span>
                {button.name}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Grid */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wider">Featured Destinations</h2>
              <div className="h-1 w-12 bg-emerald-500 mt-1 rounded-full"></div>
            </div>
            <button className="text-xs font-bold text-emerald-500 uppercase tracking-widest hover:text-emerald-400 transition-colors">
              See All Destinations
            </button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(n => <div key={n} className="aspect-[4/3] bg-gray-900/50 rounded-3xl animate-pulse border border-gray-800" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularItems.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-gray-800 hover:border-emerald-500/50 transition-all duration-500 cursor-pointer shadow-2xl"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    {item.tag && (
                      <span className="inline-block px-2 py-1 bg-emerald-500 text-[10px] font-black uppercase tracking-tighter rounded-md mb-2 shadow-lg">
                        Trending
                      </span>
                    )}
                    <h3 className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1 line-clamp-1 group-hover:text-gray-300 transition-colors">
                      {item.description || "Explore the wonders of this location."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Community Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-white uppercase tracking-wider">Community Vibes</h2>
            <button className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors">
              Browse Feed
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group flex items-center gap-4 bg-gray-900/30 border border-gray-800/50 p-3 rounded-2xl hover:bg-gray-800/40 hover:border-gray-700 transition-all cursor-pointer"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-gray-800">
                  <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-bold text-gray-200 line-clamp-1 group-hover:text-white transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-bold">
                    By <span className="text-emerald-500">{post.name}</span>
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold">
                      <FaHeart className="text-rose-500" /> {post.likes}
                    </span>
                    <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">Verified Trip</span>
                  </div>
                </div>
                <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500">
                    <FaCompass />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserDash;