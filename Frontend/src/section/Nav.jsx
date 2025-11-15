import { FaHome, FaCompass, FaLeaf, FaPlusSquare, FaUser } from "react-icons/fa";
import { useState } from "react";

const Nav = () => {
  const [active, setActive] = useState("Home");

  const menu = [
    { name: "Home", logo: <FaHome /> },
    { name: "Discover", logo: <FaCompass /> },
    { name: "Plan", logo: <FaLeaf /> },
    { name: "Posts", logo: <FaPlusSquare /> }, // Renamed from 'Post' to 'Posts' to match image
    { name: "Profile", logo: <FaUser /> },
  ];

  return (

    <div className={`w-full rounded-xl shadow-2xl flex items-center bg-[#071F22] py-1`}>
      <div className="flex flex-row justify-around w-full">
        {menu.map((item) => (
          <div
            key={item.name}
            role="button"
            onClick={() => setActive(item.name)}
            
            className={`
              flex flex-row items-center gap-2 justify-center  px-4 py-2 flex-grow 
              cursor-pointer transition-all duration-200 select-none
              ${active === item.name ? "text-emerald-600" : "text-gray-400 hover:text-emerald-500"}
            `}
          >
         
            <span className="text-xl">{item.logo}</span> 
         
            <span className="text-xs font-medium mt-1">{item.name}</span>
          
            {active === item.name && (
                <div className="absolute top-4 h-1 w-8 bg-emerald-600 rounded-b-md"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nav;