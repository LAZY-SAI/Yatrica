import React from "react";
import { FaArrowLeft, FaCheckCircle, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Preview = () => {
  const navigate = useNavigate();

  const tripStats = [
    { title: "Destination", value: "Tokyo, Japan", sub: "Primary city · Urban, food, culture" },
    { title: "Dates", value: "Not set yet", sub: "Exact dates · ~6 nights (flexible)" },
    { title: "Travelers", value: "3 travelers · 1 room", sub: "2 adults · 1 child · Mid-range stays" },
    { title: "Budget & Pace", value: "$2,400 total - balanced", sub: "~$800 per person · flights not included" },
  ];

  const days = [
    { day: "D1", title: "Arrival & settle in", desc: "Check-in · nearby dinner suggestions", tag: "Light day", tagColor: "bg-emerald-900/50 text-emerald-400" },
    { day: "D2", title: "City highlights", desc: "Landmarks, neighborhoods, must-try food", tag: "Busy", tagColor: "bg-green-900/50 text-green-400" },
    { day: "D3", title: "Neighborhoods & markets", desc: "Local spots, markets, optional tours", tag: "Balanced", tagColor: "bg-emerald-800/50 text-emerald-300" },
    { day: "D4", title: "Free day", desc: "Open day with soft suggestions", tag: "Flexible", tagColor: "bg-teal-900/50 text-teal-400" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8 font-sans">
      
     

      <header className="max-w-6xl mx-auto flex gap-4 items-end mb-8">
         <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:text-white transition-colors">
          <FaArrowLeft /> 
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Review your trip</h1>
          <p className="text-slate-400">Double-check dates, travelers, and budget before creating your trip.</p>
        </div>
        <div className="flex gap-4 items-center p-2 ml-4 border-l-1 border-gray-400">
          <button className="text-sm font-semibold hover:underline">Save as draft</button>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2 px-6 rounded-lg transition-all">
            Create trip
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Trip Details */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-[#0f172a] rounded-3xl p-6 border border-slate-800">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Trip overview</h2>
                <p className="text-slate-400 text-sm">Snapshot of where you're going and when</p>
              </div>
              <button className="text-emerald-400 text-sm font-medium hover:text-emerald-300">Edit destination</button>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {tripStats.map((item, idx) => (
                <div key={idx} className="bg-[#1e293b]/50 p-4 rounded-xl border border-slate-700 relative group">
                  <button className="absolute top-3 right-3 text-slate-500 hover:text-white"><FaEdit size={14}/></button>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{item.title}</p>
                  <p className="font-bold text-white">{item.value}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Outline Section */}
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-slate-300">Outline for your days</h3>
                  <p className="text-xs text-slate-500 italic font-light">We'll fine-tune this after creating your trip</p>
               </div>
               {days.map((item, idx) => (
                 <div key={idx} className="flex items-center justify-between py-3 border-t border-slate-800">
                   <div className="flex gap-4 items-center">
                     <span className="text-xs font-bold text-slate-500">{item.day}</span>
                     <div>
                       <p className="text-sm font-semibold text-white">{item.title}</p>
                       <p className="text-xs text-slate-400">{item.desc}</p>
                     </div>
                   </div>
                   <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${item.tagColor}`}>
                     {item.tag}
                   </span>
                 </div>
               ))}
            </div>
          </section>
        </div>

        {/* Right Column: Readiness Sidebar */}
        <aside className="space-y-6">
          <div className="bg-[#0f172a] rounded-3xl p-6 border border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-white">Trip readiness</h2>
              <span className="bg-emerald-900/30 text-emerald-400 text-[10px] px-2 py-1 rounded-md border border-emerald-800">Auto-checked</span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Estimated trip length</span>
                <span className="text-white font-bold">~6 nights</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Budget guidance</span>
                <span className="text-white font-bold">$2,400</span>
              </div>
            </div>

            <hr className="border-slate-800 mb-6" />

            <ul className="space-y-4 text-sm mb-6">
              {[
                { label: "Destination set", status: "Tokyo as main base", action: "Change" },
                { label: "Dates & trip window", status: "Exact dates not fully set", action: "Complete" },
                { label: "Travelers & rooms", status: "3 travelers · 1 room", action: "Edit" },
                { label: "Budget & style", status: "Balanced pace · mid-range", action: "Adjust" },
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <FaCheckCircle className="text-emerald-500 mt-1" />
                  <div className="flex-1">
                    <p className="font-bold text-white leading-none">{item.label}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.status}</p>
                  </div>
                  <button className="text-xs text-slate-400 hover:text-white self-start">{item.action}</button>
                </li>
              ))}
            </ul>

            <div className="bg-emerald-900/20 border border-emerald-800/50 p-4 rounded-xl text-xs text-emerald-200 mb-4">
              When you create this trip, we'll generate a draft itinerary with neighborhoods, activities, and daily suggestions.
            </div>

            <div className="bg-orange-900/20 border border-orange-800/50 p-4 rounded-xl text-xs text-orange-200 mb-6">
              You can always adjust dates, travelers, and budget later. No bookings are made automatically.
            </div>

            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-xl transition-all">
              Create my trip
            </button>
          </div>
        </aside>
      </main>

    
    </div>
  );
};

export default Preview;