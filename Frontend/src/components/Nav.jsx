import { FaHome, FaCompass, FaPlusSquare, FaUser } from "react-icons/fa";
import { LuSlidersHorizontal } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom"; 

const Nav = () => {
  const location = useLocation(); 

  const menu = [
    { name: "Home", logo: <FaHome />, path: "/userdash" },
    { name: "Discover", logo: <FaCompass />, path: "/discover" },
    { name: "Plan", logo: <LuSlidersHorizontal />, path: "/plan" },
    { name: "Posts", logo: <FaPlusSquare />, path: "/posts" },
    { name: "Profile", logo: <FaUser />, path: "/profile" },
  ];

  return (
    <div className="w-full rounded-xl shadow-2xl flex items-center backdrop-blur-md sticky bottom-0">
      <div className="flex flex-row justify-around w-full">
        {menu.map((item) => {
      
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`
                relative flex flex-col items-center  justify-center px-4 py-1 flex-grow
                cursor-pointer transition-all duration-200 select-none
                ${isActive ? "text-emerald-600" : "text-gray-400 hover:text-emerald-500"}
              `}
            >
              <span className="text-xl">{item.logo}</span>
              <span className="text-xs font-semibold">{item.name}</span>

              {/* Active Indicator */}
              {isActive && (
                <div className="absolute top-0 h-1 w-8 bg-emerald-600 rounded-b-md"></div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Nav;