import AdminLayout from "./adminLayout.jsx";
import { useState, useEffect } from 'react';

const Panel = ({ title, children, className = "" }) => (
    <div className={`bg-gray-900 p-4 rounded-xl shadow-xl ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <span className="text-xs text-emerald-400 cursor-pointer hover:underline">
        View log
      </span>
      </div>
      {children}
    </div>
);


// const BASE_URI = import.meta.env.VITE_BASE_URI;

const AdminDash = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const activity = [
    { id: 1, name: "Active Users", numbers: users?.activeUsers ?? "...", percent: "0%" },
    { id: 2, name: "New trips created", numbers: users?.destinationCount ?? "0", percent: "+3.5%" },
    { id: 3, name: "Bookings linked", numbers: users?.postCount ?? "0", percent: "-1.9%" },
    { id: 4, name: "Reports & flags", numbers: users?.pendingFlags ?? "0", percent: "-0.4%" },
    { id: 5, name: "System Quota", numbers: "92%", percent: "used" },
  ];


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        const res = await fetch(`${import.meta.env.VITE_BASE_URI}/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        setUsers(data);
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
              <div>
                <h2 className="text-xl font-bold text-white">Dashboard</h2>
                <p className="text-sm text-gray-400">
                  Monitor usage and system metrics
                </p>
              </div>
              <button className="bg-emerald-700 px-3 py-1 rounded-lg text-white">
                Export Reports
              </button>
            </header>
          }
      >
        <div className="flex space-x-4 mb-6">
          {activity.map((item) => (
              <div key={item.id} className="flex-1 bg-gray-900 p-4 rounded-xl">
                <p className="text-sm text-gray-400">{item.name}</p>
                <div className="flex justify-between items-center mt-1">

                  <p className="font-bold text-2xl text-white">{item.numbers}</p>
                  {/* <span
                      className={`text-xs font-semibold ${
                          item.percent.startsWith("+")
                              ? "text-emerald-400"
                              : item.percent.startsWith("-")
                                  ? "text-red-400"
                                  : "text-gray-400"
                      }`}
                  >
                {item.percent}
              </span> */}
                </div>
              </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Panel title={"Usage overtime"}>
              <div className="h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Usage Graph Placeholder</p>
              </div>
            </Panel>
          </div>

          <div className="col-span-1">
            <Panel title={"Changes made"} className="min-h-[322px]">
              <div className="h-64 rounded-lg flex items-center justify-center text-gray-400">
                <ul className="list-disc">
                  <li>Server Rebooted</li>
                  <li>API Keys rotated</li>
                  <li>User #124 banned</li>
                </ul>
              </div>
            </Panel>
          </div>
        </div>
      </AdminLayout>
  );
};

export default AdminDash;