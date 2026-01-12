import AdminLayout from "./adminLayout";
import { useEffect, useState } from "react";
import Panel from '../../components/admin/Panel';
import PopUp from '../../components/admin/admin.pop';

const Adestination = () => {
 
  const [destStats, setDestStats] = useState({ destinationCount: 0 });
  const [detail, setDetail] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isPopOpen, setIsPopOpen] = useState(false);


  const overView = [
    { 
      id: 1, 
      title: "Total Destinations", 
      num: detail.length > 0 ? detail.length : (destStats.destinationCount || 0) 
    },
    { id: 2, title: "Activities", num: 0 },
    { id: 3, title: "Featured Spots", num: 0 },
  ];

  
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URI}/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        
   
        setDestStats(data);
        
    
       
        
     
      } catch (err) {
        console.error("failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveDestination = (newDestinationData) => {
    const newDestination = {
      id: Date.now(),
      name: newDestinationData.name || "Untitled Destination",
    };

    setDetail((prev) => [...prev, newDestination]);
    
    console.log("Successfully added to local state:", newDestination);
  };

  //  Filtering Logic
  const filterData = detail.filter((item) => {
    const itemName = item?.name || "";
    return itemName.toLowerCase().includes(search.toLowerCase());
  });

  const DetailContent = () => {
    if (loading) return <div className="text-gray-400 text-center py-4">Loading destinations...</div>;
    if (filterData.length === 0) {
      return (
        <div className="text-gray-400 text-center py-4">
          {search ? `No results found for "${search}".` : "No destinations found."}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3 mt-4 h-64 overflow-y-auto scrollbar-hide">
        {filterData.map((i) => (
          <div key={i.id} className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
            <span className="text-white font-medium">{i.name}</span>
            <button className="px-4 py-2 bg-red-700 hover:bg-red-600 transition duration-150 text-white text-xs font-bold rounded-lg">
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
        <header className="flex justify-between items-center pb-4 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-white">Manage Destination</h2>
            <p className="text-sm text-gray-400">Add, Update & remove the places</p>
          </div>
          <button
            onClick={() => setIsPopOpen(true)}
            className="bg-emerald-800 hover:bg-emerald-700 px-5 py-2.5 rounded-2xl transition duration-150 text-white font-semibold"
          >
            Add destination
          </button>
        </header>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* OverView Panel */}
        <div className="col-span-1">
          <Panel title={"OverView"}>
            <div className="flex flex-col gap-7 h-78">
              {overView.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 p-3 h-20 flex justify-between items-center rounded-xl"
                >
                  <span className="font-bold text-sm text-white">{item.title}</span>
                  <span className="text-lg font-extrabold text-emerald-400">{item.num}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Destination List Panel */}
        <div className="lg:col-span-2">
          <Panel title={"Destination"} Opt={"View All"}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search destination..."
                className="w-full md:w-64 p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-400 focus:outline-none transition duration-150"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <DetailContent />
          </Panel>
        </div>

              

        {/* Recent Changes Panel */}
        <div className="col-span-1">
          <Panel title={"Recent Changes"}>
            <div className="mb-4 h-36">
              <p className="text-gray-400">Recent changes feed would go here.</p>
            </div>
          </Panel>
        </div>
      </div>

      <PopUp
        isOpen={isPopOpen}
        onClose={() => setIsPopOpen(false)}
        onSave={handleSaveDestination}
      />
    </AdminLayout>
  );
};

export default Adestination;