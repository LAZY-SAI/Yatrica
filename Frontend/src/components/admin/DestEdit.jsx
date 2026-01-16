import { useState, useEffect } from "react";
import Model from "../Model";
import { ToastContainer, toast } from "react-toastify";

const FormSection = ({ title, children }) => (
  <div className="mb-8 last:mb-0">
    <h3 className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border-b border-gray-800 pb-2">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      {children}
    </div>
  </div>
);

const Toggle = ({ label, name, checked, onChange }) => (
  <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
    <span className="text-xs font-medium text-gray-400">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-10 h-5 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600 peer-checked:after:bg-white"></div>
    </label>
  </div>
);

const defaultState = {
  name: "",
  type: "NATURAL",
  shortDescription: "",
  description: "",
  country: "",
  district: "",
  province: "",
  municipality: "",
  latitude: "",
  longitude: "",
  averageDurationHours: 0,
  entranceFeeLocal: 0,
  entranceFeeForeign: 0,
  category: null,
  subCategory: null,
  bestSeason: null,
  safetyLevel: 1,
  difficultyLevel: "EASY",
  tags: "",
  hasParking: false,
  hasRestrooms: false,
  hasDrinkingWater: false,
  hasWifi: false,
  hasGuideServices: false,
};

const DestEdit = ({ isOpen, onClose, onSave, destId }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultState);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!destId || !isOpen) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URI}/destinations/${destId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();

        setFormData({
          ...defaultState,
          ...data,
          tags: Array.isArray(data.tags)
            ? data.tags.join(", ")
            : data.tags || "",
        });
      } catch (err) {
        toast.error("Failed to load destination");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [destId, isOpen, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

      if (name === "safetyLevel") {
      const val = parseInt(value, 10);
      if (value === "") {
        setFormData((prev) => ({ ...prev, [name]: "" }));
        return;
      }
      if (val < 1 || val > 5) return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name.trim(),
      type: formData.type,
      shortDescription: formData.shortDescription?.trim() || null,
      description: formData.description?.trim() || null,
      country: formData.country?.trim() || "Nepal",
      province: Number(formData.province),
      district: formData.district?.trim() || null,
      municipality: formData.municipality?.trim() || null,
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      averageDurationHours: Number(formData.averageDurationHours),
      entranceFeeLocal: Number(formData.entranceFeeLocal),
      entranceFeeForeign: Number(formData.entranceFeeForeign),
      category: formData.category || "NATURE",
      subCategory: formData.subCategory || "TREKKING",
      bestSeason: formData.bestSeason || "SUMMER",
      safetyLevel: Number(formData.safetyLevel),
      difficultyLevel: formData.difficultyLevel,
      tags:
        typeof formData.tags === "string"
          ? formData.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : formData.tags,
      hasParking: !!formData.hasParking,
      hasRestrooms: !!formData.hasRestrooms,
      hasDrinkingWater: !!formData.hasDrinkingWater,
      hasWifi: !!formData.hasWifi,
      hasGuideServices: !!formData.hasGuideServices,
     
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URI}/update/destinations/${destId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        toast.success('destinaton updated')
        const updatedData = {
          ...payload,
          id:destId
        }
   
        if (onSave) onSave(updatedData);
        onClose();
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
    
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this destination? This action cannot be undone."
      )
    )
      return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URI}/delete/destination/${destId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        toast.success("Destination deleted");
      
        if (onSave) onSave(destId, true); // Refresh the list
        onClose();
      }
    } catch (error) {
      toast.error("Delete failed");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-xl text-white text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-gray-600";
  const labelClass =
    "block text-[10px] font-bold uppercase text-gray-500 mb-1.5 ml-1 tracking-wider";

  return (
    <Model isOpen={isOpen} onClose={onClose} title="Edit Destination">
     
      <form
        onSubmit={handleSubmit}
        className="max-h-[75vh] overflow-y-auto px-4 py-2 custom-scrollbar scroll-smooth"
      >
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center space-y-4">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm animate-pulse">
              Loading destination data...
            </p>
          </div>
        ) : (
          <>
            <FormSection title="General Information">
              <div className="md:col-span-2">
                <label className={labelClass}>Destination Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Short Tagline</label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription || ""}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Full Description</label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description || ""}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div>
                <label className={labelClass}>Primary Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="NATURAL">NATURAL</option>
                  <option value="CULTURAL">CULTURAL</option>
                  <option value="ADVENTURE">ADVENTURE</option>
                  <option value="RELIGIOUS">RELIGIOUS</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags || ""}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="hiking, nature, water"
                />
              </div>
            </FormSection>

            <FormSection title="Location Details">
              <div>
                <label className={labelClass}>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country || ""}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Province</label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select Province</option>
                  {[1, 2, 3, 4, 5, 6, 7].map((p) => (
                    <option key={p} value={p}>
                      Province {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district || ""}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Municipality</label>
                <input
                  type="text"
                  name="municipality"
                  value={formData.municipality || ""}
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
                  value={formData.latitude}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Longitude</label>
                <input
                  type="number"
                  step="any"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </FormSection>
            <FormSection title="Classification">
              <div>
                <label className={labelClass}>Category</label>
                <select
                  name="category"
                  value={formData.category || ""}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select Category</option>
                  <option value="NATURE">Nature</option>
                  <option value="TREKKING">Trekking</option>
                  <option value="CULTURE">Culture</option>
                  <option value="RELIGIOUS">Religious</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>SubCategory</label>
                <select
                  name="subCategory"
                  value={formData.subCategory || ""}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select SubCategory</option>
                  <option value="HIKING">Hiking</option>
                  <option value="CLIMBING">Climbing</option>
                  <option value="CAMPING">Camping</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Best Season</label>
                <select
                  name="bestSeason"
                  value={formData.bestSeason || ""}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select Season</option>
                  <option value="SPRING">Spring</option>
                  <option value="SUMMER">Summer</option>
                  <option value="AUTUMN">Autumn</option>
                  <option value="WINTER">Winter</option>
                </select>
              </div>
            </FormSection>

            <FormSection title="Pricing & Difficulty">
              <div>
                <label className={labelClass}>Average Duration (Hrs)</label>
                <input
                  type="number"
                  name="averageDurationHours"
                  value={formData.averageDurationHours}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Safety Level (1-5)</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  name="safetyLevel"
                  value={formData.safetyLevel}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Difficulty Level</label>
                <select
                  name="difficultyLevel"
                  value={formData.difficultyLevel}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="EASY">EASY</option>
                  <option value="MODERATE">MODERATE</option>
                  <option value="HARD">HARD</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Entrance Fee (Local)</label>
                <input
                  type="number"
                  name="entranceFeeLocal"
                  value={formData.entranceFeeLocal}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Entrance Fee (Foreign)</label>
                <input
                  type="number"
                  name="entranceFeeForeign"
                  value={formData.entranceFeeForeign}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </FormSection>

            <FormSection title="Facilities">
              <Toggle
                label="WiFi Access"
                name="hasWifi"
                checked={formData.hasWifi}
                onChange={handleChange}
              />
              <Toggle
                label="Parking"
                name="hasParking"
                checked={formData.hasParking}
                onChange={handleChange}
              />
              <Toggle
                label="Restrooms"
                name="hasRestrooms"
                checked={formData.hasRestrooms}
                onChange={handleChange}
              />
              <Toggle
                label="Drinking Water"
                name="hasDrinkingWater"
                checked={formData.hasDrinkingWater}
                onChange={handleChange}
              />
              <div className="md:col-span-2">
                <Toggle
                  label="Professional Guide Services"
                  name="hasGuideServices"
                  checked={formData.hasGuideServices}
                  onChange={handleChange}
                />
              </div>
            </FormSection>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-10 pb-6 border-t border-gray-800 mt-4">
          <button
            type="button"
            onClick={handleDelete}
            className="text-red-500/70 hover:text-red-500 text-[11px] font-bold uppercase tracking-widest transition-all"
          >
            Delete Destination
          </button>

          <div className="flex gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 md:flex-none px-6 py-2.5 text-gray-400 hover:text-white transition-colors text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 md:flex-none px-10 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
            >
              Update Destination
            </button>
          </div>
        </div>
      </form>
    </Model>
  );
};

export default DestEdit;
