import AdminLayout from "./adminLayout";
import AdItineryPop from "../../components/admin/admin.itineraypop";
import { FaPlus, FaSearch, FaFilter, FaEllipsisV, FaCalendarAlt, FaClock } from "react-icons/fa";
import { useState } from "react";
import Panel from "../../components/admin/Panel"; // Assuming you have the Panel component from previous sections

const AdItinery = () => {
  const [isItenararyOpen, setIsIteneraryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for the SaaS look - replace with your actual fetch logic
  const [itineraries] = useState([
    { id: 1, name: "Annapurna Base Camp Trek", duration: "10 Days", difficulty: "Hard", status: "Active" },
    { id: 2, name: "Lumbini Cultural Tour", duration: "3 Days", difficulty: "Easy", status: "Draft" },
    { id: 3, name: "Chitwan Jungle Safari", duration: "4 Days", difficulty: "Moderate", status: "Active" },
  ]);

  return (
    <AdminLayout
      header={
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 gap-4">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Itineraries
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              Design and manage multi-day travel experiences
            </p>
          </div>
          <button
            onClick={() => setIsIteneraryOpen(true)}
            className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-2xl transition-all duration-300 text-white font-bold shadow-xl shadow-emerald-900/40"
          >
            <FaPlus className="group-hover:rotate-90 transition-transform" />
            Create Itinerary
          </button>
        </header>
      }
    >
      <div className="flex flex-col gap-6">
        {/* SaaS Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-900/40 p-4 rounded-2xl border border-gray-800">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="Search itineraries..."
              className="w-full pl-12 pr-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-sm text-white focus:border-emerald-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-semibold transition-all">
              <FaFilter size={12} /> Filter
            </button>
            <select className="flex-1 md:flex-none px-4 py-2.5 bg-gray-800 border-none text-gray-300 rounded-xl text-sm font-semibold outline-none cursor-pointer">
              <option>All Status</option>
              <option>Active</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

        {/* Data List */}
        <Panel title="All Itineraries">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black">
                  <th className="px-4 py-4">Itinerary Name</th>
                  <th className="px-4 py-4">Duration</th>
                  <th className="px-4 py-4">Difficulty</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {itineraries.map((item) => (
                  <tr key={item.id} className="group hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                          <FaCalendarAlt />
                        </div>
                        <span className="text-sm font-bold text-gray-200 group-hover:text-emerald-400 transition-colors cursor-pointer">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                        <FaClock className="text-gray-600" /> {item.duration}
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border ${
                        item.difficulty === 'Hard' ? 'text-red-400 border-red-400/20 bg-red-400/5' : 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5'
                      }`}>
                        {item.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-gray-600'}`}></span>
                        <span className="text-xs text-gray-300 font-semibold">{item.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-right">
                      <button className="p-2 hover:bg-gray-700 rounded-lg text-gray-500 transition-all">
                        <FaEllipsisV size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      {/* Modal - Note: Fixed component name from AdItinery to AdItineryPop to avoid recursion */}
      <AdItineryPop 
        isOpen={isItenararyOpen} 
        onClose={() => setIsIteneraryOpen(false)} 
      />
    </AdminLayout>
  );
};

export default AdItinery;