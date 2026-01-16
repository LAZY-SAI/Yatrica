import Model from "../Model";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  FaCloudUploadAlt,
  FaTimes,
  FaMapMarkerAlt,
  FaInfoCircle,
} from "react-icons/fa";

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
    images: null,
  };

  const [formData, setFormData] = useState(initialState);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (file) {
        if (file.size > 10 * 1024 * 1024) {
          return toast.error("File size must be less than 10MB");
        }
        setFormData((prev) => ({ ...prev, images: file }));
        setPreview(URL.createObjectURL(file));
      }
      return;
    }

    if (name === "safetyLevel") {
      const val = parseInt(value, 10);
      if (value === "") {
        setFormData((prev) => ({ ...prev, [name]: "" }));
        return;
      }
      if (val < 0 || val > 4) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const destinationData = { ...formData };
    delete destinationData.images;
    destinationData.tags = formData.tags
      ? formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t !== "")
      : [];

    try {
      const createRes = await fetch(
        `${import.meta.env.VITE_API_URI}/create/destination`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(destinationData),
        }
      );

      const createdData = await createRes.json();

      if (!createRes.ok) {
        toast.error(createdData.error || "Failed to create destination");
        return;
      }

      if (formData.images) {
        const imageForm = new FormData();
        imageForm.append("Form", formData.images);
       

        const uploadRes = await fetch(
          `${import.meta.env.VITE_API_URI}/destinations/uploadfile`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: imageForm,
          }
        );

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) {
          toast.error(uploadData.error || "Image upload failed");
          return;
        }
      }

      toast.success("Destination added successfully");
      onSave(createdData.content);
      onClose();
      setPreview(null);
      setTimeout(() => setFormData(initialState), 500);
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again.");
    }
  };

  const inputClass =
    "w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 outline-none transition-all bg-transparent text-white";
  const labelClass = "block text-xs font-bold uppercase text-gray-500 mb-1";

  const Toggle = ({ label, name, checked }) => (
    <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
      <span className="text-xs font-medium text-gray-400">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleChange}
          className="sr-only peer"
        />
        <div className="w-10 h-5 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600 peer-checked:after:bg-white"></div>
      </label>
    </div>
  );

  return (
    <Model isOpen={isOpen} onClose={onClose} title="Add New Destination">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-h-[80vh] overflow-y-auto px-4 scrollbar-hide  text-white"
      >
        {/* Image Upload Section */}
        <div className="space-y-2">
          <label className={labelClass}>Cover Photo</label>
          <div
            onClick={() => fileInputRef.current.click()}
            className="relative border-2 border-dashed border-gray-700 rounded-2xl h-52 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800/50 transition-all overflow-hidden"
          >
            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-sm font-bold">
                    Click to change
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                  className="absolute top-3 right-3 p-2 bg-red-600 rounded-full text-white hover:bg-red-700 z-10 shadow-lg"
                >
                  <FaTimes size={14} />
                </button>
              </>
            ) : (
              <div className="text-center p-6">
                <FaCloudUploadAlt className="mx-auto text-5xl text-blue-500 mb-3" />
                <p className="text-sm text-gray-300 font-semibold">
                  Upload Destination Image
                </p>
                <p className="text-[10px] text-gray-500 uppercase mt-1">
                  Recommended: 1200x800px (Max 10MB)
                </p>
              </div>
            )}
            <input
              type="file"
              name="image"
              ref={fileInputRef}
              onChange={handleChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

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
              placeholder="e.g. Everest Base Camp"
            />
          </div>
          <div>
            <label className={labelClass}>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border-b bg-gray-800 border-gray-700 text-white py-2 outline-none focus:border-blue-500"
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
              className="w-full bg-gray-800 border-b border-gray-700 text-white py-2 outline-none focus:border-blue-500"
            >
              <option value="EASY">EASY</option>
              <option value="MODERATE">MODERATE</option>
              <option value="HARD">HARD</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <input
              type="text"
              name="category"
              placeholder="e.g. Wildlife"
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
              placeholder="e.g. National Park"
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
            placeholder="A brief catchy summary..."
            className={inputClass}
          />
          <label className={`${labelClass} mt-4`}>Full Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Detailed overview of the destination..."
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Location Section */}
        <div className="p-4 bg-gray-900/50 rounded-2xl border border-gray-800 space-y-4">
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <FaMapMarkerAlt size={14} />
            <span className="text-xs font-bold uppercase">
              Location Details
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Country *</label>
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
              <label className={labelClass}>Province *</label>
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
              <label className={labelClass}>District *</label>
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
              <label className={labelClass}>Municipality *</label>
              <input
                type="text"
                name="municipality"
                value={formData.municipality}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>longitude *</label>
              <input
                type="number"
                name="longitude"
                placeholder="-180 to 180"
                value={formData.longitude}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>latitude *</label>
              <input
                type="number"
                name="latitude"
                placeholder="-90 to 90"
                value={formData.latitude}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Logistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className={labelClass}>Duration (Hrs) *</label>
            <input
              type="number"
              name="averageDurationHours"
              value={formData.averageDurationHours}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Local Fee</label>
            <input
              type="number"
              name="entranceFeeLocal"
              value={formData.entranceFeeLocal}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Foreign Fee</label>
            <input
              type="number"
              name="entranceFeeForeign"
              value={formData.entranceFeeForeign}
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

        {/* Amenities Toggles */}
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

        {/* Footer Actions */}
        <div className="flex justify-end space-x-4 pt-8 pb-4 border-t border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-gray-400 font-medium hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-10 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-95"
          >
            Save Destination
          </button>
        </div>
      </form>
    </Model>
  );
};

export default Popup;
