// Popup.jsx

import Model from '../Model' 
import { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";

const API_URI = import.meta.env.VITE_API_URI; 
const Popup = ({ isOpen, onClose, onSave }) => {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    place: '',
    date: '',
    region: '',
    map: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    

    const res = await fetch(`${API_URI}/admin-destination`,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        title:formData.title,
        description:formData.description,
        place:formData.place,
        date:formData.date,
        region:formData.region
      })
      
      
    })
    const data = await res.json()
    if(res.status === 201)
   {
    toast.success(data.message||"destination added successfully")
   }
    onSave(formData); 
    

    onClose(); 

    
    setFormData({
      title: '',
      description: '',
      place: '',
      date: '',
      region: '',
      map: '',
    });
  }

 
  const inputClass = 'w-full px-4 py-2 border-t-0 border-l-0 border-r-0 border-b-1 rounded-lg focus:border-blue-500 focus:border-blue-500 focus:  outline-none rounded-none transition-all';
  const labelClass = 'block text-sm font-semibold mb-1';

  return (
    <Model isOpen={isOpen} onClose={onClose} title="Add New Destination" >
      <form onSubmit={handleSubmit} className='space-y-4 '>
        
        {/* Title */}
        <div>
          <label className={labelClass}>Title</label>
          <input 
            type='text' 
            name='title' 
            value={formData.title}
            onChange={handleChange}
            placeholder='Destination name'
            required
            className={inputClass}
          />
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            rows='3'
            placeholder='Details about the trip...'
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Place */}
        <div>
          <label className={labelClass}>Place</label>
          <input 
            type='text' 
            name='place' 
            value={formData.place}
            onChange={handleChange}
            placeholder='City, Country'
            required
            className={inputClass}
          />
        </div>

        {/* Date */}
        <div>
          <label className={labelClass}>Date</label>
          <input 
            type='date' 
            name='date'
            value={formData.date}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Region */}
        <div>
          <label className={labelClass}>Region</label>
          <input 
            type='text' 
            name='region' 
            value={formData.region}
            onChange={handleChange}
            placeholder='e.g., Southeast Asia'
            className={inputClass}
          />
        </div>
        
        {/* Map Link */}
        <div>
          <label className={labelClass}>Map Link</label>
          <input 
            type='url' 
            name='map' 
            value={formData.map}
            onChange={handleChange}
            placeholder='Paste Google Maps URL'
            className={inputClass}
          />
        </div>
        
        {/* Submit and Cancel Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md transition-all"
          >
            Save Destination
          </button>
        </div>

      </form>
    </Model>
  )
}

export default Popup;