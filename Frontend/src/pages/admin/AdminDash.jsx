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
  const activity = [
    { id: 1, name: "Active Users", numbers: "18,240", percent: "+8.2%" },
    { id: 2, name: "New trips created", numbers: "4,120", percent: "+3.5%" },
    { id: 3, name: "Bookings linked", numbers: "2,843", percent: "-1.9%" },
    { id: 4, name: "Reports & flags", numbers: "134", percent: "-0.4%" },
    { id: 5, name: "System Quota", numbers: "92%", percent: "used" },
  ];

  return (
    <AdminLayout
      header={
        <header className="flex justify-between items-center pb-4 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-bold">Dashboard</h2>
            <p className="text-sm text-gray-400">
              Monitor usage and system metrics
            </p>
          </div>

          <button className="bg-emerald-700 px-3 py-1 rounded-lg">
            Export Reports
          </button>
        </header>
      }
    >
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

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Panel title={"Usage overtime"}>
            <div className="h-64  rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Usage Graph Placeholder</p>
            </div>
          </Panel>
        </div>

        <div className="col-span-1">
          <Panel title={"Changes made"} className="min-h-[322px]">
            <div className="h-64  rounded-lg flex items-center justify-center">
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
              </ul>
            </div>
          </Panel>
        </div>

        <div className="col-span-2">
          <Panel title={"Top Trips"} className="min-h-[200px]">
            <div className="p-4 justify-between items-center">
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
              </ul>
            </div>
          </Panel>
        </div>

        <div className="col-span-1">
          <Panel title="Recent admin activity" className="min-h-[200px]">
       
            <p className="text-gray-500">Recent Activity List Placeholder</p>
          </Panel>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDash;
