import AdminLayout from "./adminLayout";
import Panel from '../../components/admin/Panel'
import UserPop from '../../components/admin/admin.userpop'
import { useState, useEffect } from "react";


const AdUser = () => {
  const BASE_URL = import.meta.env.BASE_URL;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const activity = [
    { id: 1, name: "Total Users", numbers: "18,240", percent: "+8.2%" },
    { id: 2, name: "New Users", numbers: "4,120", percent: "+3.5%" },
    { id: 3, name: "Activity this week", numbers: "2,843", percent: "-1.9%" },
    { id: 4, name: "Blocked", numbers: "134", percent: "-0.4%" },
    
  ];

  const [isPopOpen, setIsPopOpen] = useState(false)
  const [detail,setDetail] = useState([])
  const handleSaveInfo = (newGuideData)=>{
    const tempId = Date.now();
    const newGuide = {
      id:tempId,
      name: newGuideData.name,
      description: newGuideData.description,
      place: newGuideData.place,


    };
    setDetail(prev => [...prev,newGuide])

  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin-users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        setUsers(data.users || data); // depends on API response shape
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  return (
    <AdminLayout
    header={
      <header className="flex justify-between items-center pb-4 border-b border-gray-700">
          <div >
            <h2 className="text-xl font-bold">Users</h2>
            <p className="text-sm text-gray-400">Monitor Users activity</p>
          </div>
          <button 
          onClick={()=> {setIsPopOpen(true)}}
          className="bg-emerald-800 p-3 rounded-2xl">
            Register Guide
          </button>
       
      </header>
    }>

     <div className="flex space-x-4">
        {activity.map((item) => (
          <div key={item.id} className="flex-1 bg-gray-900 p-4 rounded-xl">
            <p className="text-sm text-gray-400">{item.name}</p>
            <div className="flex justify-between items-center mt-1">
              <p className="font-bold text-2xl">{item.numbers}</p>
              <span
                className={`text-xs font-semibold ${
                  item.percent.startsWith("+")
                    ? "text-emerald-400"
                    : item.percent.startsWith("-")
                    ? "text-red-400"
                    : "text-gray-400"
                }`}
              >
                {item.percent}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-2">
          <Panel title={"Guide Activity"}
          subtitle={"key numbers of active guides"} Opt={"view guides"}>
            <div className="h-64  rounded-lg flex items-center justify-center">
             <span>

             </span>
            </div>
          </Panel>
        </div>

        <div className="col-span-1">
          <Panel title={"user segement"} className="min-h-[322px]">
            <div className="h-64  rounded-lg flex items-center justify-center">

            </div>
          </Panel>
        </div>

        <div className="col-span-2">
          <Panel title={"Recently added User"} className="min-h-[400px]">
            <div className="p-4 justify-between items-center">
              <ul className="space-y-3">
                {loading && <li className="text-gray-500">Loading users...</li>}

                {!loading && users.length === 0 && (
                    <li className="text-gray-500">No users found</li>
                )}

                {users.map((user) => (
                    <li
                        key={user._id}
                        className="flex justify-between items-center bg-gray-800 p-3 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold">{user.username}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>

                      <span
                          className={`text-xs px-2 py-1 rounded ${
                              user.isBlocked ? "bg-red-600" : "bg-emerald-600"
                          }`}
                      >
        {user.isBlocked ? "Blocked" : "Active"}
      </span>
                    </li>
                ))}
              </ul>

            </div>
          </Panel>
        </div>

        <div className="col-span-1">
          <Panel title="Add Guide" className="min-h-[400px]">
       
            <p className="text-gray-500">Input field</p>
          </Panel>
        </div>
      </div>


           <UserPop
        isOpen={isPopOpen}
        onClose={() => setIsPopOpen(false)}
        onSave={handleSaveInfo} 
      />
    </AdminLayout>
  );
}

export default AdUser