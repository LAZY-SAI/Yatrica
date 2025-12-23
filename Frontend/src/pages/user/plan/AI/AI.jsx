import React from 'react'
import { useNavigate } from "react-router-dom";
const AI = () => {
    const navigate = useNavigate();
  return (
    <div className='max-w-7xl flex flex-col'>
     <header className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            <FaArrowLeft className="text-white-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Ai Planner</h1>
            <p className="text-gray-400 text-sm">Tell Your Preferences and Ai will generate the itineraries for You</p>
          </div>
        </div>
      </header>
  
    </div>
  )
}

export default AI