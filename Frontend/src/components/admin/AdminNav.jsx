//import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import {
  FaUsers,
  FaMap,
  FaPlaneArrival,
  FaBell,
} from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

import { IoSettingsOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
const NavItem = ({ name, logo, isActive, onClick }) => {
  const baseClasses =
    "flex items-center text-lg p-2 gap-3 rounded-lg cursor-pointer transition-colors ";

  const activeClasses = "bg-emerald-600 text-white font-semibold ";
  const inactiveClasses = "text-gray-300 hover:bg-gray-800 hover:text-white";
  return (
    <button
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      onClick={onClick}
      role="link"
    >
      <span className="text-xl">{logo}</span>
      <span>{name}</span>
    </button>
  );
};
const AdminNav = () => {
  //const [activeItem, setActiveItem] = useState();
  const location = useLocation()
  const isActiveLink = (linkpath)=>{
    return location.pathname === linkpath
  }
  const Navop = [
    {
      id: 1,
      name: "Dashboard",
      logo: <MdDashboard />,
      Link: "/admin",
      category: "Overview",
    },
    {
      id: 2,
      name: "Users",
      logo: <FaUsers />,
      Link: "/admin/users",
      category: "Overview",
    },
    {
      id: 3,
      name: "Destination",
      logo: <FaMap />,
      Link: "/admin/destination",
      category: "Overview",
    },


   
    {
      id: 4,
       name: "Notify",
      logo: <FaBell />,
      Link: "/admin/notify",
      category: "System",
    },
    {
      id: 5,
      name: "Setting",
      logo: <IoSettingsOutline />,
      Link: "/admin/setting",
      category: "System",
    },
    {
      id:6,
      name:"Logout",
      Link:"/signup",
      logo:<CiLogout/>,
      category:"System",
      
    }
  ];
  const groups = Navop.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // const handleClick = (name) => {
  //   setActiveItem(name);
  // };
  return (
    <nav className="min-h-screen p-4 text-white w-64 md:w-72 shadow-lg">
      {Object.entries(groups).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h3 className='"text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2'>
            {category}
          </h3>

          <div className="flex flex-col gap-1 items-start">
            {items.map((item) => (
              <Link key={item.id} to={item.Link} className="w-full">
                <NavItem
                  name={item.name}
                  logo={item.logo}
                  isActive={isActiveLink(item.Link)}
                  onClick={()=> console.log(`moved to${item.Link} `)}
                />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default AdminNav;
