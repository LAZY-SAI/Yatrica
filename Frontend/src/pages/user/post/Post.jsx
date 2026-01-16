import { useState, useEffect } from "react";
import { FaEdit, FaHeart, FaRegComment, FaHashtag } from "react-icons/fa";
import { FiMapPin, FiShare2, FiExternalLink, FiFilter, FiTrendingUp } from "react-icons/fi";
import PostPop from "./PostPop";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Community");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("api/person.json");
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        const structuredData = data.map((post) => ({
          ...post,
          images: Array.isArray(post.images) ? post.images : [post.images],
        }));
        setPosts(structuredData);
      } catch (error) {
        console.error("Could not fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-100 pb-12 selection:bg-emerald-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0B1120]/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-black text-white tracking-tighter uppercase">Community</h1>
            
            <nav className="flex items-center bg-gray-900/50 p-1 rounded-xl border border-gray-800">
              {["Community", "Itineraries", "Questions"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activeTab === tab 
                    ? "bg-emerald-600 text-white shadow-lg" 
                    : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <button 
            onClick={() => setIsPopOpen(true)} 
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
          >
            <FaEdit /> Create Post
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Posts Feed */}
        <div className="flex-grow space-y-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-2 border-gray-800 border-t-emerald-500 rounded-full animate-spin"></div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Loading Feed...</p>
            </div>
          ) : (
            posts.map((item) => (
              <article
                key={item.id}
                className="group bg-gray-900/40 border border-gray-800 rounded-[2rem] overflow-hidden transition-all hover:border-gray-700 shadow-2xl"
              >
                {/* User Info */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-blue-500 p-0.5">
                      <div className="w-full h-full rounded-[14px] bg-gray-900 border-2 border-gray-900 overflow-hidden">
                        <div className="w-full h-full bg-gray-700" /> {/* Placeholder for real avatar */}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-black text-white leading-none mb-1 group-hover:text-emerald-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium">@{item.name?.toLowerCase().replace(/\s/g, '')} • 1d ago</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-gray-800/50 rounded-lg text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Verified
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 pb-4">
                  <h2 className="text-lg font-bold text-gray-100 mb-3 leading-snug">
                    {item.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase rounded-full">
                      <FaHashtag className="text-[8px]" /> Travel
                    </span>
                  </div>
                </div>

                {/* Imagery Grid */}
                <div className={`grid gap-1 px-2 ${item.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {item.images.map((image, index) => (
                    <div key={index} className="relative aspect-[16/10] overflow-hidden first:rounded-tl-xl last:rounded-br-xl">
                      <img
                        src={image}
                        alt="Post content"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>

                {/* Social Footer */}
                <div className="p-4 flex items-center justify-between border-t border-gray-800/50 bg-gray-900/20">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-rose-500 hover:scale-110 transition-transform">
                      <FaHeart /> <span className="text-xs font-black">{item.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
                      <FaRegComment /> <span className="text-xs font-black">12</span>
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="p-2.5 rounded-xl bg-gray-800 text-gray-400 hover:text-emerald-400 hover:bg-gray-700 transition-all border border-gray-700">
                      <FiMapPin />
                    </button>
                    <button className="p-2.5 rounded-xl bg-gray-800 text-gray-400 hover:text-emerald-400 hover:bg-gray-700 transition-all border border-gray-700">
                      <FiShare2 />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/10 text-emerald-400 hover:bg-emerald-600/20 transition-all border border-emerald-500/20 font-bold text-xs uppercase">
                      <FiExternalLink /> Visit
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Sidebar Widgets */}
        <aside className="hidden lg:block w-80 space-y-6">
          <div className="sticky top-28 space-y-6">
            
            {/* Filter Widget */}
            <section className="bg-gray-900/40 border border-gray-800 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><FiFilter /></div>
                <h3 className="font-black text-white uppercase text-xs tracking-[0.2em]">Refine Feed</h3>
              </div>
              <div className="flex flex-col gap-2">
                {["All Posts", "Slow Travel", "Quick Tips", "Local Secrets"].map((f) => (
                  <button key={f} className="text-left px-4 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-800 hover:text-white transition-all border border-transparent hover:border-gray-700">
                    {f}
                  </button>
                ))}
              </div>
            </section>

            {/* Trending Widget */}
            <section className="bg-gray-900/40 border border-gray-800 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><FiTrendingUp /></div>
                <h3 className="font-black text-white uppercase text-xs tracking-[0.2em]">Hot Spots</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { name: "Pokhara Lakeside", tag: "#Nepal" },
                  { name: "Bali Retreats", tag: "#Vibes" },
                  { name: "Kyoto Gardens", tag: "#Zen" }
                ].map((dest, i) => (
                  <li key={i} className="group cursor-pointer">
                    <p className="text-sm font-bold text-gray-200 group-hover:text-emerald-400 transition-colors">{dest.name}</p>
                    <span className="text-[10px] text-gray-600 font-black uppercase">{dest.tag}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </aside>
      </main>

      <PostPop isOpen={isPopOpen} onClose={() => setIsPopOpen(false)} />
    </div>
  );
};

export default Post;