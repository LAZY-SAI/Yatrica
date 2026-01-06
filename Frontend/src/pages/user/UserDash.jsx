
import { FaSearch , FaHeart} from "react-icons/fa";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";


const UserDash = () => {
  const [tag, setTag] = useState([]);
  const [active, setActive] = useState("Popular"); 
  const [popularItems, setPopularItems] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const planButtons = [
    { name: "Explore", active: true },
    { name: "Trip Planner", active: false },
    { name: "Itineraries", active: false },
  ];

  const navigate = useNavigate()
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
   
  setTimeout(()=> {
    setIsLoading(false);
  },500)},[]);

  return (
    <>
      
      <div className="flex flex-col min-h-screen pb-36 "> 
        <div className="w-full">
          {/* Main Header  */}
          <header className="flex items-center justify-between px-4 pt-4 pb-2 max-w-7xl mx-auto">
            {/* Logo  */}
            <span className="text-xl font-bold text-white mr-4">Yatrica</span>

            {/*  Search Input  */}
            <div
              className="flex items-center flex-grow px-4 py-2 rounded-xl"
              style={{ backgroundColor: "#0C302C" }}
            >
              <FaSearch className="text-gray-400 mr-3 text-sm" />
              <input
                type="text"
                placeholder="Search places, trips, people"
                className="w-full outline-none bg-transparent text-white text-sm placeholder-gray-400"
              />
            </div>
           
            <div className="hidden lg:flex items-center ml-8 gap-6 text-white text-sm font-medium">
                
               
                <span onClick={()=>navigate('/plan/myplan')}>My Plan</span>
               
            </div>
            {/* Profile */}
            <div className="w-8 h-8 rounded-full bg-gray-600 ml-4 cursor-pointer"
            onClick={()=>navigate('/profile')}></div>
          </header>

          {/* Tag Section  */}
          <div className="flex overflow-x-auto gap-3 px-4 py-3 pb-4 max-w-7xl mx-auto whitespace-nowrap scrollbar-hide overflow-hidden">
            {tag.map((item) => (
              <span
                key={item.id}
                onClick={() => {
                  setActive(item.tag);
                }}
                className={`px-4 py-1.5 text-sm rounded-full cursor-pointer 
                ${active === item.tag
                    ? "bg-emerald-600 text-white"
                    : "bg-[#071F22] text-gray-300 hover:bg-emerald-700"
                  }`}
              >
                {item.tag}
              </span>
            ))}
          </div>
        </div>

     
        <section className="mt-6 px-4 max-w-7xl mx-auto w-full">
            <h2 className="text-white text-xl font-bold mb-3">Plan your next escape</h2>
            <p className="text-gray-400 mb-6">Discover destinations and build itineraries.</p>
            <div className="flex gap-4">
                {planButtons.map((button) => (
                    <button 
                        key={button.name}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                            button.active 
                            ? "bg-emerald-600 text-white" 
                            : "bg-[#0C302C] text-gray-300 hover:bg-emerald-700"
                        }`}
                    >
                        {button.name}
                    </button>
                ))}
            </div>
        </section>


        {/* Featured Destinations section */}
        <section className="flex-1 mt-6 px-4 max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl text-white">Featured destinations</h2>
            <span className="text-emerald-500 text-sm cursor-pointer hover:text-emerald-400">See all</span>
          </div>
          {isLoading ?(<div className="text-center text-gray-500 py-10">Loading options...</div>
          ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            
            {popularItems.slice(0, 6).map((item) => ( 
              <div
                key={item.id}
            
                className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer hover:scale-[1.03] transition-transform duration-300 group aspect-[4/3] sm:aspect-[3/2] md:aspect-[4/3] lg:aspect-[3/2]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
                {/* Overlay for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                    <h3 className="text-white text-lg font-semibold">{item.name}</h3>
                   
                    <p className="text-gray-300 text-sm">
                        {item.description || ""} 
                        {item.tag && <span className="ml-2 px-2 py-0.5 bg-emerald-600 text-white text-xs rounded-full font-bold">Trending</span>}
                    </p>
                </div>
              </div>
            ))}
          </div>
          )}
        </section>

        {/* Community posts section */}
        <section className="flex-1 mt-6 px-4 max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl text-white">Community posts</h2>
            <span className="text-emerald-500 text-sm cursor-pointer hover:text-emerald-400">See posts</span>
          </div>
          
       
          {isLoading ?(<div className="text-center text-gray-500 py-10">Loading options...</div>)
          :(<div className="mt-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 ">
            {posts.map((post) => (
             
              <div
                key={post.id}
                
                className="flex rounded-xl overflow-hidden shadow-md cursor-pointer bg-[#192c3b89]  hover:scale-[1.02] transition-transform duration-150 "
              >
            
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-24 h-full object-cover flex-shrink-0" 
                />

                {/* Content */}
                <div className="p-3 flex flex-col justify-between flex-grow">
                  <h3 className="font-bold text-base text-white line-clamp-2">{post.title}</h3>

               
                  <div className="mt-2 text-xs text-gray-400">
                   
                    <p className="mb-1">by <span className="font-medium text-gray-300">{post.name}</span></p>

                  
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <FaHeart className="text-red-500 text-xs"/> 
                        
                            <span className="text-gray-300">{post.likes}</span> likes
                        </span>
                        
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>)}
        </section>
      </div>


    </>
  );
};

export default UserDash;