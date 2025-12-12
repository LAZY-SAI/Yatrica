import AdminLayout from "./adminLayout";

const Setting = () => {

    const sectionTitleClass = "font-bold text-2xl text-white";
  
  const infoLabelClass = "block text-sm font-medium text-gray-400";
  
  const infoValueClass = "text-lg font-semibold text-white mt-0.5";

  return (
    <AdminLayout header={
      <header className="flex justify-between items-center pb-4 border-b border-gray-700">
        <div>
          <h2 className="text-xl font-bold text-white">
            Admin Settings
          </h2>
          <p className="text-sm text-gray-400">Manage account information and security preferences.</p>
        </div>
        <button 
          className="bg-emerald-700 hover:bg-emerald-600 p-3 rounded-lg text-white font-semibold transition-colors"
          disabled
        >
          Edit
        </button>
      </header>
    }>

      <div className="space-y-10 mt-6">
        
        <section className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className={sectionTitleClass + " mb-6"}>Profile Information</h2>

          {/* Profile Card / Avatar */}
          <div className="flex items-center gap-6 pb-6 border-b border-gray-700/50 mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center text-xl font-bold text-gray-300">
              CC
            </div>
            
            <div className="flex-col mr-auto">
              <h2 className="font-semibold text-xl text-white">Cup Coffee</h2>
              <p className="text-gray-400 text-sm">Status: Administrator</p>
            </div>

            <button className="bg-emerald-600 hover:bg-emerald-500 p-2 px-4 rounded-lg text-white text-sm font-medium transition-colors">
              Change Picture
            </button>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            
            {/* Name */}
            <div>
              <label className={infoLabelClass}>Full Name</label>
              <p className={infoValueClass}>Cup Coffee</p>
            </div>

            {/* Email */}
            <div>
              <label className={infoLabelClass}>Email Address</label>
              <p className={infoValueClass}>Cup@aaa.com</p>
            </div>

            {/* Role */}
            <div>
              <label className={infoLabelClass}>Role</label>
              <p className={infoValueClass + " text-emerald-400"}>Admin</p>
            </div>
            
            {/* Language */}
            <div>
              <label className={infoLabelClass}>Language</label>
              <p className={infoValueClass}>English (US)</p>
            </div>

            {/* Placeholder / Future Field */}
            <div>
              <label className={infoLabelClass}>Timezone</label>
              <p className={infoValueClass}>UTC +5:45 (Kathmandu)</p>
            </div>
            
          </div>
        </section>

        
        {/* 2. SECURITY SECTION */}
        
        <section className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className={sectionTitleClass}>Security</h2>
          <p className="text-gray-400 text-sm mb-6">Manage login credentials and security features.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            
            {/* Password */}
            <div>
              <label className={infoLabelClass}>Password</label>
              <div className="flex items-center mt-0.5">
                <input 
                  type="password" 
                  name="password"
                  defaultValue="••••••••••••" 
                  className="bg-transparent border-b border-gray-600 py-1 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  disabled
                />
                <button className="ml-4 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors" disabled>
                  Change Password
                </button>
              </div>
            </div>

            
            <div>
              <label className={infoLabelClass}>Two-Factor Auth (2FA)</label>
              <p className={infoValueClass}>
                <span className="text-red-500 font-bold">Disabled</span> 
                <button className="ml-4 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors" disabled>
                  Enable 2FA
                </button>
              </p>
            </div>
            
          </div>
        </section>
        
      </div>
    </AdminLayout>
  )
}

export default Setting;