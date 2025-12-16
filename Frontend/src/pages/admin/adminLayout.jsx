import AdminNav from "../../components/admin/AdminNav";



const AdminLayout = ({ children,header,dashtitle}) => {
  return (
    <div className="min-h-screen bg-[#050f14] text-white">

      <div className="grid grid-cols-[250px_1fr]">

        {/* Sidebar */}
        <aside className="bg-[#0b171f] p-4">
          <AdminNav />
        </aside>

        
        <main className="p-6 space-y-6">

         {header ? (
            header
          ) : (
            <header className="flex justify-between items-center pb-4 border-b border-gray-700">
              <h2 className="text-xl font-bold">{dashtitle}</h2>
            </header>
          )}

       
          {children}

        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
