import {
  FaArrowLeft,
  FaMapMarkedAlt,
  FaBrain,
  FaSuitcaseRolling,
  FaCalendarAlt,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuickStartInput = ({ placeholder, icon: Icon, type = "text" }) => (
  <div className="relative flex items-center bg-[#283E51] rounded-lg h-12 px-3 focus-within:ring-2 focus-within:ring-emerald-400 transition-all duration-200">
    <Icon className="text-gray-400 mr-3 text-lg" />
    <input
      type={type}
      placeholder={placeholder}
      className="border-none h-full w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
    />
  </div>
);

const Plan = () => {
  const [planOptions, setPlanOptions] = useState([]);
  const navigate = useNavigate();

  const ICONS = {
    map: <FaMapMarkedAlt className="text-3xl text-white" />,
    brain: <FaBrain className="text-3xl text-white" />,
    suitcase: <FaSuitcaseRolling className="text-3xl text-white" />,
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        name: "Create Trip",
        icon: "map",
        description: "Set destination, dates, travelers & budget manually",
        Link: "/plan/create",
      },
      {
        id: 2,
        name: "Plan with AI",
        icon: "brain",
        description:"Tell us the vibe and constraints; get a tailored itinerary",
          Link:"/AiPlan"
      },
      {
        id: 3,
        name: "View Tour Packages",
        icon: "suitcase",
        description: "Browse curated trips from trusted partners",
        Link:'/plan/packages'
      },
    ];

    setTimeout(() => {
      setPlanOptions(mockData);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="flex flex-col gap-8 py-2 text-white min-h-screen">
      {/* Header */}
      <header className="flex flex-row w-full items-center px-4 py-3 border-b border-gray-700/50">
        <button
          className="text-xl p-3 ml-12 rounded-full hover:bg-[#192c3b89] transition-colors"
          onClick={() => navigate("/userdash")}
        >
          <FaArrowLeft />
        </button>

        <span onClick={()=>navigate('/plan/myplan') }
        className="font-semibold text-xl ml-auto mr-4 p-1 rounded-xl hover:bg-gray-700">My Plans</span>

        {/* Profile Icon */}
        <div className="w-8 h-8 rounded-full bg-gray-600 cursor-pointer border-2 border-emerald-400 flex-shrink-0"></div>
      </header>

      {/* Main Content Area */}
      <div className="px-4 max-w-7xl mx-auto w-full flex flex-col gap-8">
        {/* Options Section */}
        <section>
          <h2 className="font-bold text-2xl mb-2">
            How would you like to plan?
          </h2>
          <p className="text-gray-400 mb-6">
            Choose an option to begin your perfect journey.
          </p>

          {/* Grid */}
          {isLoading ? (
            <div className="text-center text-gray-500 py-10">
              Loading options...
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {planOptions.map((option) => (
                <div
                  key={option.id}
                  className="relative bg-[#192c3b89] backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-transparent hover:border-emerald-500 cursor-pointer
                             hover:scale-[1.03] transition-transform duration-300"
                  onClick={() => option.Link && navigate(option.Link)}
                >
                  <div className="mb-4">{ICONS[option.icon]}</div>

                  <h3 className="text-xl font-semibold mb-1">{option.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Quick Start Section */}
        <section className="bg-[#192c3b89] backdrop-blur-sm w-full rounded-2xl p-6 shadow-xl mb-10 border border-gray-700/50">
          <h2 className="font-semibold text-2xl mb-1">Quick Start Planning</h2>
          <span className="text-gray-400 text-sm block mb-6">
            Fill in the basics to jump right in, or use AI for full creativity.
          </span>

          {/* Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuickStartInput placeholder="Destination" icon={FaMapMarkedAlt} />
            <QuickStartInput
              placeholder="Dates"
              icon={FaCalendarAlt}
              type="date"
            />
            <QuickStartInput
              placeholder="Travelers"
              icon={FaUsers}
              type="number"
            />
            <QuickStartInput
              placeholder="Budget"
              icon={FaDollarSign}
              type="number"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              className="px-6 py-3 font-semibold text-white text-base rounded-lg transition-colors
                         bg-emerald-700 hover:bg-emerald-600"
            >
              Use AI Instead
            </button>
            <button
              className="px-8 py-3 font-bold text-base rounded-lg transition-colors
                         bg-emerald-500 hover:bg-emerald-400 text-black"
              onClick={() => navigate("/plan/create")}
            >
              Start Trip
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Plan;
