import AdminLayout from "./adminLayout";
import { useEffect, useState } from "react";
import Panel from '../../components/admin/Panel'
import PopUp from '../../components/admin/admin.pop' 


const Adestination = () => {
 
  const [overView, setOverView] = useState([
    { id: 1, title: "Total Destinations", num: 0 }, 
    { id: 2, title: "Activities", num: 221 },
    { id: 3, title: "Featured Spots", num: 32 },
  ]);

  const [isPopOpen, setIsPopOpen] = useState(false);
  const [detail, setDetail] = useState([]); 
  const [region, setRegion] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  
  useEffect(() => {
    Promise.all([
      fetch("/api/trips.json").then((res) => res.json()),
      fetch("/api/region.json").then((res) => res.json()),
    ])
      .then(([data1, data2]) => {
        setDetail(data1);
        setRegion(data2);
        
       
        setOverView(prev => 
            prev.map(item => 
                item.id === 1 ? { ...item, num: data1.length } : item
            )
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);




  const handleSaveDestination =(newDestinationData) => {
     

    const tempId = Date.now(); 
    const newDestination = {
        id: tempId,
        name: newDestinationData.title, 
        region: newDestinationData.region,
     
    };
    
    setDetail(prev => [...prev, newDestination]);
    
   
    setOverView(prev => 
        prev.map(item => 
            item.id === 1 ? { ...item, num: item.num + 1 } : item
        )
    );

    
    console.log("Saving new destination to API:", newDestinationData);
    

  };


  const filterData = detail.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );


  const DetailContent = () => {
   
    if (loading) {
      return (
        <div className="text-gray-400 text-center py-4">
          Loading destinations...
        </div>
      );
    }

    if (filterData.length === 0) {
      return (
        <div className="text-gray-400 text-center py-4">
          {search
            ? `No results found for "${search}".`
            : "No destinations found."}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3 mt-4 h-64 overflow-y-auto ">
        {filterData.map((i) => (
          <div
            key={i.id}
            className="flex items-center justify-between p-2 bg-gray-800 rounded-lg"
          >
            <span className="text-white font-medium">{i.name}</span>
            <button className="p-3 bg-red-700 hover:bg-red-600 transition duration-150 text-white text-xs font-bold rounded-lg">
              Edit
            </button>
          </div>
        ))}
      </div>
    );
  };

  const RegionContent = () => {
    
    if (loading)
      return (
        <div className="text-gray-400 text-center py-4">Loading regions...</div>
      );
    if (region.length === 0)
      return (
        <div className="text-gray-400 text-center py-4">
          No region data available.
        </div>
      );

    return (
      <div className="flex flex-col gap-4 pt-2">
        {region.map((item) => (
          <div key={item.id} className="w-full">
            <div className="flex justify-between items-baseline text-sm mb-1">
              <span className="text-gray-300 font-semibold">{item.region}</span>

              <span className="text-emerald-400 font-extrabold text-base">
                {item.Percentage ? item.Percentage.toFixed(0) : 0}%
              </span>
            </div>

            {/* Progress Bar  */}
            <div className="bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-emerald-600 h-full transition-all duration-500 ease-out rounded-full"
                style={{ width: `${item.Percentage || 0}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout
      header={
        <header className="flex justify-between items-center pb-4 border-b border-gray-700 ">
          <div>
            <h2 className="text-xl font-bold">Manage Destination</h2>
            <p className="text-sm text-gray-400">
              Add ,Update & remove the places
            </p>
          </div>
          {/* Button to open the popup */}
          <button
            onClick={() => { setIsPopOpen(true) }} 
            className="bg-emerald-800 hover:bg-emerald-700 p-3 rounded-2xl transition duration-150 text-white font-semibold"
          >
            Add destination
          </button>
        </header>
      }
    >
      <div className="grid grid-cols-3 gap-6">
        
        {/* OverView Panel */}
        <div className="col-span-1 ">
          <Panel title={"OverView"}>
            <div className="flex flex-col gap-7 h-78">
              {overView.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 p-3 h-20 flex justify-between items-center rounded-xl"
                >
                  <span className="font-bold text-sm text-white">
                    {item.title}
                  </span>
                  <span className="text-lg font-extrabold text-emerald-400">
                    {item.num}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Destination List Panel */}
        <div className="col-span-2">
          <Panel title={"Destination"} Opt={"View All"}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search destination..."
                className=" p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-400 focus:outline-none transition duration-150"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <DetailContent />
          </Panel>
        </div>

        {/* Top Region Panel */}
        <div className="md:col-span-3 lg:col-span-2">
          <Panel title={"Top Region Visited"}>
            <RegionContent />
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