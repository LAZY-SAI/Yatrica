import { useState } from "react";
import Model from "../../../components/Model";

const PostPop = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    picture: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
  
      if (file && file.type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, [name]: file }));
      } else {
        alert("Please select a valid image file.");
        e.target.value = ""; 
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputClass =
    "w-full px-4 py-2 border-t-0 border-l-0 border-r-0 border-b-1 border-gray-300 focus:border-blue-500 outline-none transition-all";
  const labelClass = "block text-sm font-semibold mb-1";

  return (
    <Model isOpen={isOpen} onClose={onClose} title={"Share Your Experience"}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            className={inputClass}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Caption</label>
          <textarea
            name="caption"
            placeholder="Tell us about it..."
            value={formData.caption}
            onChange={handleChange}
            className={`${inputClass} min-h-[100px]`}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Picture</label>
          <input
            type="file"
            name="picture"
            accept="image/*" 
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

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
  );
};

export default PostPop;