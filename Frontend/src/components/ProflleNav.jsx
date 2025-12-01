import { FaRegComment, FaRegUser, FaUserShield } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { IoIosHelpBuoy } from "react-icons/io";
import { useState } from 'react';


const NavItem = ({ name, logo, isActive, onClick }) => {

  const baseClasses = "flex items-center text-lg p-2 gap-3 rounded-lg cursor-pointer transition-colors ";
  

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


const ProflleNav = () => {

  const [activeItem, setActiveItem] = useState("Profile setting");
  

  const Navop = [
    { id: 1, name: "Help center", logo: <IoIosHelpBuoy />, Link: "/help", category: "Account" },
    { id: 2, name: "Contact support", logo: <FaRegComment />, Link: "/contact", category: "Account" },
    { id: 3, name: "Safety & trust", logo: <FaUserShield />, Link: "/safety", category: "Account" },
    { id: 4, name: "Profile setting", logo: <FaRegUser />, Link: "/setting", category: "Account settings" },
    { id: 5, name: "App preference", logo: <CiSettings />, Link: "/preference", category: "Account settings" },
  ];


  const groups = Navop.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  
  const handleClick = (name) => {
    setActiveItem(name);

  };

  return (

    <nav className="min-h-screen p-4  text-white w-64 md:w-72  shadow-lg">
      
    
      {Object.entries(groups).map(([category, items]) => (
        <div key={category} className="mb-6">
          
          {/* Section Heading */}
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
            {category}
          </h3>

          {/* Navigation Items Container */}
          <div className="flex flex-col gap-1 items-start">
            {items.map((item) => (
              <NavItem
                key={item.id}
                name={item.name}
                logo={item.logo}
              
                isActive={activeItem === item.name}
                onClick={() => handleClick(item.name)}
              />
            ))}
          </div>
        </div>
      ))}
      
    </nav>
  );
};

export default ProflleNav;