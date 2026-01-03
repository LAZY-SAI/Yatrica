import React, { useState } from "react";
import { FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserFoot from '../../../../components/User/user.footer'
const SetTripDetails = () => {
  const navigate = useNavigate();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);

  return (
    <div className="min-h-screen bg-[#050b18] text-white p-8 font-sans">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            <FaArrowLeft className="text-white-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Set your trip details</h1>
            <p className="text-gray-400 text-sm">Choose dates, who's coming with you, and a comfortable budget.</p>
          </div>
        </div>
       
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-12 gap-8">
        {/* Left Column - Inputs */}
        <section className="col-span-12 lg:col-span-7 space-y-8">
          <div className="bg-[#0f172a] rounded-3xl p-8 border border-gray-800">
            {/* Dates Section */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Trip dates</h2>
                <span className="bg-emerald-900/30 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/30">
                  Best prices in June
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-xs uppercase text-gray-500 font-bold mb-2 block">Start Date</label>
                  <input type="date" className="bg-transparent border-b border-gray-700 w-full py-2 outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="text-xs uppercase text-gray-500 font-bold mb-2 block">End Date (Optional)</label>
                  <input type="date" className="bg-transparent border-b border-gray-700 w-full py-2 outline-none focus:border-emerald-500" />
                </div>
              </div>
            </div>

            <hr className="border-gray-800 mb-10" />

            {/* Travelers Section */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Travelers</h2>
              <p className="text-gray-400 text-sm mb-8">Who's joining this trip?</p>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Adults</p>
                    <p className="text-xs text-gray-500">18+</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setAdults(Math.max(1, adults - 1))} className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800"><FaMinus size={12}/></button>
                    <span className="w-4 text-center">{adults}</span>
                    <button onClick={() => setAdults(adults + 1)} className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800"><FaPlus size={12}/></button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Children</p>
                    <p className="text-xs text-gray-500">0-17</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800"><FaMinus size={12}/></button>
                    <span className="w-4 text-center">{children}</span>
                    <button onClick={() => setChildren(children + 1)} className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800"><FaPlus size={12}/></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column - Summary */}
        <section className="col-span-12 lg:col-span-5">
          <div className="bg-[#0f172a] rounded-3xl p-8 border border-gray-800 sticky top-8">
            <h2 className="text-xl font-semibold mb-6">Quick summary</h2>
            
            <div className="space-y-6">
              <div className="flex justify-between border-b border-gray-800 pb-4">
                <span className="text-gray-400">Trip window</span>
                <span className="text-right">Not set yet<br/><span className="text-xs text-gray-500">Exact dates</span></span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-4">
                <span className="text-gray-400">Group size</span>
                <span>{adults + children} travelers</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-4">
                <span className="text-gray-400">Budget guidance</span>
                <span className="font-bold text-emerald-400">$2,400 total</span>
              </div>
            </div>

            <div className="mt-8 bg-emerald-900/20 p-4 rounded-xl border border-emerald-500/20 text-sm text-emerald-400">
              We'll suggest activities, neighborhoods, and daily plans that match this budget and pace.
            </div>

            
          </div>
        </section>
      </main>
      <UserFoot nav={"preview"}/>
    </div>
  );
};

export default SetTripDetails;