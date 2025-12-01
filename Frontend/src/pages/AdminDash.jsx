import AdminNav from "../components/AdminNav";

const settingRow = ({
  IconComponent,
  title,
  subtitle,
  value,
  actionText,
  actionColor = "text-emerald-500",
  valueColor = "text-gray-400",
  titleClass = "text-white",
}) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0">
    <div className="flex items-start">
      <div className="w-5 h-5 mr-3 mt-1 text-emerald-500">{IconComponent}</div>
      <div>
        <p className={`font-medium ${titleClass}`}>{title}</p>
        <p className="text-gray-500 text-xs mt-0.5">{subtitle}</p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <span className={`text-sm ${valueColor}`}>{value}</span>
      <button
        className={`text-sm font-semibold ${actionColor} hover:opacity-80 transition`}
      >
        {actionText}
      </button>
    </div>
  </div>
);
const AdminDash = () => {
  const CARD_BG_COLOR ="bg-[#192c89]"
  const SECTION_PADDING = "p-4 sm:p-6"
  return (
    <div className=" flex justify-center p-4 min-h-screen text-white">
      <div className="grid grid-cols-[20px_1fr]">
        <aside className="bg-gray-800 p-4">
          <AdminDash/>
        </aside>
        <main className="p-6 space-y-6">
          <div className="flex justify-between">
            

          </div>
        </main>

      </div>

    </div>
  );
};

export default AdminDash;
