import Model from "../Model";
import { useState } from "react";
import { toast } from "react-toastify";

const Popup = ({ isOpen, onClose, onSave }) => {
  const initialState = {
    name: "",
    description: "",
    shortDescription: "",
    country: "",
    district: "",
    province: "",
    municipality: "",
    type: "NATURAL",
    category: "",
    subCategory: "",
    bestSeason: "",
    difficultyLevel: "EASY",
    averageDurationHours: "",
    entranceFeeLocal: "",
    entranceFeeForeign: "",
    tags: "",
    safetyLevel: 1,
    hasParking: false,
    hasRestrooms: false,
    hasDrinkingWater: false,
    hasWifi: false,
    hasGuideServices: false,
    longitude: "",
    latitude: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "safetyLevel") {
      const val = parseInt(value, 10);
      if (value === "") {
        setFormData((prev) => ({ ...prev, [name]: "" }));
        return;
      }
      if (val < 0 || val > 5) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
const lat = Number(formData.latitude);
  const lng = Number(formData.longitude);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
     latitude: (lat >= -90 && lat <= 90) ? lat : 0,
      longitude:(lng >=-180 && lng <= 180 ) ? lng: 0,
      averageDurationHours: Number(formData.averageDurationHours) || 0,
      entranceFeeLocal: Number(formData.entranceFeeLocal) || 0,
      entranceFeeForeign: Number(formData.entranceFeeForeign) || 0,
      safetyLevel: Number(formData.safetyLevel) || 0,
      tags: formData.tags
        ? formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((t) => t !== "")
        : [],
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URI}/destination`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Destination added successfully");
        onSave(payload);
        onClose();
        setTimeout(() => setFormData(initialState), 500);
      } else {
        toast.error(data.error || "Failed to save");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again.");
    }
  };

  const inputClass =
    "w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none transition-all bg-transparent";
  const labelClass = "block text-xs font-bold uppercase text-gray-500 mb-1";

  const Toggle = ({ label, name, checked }) => (
    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );

  return (
    <Model isOpen={isOpen} onClose={onClose} title="Add New Destination">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-h-[80vh] overflow-y-auto px-2 scrollbar-hide"
      >
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={`${labelClass} flex gap-1`}>
              Destination Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border-b bg-gray-700 border-gray-300 py-2 outline-none focus:border-blue-500 "
            >
              <option value="NATURAL">NATURAL</option>
              <option value="CULTURAL">CULTURAL</option>
              <option value="ADVENTURE">ADVENTURE</option>
              <option value="RELIGIOUS">RELIGIOUS</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Difficulty</label>
            <select
              name="difficultyLevel"
              value={formData.difficultyLevel}
              onChange={handleChange}
              className="w-full bg-gray-700  border-b border-gray-300 py-2 outline-none focus:border-blue-500 "
            >
              <option value="EASY">EASY</option>
              <option value="MODERATE">MODERATE</option>
              <option value="HARD">HARD</option>
            </select>
          </div>
        </div>

        {/* Categories Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <input
              type="text"
              name="category"
              placeholder="e.g. Wildlife, Heritage"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Sub-Category</label>
            <input
              type="text"
              name="subCategory"
              placeholder="e.g. National Park, Temple"
              value={formData.subCategory}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Short Description</label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className={inputClass}
          />
          <label className={`${labelClass} mt-4`}>Full Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Location Section  */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className={`${labelClass} flex gap-2`}>Country<p className="font-bold text-red-600">*</p></label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div>
           <label className={`${labelClass} flex gap-2`}>province<p className="font-bold text-red-600">*</p></label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div>
             <label className={`${labelClass} flex gap-2`}>district<p className="font-bold text-red-600">*</p></label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Municipality</label>
            <input
              type="text"
              name="municipality"
              value={formData.municipality}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Safety (0-4)</label>
            <input
              type="number"
              name="safetyLevel"
              min="0"
              max="4"
              value={formData.safetyLevel}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Logistics Section - Added Labels */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className={labelClass}>Duration (Hrs)</label>
            <input
              type="number"
              name="averageDurationHours"
              value={formData.averageDurationHours}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Fee (Local)</label>
            <input
              type="number"
              name="entranceFeeLocal"
              value={formData.entranceFeeLocal}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Fee (Foreign)</label>
            <input
              type="number"
              name="entranceFeeForeign"
              value={formData.entranceFeeForeign}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Tags</label>
            <input
              type="text"
              name="tags"
              placeholder="nature, trek"
              value={formData.tags}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Toggle
            label="WiFi Available"
            name="hasWifi"
            checked={formData.hasWifi}
          />
          <Toggle
            label="Parking Space"
            name="hasParking"
            checked={formData.hasParking}
          />
          <Toggle
            label="Restrooms"
            name="hasRestrooms"
            checked={formData.hasRestrooms}
          />
          <Toggle
            label="Guide Services"
            name="hasGuideServices"
            checked={formData.hasGuideServices}
          />
          <Toggle
            label="Drinking Water"
            name="hasDrinkingWater"
            checked={formData.hasDrinkingWater}
          />
        </div>

        {/* Coordinates Section - Added Labels */}
        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          <div>
            <label className={labelClass}>Longitude</label>
            <input
              type="number"
              step="any"
              name="longitude"
              placeholder="-180 to 180"
              value={formData.longitude}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Latitude</label>
            <input
              type="number"
              step="any"
              name="latitude"
              placeholder="-90 to 90"
              value={formData.latitude}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6  bottom-0  pb-2">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-gray-600 font-medium hover:text-black transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-800 shadow-md transition-all active:scale-95"
          >
            Save Destination
          </button>
        </div>
      </form>
    </Model>
  );
};

export default Popup;