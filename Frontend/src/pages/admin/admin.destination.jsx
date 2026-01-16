import AdminLayout from "./adminLayout";
import { useEffect, useState } from "react";
import Panel from "../../components/admin/Panel";
import PopUp from "../../components/admin/admin.pop";
import DestEdit from "../../components/admin/DestEdit";
import { ToastContainer } from "react-toastify";
const Adestination = () => {
  const [destStats, setDestStats] = useState({ destinationCount: 0 });
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedDestId, setSelectedDestId] = useState(null);

  const [recentChanges, setRecentChanges] = useState([
    { id: 1, action: "System", target: "Dashboard Ready", time: "Connected" },

  ]);

  const handleEditClick = (id) => {
    setSelectedDestId(id);
    setIsEditOpen(true);
  };

  const overView = [
    { id: 1, title: "Total Destinations", num: destStats.destinationCount ?? "0", color: "text-emerald-400" },
    { id: 2, title: "Activities", num: 0, color: "text-blue-400" },
    { id: 3, title: "Featured Spots", num: 0, color: "text-amber-400" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return setLoading(false);

      try {
        const [adminRes, destListRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URI}/admin`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${import.meta.env.VITE_API_URI}/destinations`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!adminRes.ok || !destListRes.ok) throw new Error("API Error");

        const det = await adminRes.json();
        const place = await destListRes.json();

        setDestStats(det);
        setDetail(place.content || []);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdateDestination = (updatedDest, data, isDeleted = false) => {

    if(isDeleted){
      setDetail((prev)=> prev.filter(item => item.id !== data))
       setDestStats(prev => ({
      ...prev,
      destinationCount: Math.max(0, prev.destinationCount - 1),
    }));
    return;
    }
     setDetail(prev =>
    prev.map(item =>
      item.id === updatedDest.id ? { ...item, ...updatedDest } : item
    )
  );
     setRecentChanges(prev => [
    {
      id: Date.now(),
      action: "Updated",
      target: updatedDest.name,
      time: "Just now",
    },
    ...prev,
  ]);
    
};

const handleSaveDestination = (newDest) => {
  
  setDetail((prev) => [newDest, ...prev]);


  setDestStats((prev) => ({
    ...prev,
    destinationCount: (Number(prev.destinationCount) || 0) + 1,
  }));


  setRecentChanges((prev) => [
    {
      id: Date.now(),
      action: "Created",
      target: newDest.name,
      time: "Just now",
    },
    ...prev,
  ]);
};

  const DetailContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col justify-center items-center h-64 space-y-3">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 animate-pulse">Fetching locations...</p>
        </div>
      );
    }

    const filteredDetail = detail.filter((item) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredDetail.length === 0) {
      return (
        <div className="text-gray-500 text-center py-20 border-2 border-dashed border-gray-800 rounded-xl mt-4">
          No destinations found matching "{search}"
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3 mt-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredDetail.map((item) => (
          <div
            key={item.id}
            className="group flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-800 transition-all duration-200 rounded-xl border border-gray-700/50 hover:border-emerald-500/50 shadow-sm"
          >
            <div className="flex items-center gap-4">
               <div className="h-10 w-10 rounded-lg bg-emerald-900/30 flex items-center justify-center text-emerald-400 font-bold uppercase">
                 {item.name.charAt(0)}
               </div>
               <div>
                <h2 className="text-white font-medium group-hover:text-emerald-400 transition-colors">{item.name}</h2>
                <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{item.shortDescription || "No description provided."}</p>
              </div>
            </div>
            <button
              onClick={() => handleEditClick(item.id)}
              className="px-4 py-1.5 bg-gray-700 hover:bg-blue-600 transition-all duration-200 text-white text-xs font-semibold rounded-lg"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout
      header={
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Manage Destinations</h2>
            <p className="text-sm text-gray-400">Inventory management and location tracking</p>
          </div>
          <button
            onClick={() => setIsPopOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 hover:scale-105 active:scale-95 px-6 py-2.5 rounded-xl transition-all duration-200 text-white font-bold shadow-lg shadow-emerald-900/20"
          >
            + Add Destination
          </button>
        </header>
      }
    >
       <ToastContainer position="top-right" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main List Area */}
        <div className="lg:col-span-8">
          <Panel title={"Active Destinations"}>
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Search by name..."
                className="w-full p-3 pl-4 bg-gray-900/50 text-white rounded-xl border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <DetailContent />
          </Panel>
        </div>

        {/* Sidebar Area */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Overview Section */}
          <Panel title={"System Overview"}>
            <div className="grid grid-cols-1 gap-4">
              {overView.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-900/40 p-4 flex justify-between items-center rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <span className="font-medium text-sm text-gray-400">{item.title}</span>
                  <span className={`text-xl font-black ${item.color}`}>{item.num}</span>
                </div>
              ))}
            </div>
          </Panel>

          {/* Recent Changes Section */}
          <Panel title={"Recent Activity"}>
            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
              {recentChanges.map((change) => (
                <div
                  key={change.id}
                  className="flex items-start gap-3 p-3 bg-gray-800/30 border-l-2 border-emerald-500 rounded-r-lg"
                >
                  <div className="flex flex-col">
                    <p className="text-[13px] text-gray-200">
                      <span className="font-bold text-emerald-400 uppercase text-[10px] mr-2">
                        {change.action}
                      </span>
                      {change.target}
                    </p>
                    <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">
                      {change.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <PopUp isOpen={isPopOpen} onClose={() => setIsPopOpen(false)} 
        onSave={handleSaveDestination}/>
      
      {isEditOpen && (
        <DestEdit
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          destId={selectedDestId}
          onSave={handleUpdateDestination}
        />
      )}
    </AdminLayout>
  );
};

export default Adestination;