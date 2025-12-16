import { FaHome, FaCompass, FaPlusSquare, FaUser } from "react-icons/fa";
import { LuSlidersHorizontal } from "react-icons/lu";

import { Link } from "react-router-dom";
import { useState } from "react";

const Nav = () => {
  const [active, setActive] = useState();

  const menu = [
    { name: "Home", logo: <FaHome />, Link: "/userdash" },
    { name: "Discover", logo: <FaCompass />, Link: "/discover" },
    { name: "Plan", logo: <LuSlidersHorizontal />, Link: "/plan" },
    { name: "Posts", logo: <FaPlusSquare />, Link: "/posts" },
    { name: "Profile", logo: <FaUser />, Link: "/profile" },
  ];

  return (
    <div className="w-full rounded-xl shadow-2xl flex items-center bg-[#0d1216f0]  py-1">
      <div className="flex flex-row justify-around w-full">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.Link}
            onClick={() => setActive(item.name)}
            className={`
              flex flex-row items-center gap-2 justify-center px-4 py-2 flex-grow
              cursor-pointer transition-all duration-200 select-none
              ${active === item.name ? "text-emerald-600" : "text-gray-400 hover:text-emerald-500"}
            `}
          >
            <span className="text-xl">{item.logo}</span>
            <span className="text-xs font-medium mt-1">{item.name}</span>

            {active === item.name && (
              <div className="absolute top-4 h-1 w-8 bg-emerald-600 rounded-b-md"></div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Nav;
