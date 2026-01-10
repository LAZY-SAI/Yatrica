import { useState, useEffect } from "react";
import AdminLayout from "./adminLayout.jsx";

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

const AdminDash = () => {
  const [users, setUsers] = useState({ activeUsers: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const activity = [
    {
      id: 1,
      name: "Active Users",
      numbers: users.activeUsers ?? "0",
      percent: "0%",
    },
    { id: 2, name: "New trips created", numbers: "222", percent: "+3.5%" },
    { id: 3, name: "Bookings linked", numbers: "222", percent: "-1.9%" },
    { id: 4, name: "Reports & flags", numbers: "222", percent: "-0.4%" },
    { id: 5, name: "System Quota", numbers: "92%", percent: "used" },
    {
      id: 6,
      name: "Pending Flag",
      numbers: users.pendingFlags,
      percent: "used",
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
      console.error("No token found, redirecting to login...");
      setIsLoading(false);
      return; 
    } 
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URI}/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setIsLoading(false);
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
          <button className="bg-emerald-700 px-3 py-1 rounded-lg text-white hover:bg-emerald-600 transition-colors">
            Export Reports
          </button>
        </header>
      }
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-64 text-white">
          <p className="animate-pulse">Loading...</p>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="flex space-x-4 mb-6">
            {activity.map((item) => (
              <div key={item.id} className="flex-1 bg-gray-900 p-4 rounded-xl">
                <p className="text-sm text-gray-400">{item.name}</p>
                <div className="flex justify-between items-center mt-1">
                  <p className="font-bold text-2xl text-white">
                    {item.numbers}
                  </p>
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

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <Panel title="Usage overtime">
                <div className="h-64 rounded-lg flex items-center justify-center bg-gray-800/50">
                  <p className="text-gray-500 italic">
                    Usage Graph Placeholder
                  </p>
                </div>
              </Panel>
            </div>

            <div className="col-span-1">
              <Panel title="Changes made" className="min-h-[322px]">
                <div className="h-64 rounded-lg flex items-center justify-center text-gray-400">
                  <ul className="list-disc space-y-2">
                    <li>Server Rebooted</li>
                    <li>API Keys rotated</li>
                    <li>User #124 banned</li>
                  </ul>
                </div>
              </Panel>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDash;
