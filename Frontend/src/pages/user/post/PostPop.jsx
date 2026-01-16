import { useState } from "react";
import { FaImage, FaTimes, FaGlobeAmericas } from "react-icons/fa";
import Model from "../../../components/Model";

const PostPop = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    picture: null,
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, [name]: file }));
        setPreview(URL.createObjectURL(file)); // Generate preview URL
      } else {
        alert("Please select a valid image file.");
        e.target.value = "";
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const clearImage = () => {
    setFormData((prev) => ({ ...prev, picture: null }));
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    // Reset form after save
    setFormData({ title: "", caption: "", picture: null });
    setPreview(null);
  };

  const inputClass =
    "w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all";
  
  const labelClass = "block text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-2 ml-1";

  return (
    <Model isOpen={isOpen} onClose={onClose} title={"New Adventure Post"}>
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
            <FaGlobeAmericas />
          </div>
          <div>
            <h3 className="text-white font-bold leading-none">Share your journey</h3>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">Yatrica Community Feed</p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title Input */}
          <div>
            <label className={labelClass}>Post Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Sunrise at Annapurna Base Camp"
              value={formData.title}
              className={inputClass}
              onChange={handleChange}
              required
            />
          </div>

          {/* Caption Input */}
          <div>
            <label className={labelClass}>Your Story</label>
            <textarea
              name="caption"
              placeholder="What made this experience special?..."
              value={formData.caption}
              onChange={handleChange}
              className={`${inputClass} min-h-[120px] resize-none`}
              required
            />
          </div>

          {/* Picture Upload / Preview Area */}
          <div>
            <label className={labelClass}>Visuals</label>
            {!preview ? (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-800 rounded-2xl cursor-pointer bg-gray-900/30 hover:bg-gray-900/50 hover:border-emerald-500/50 transition-all group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaImage className="text-3xl text-gray-600 group-hover:text-emerald-500 transition-colors mb-3" />
                  <p className="text-xs font-bold text-gray-500 group-hover:text-gray-300 transition-colors">Click to upload photo</p>
                  <p className="text-[10px] text-gray-700 mt-1 uppercase tracking-tighter">JPG, PNG or WEBP</p>
                </div>
                <input
                  type="file"
                  name="picture"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                  required
                />
              </label>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-gray-800 h-38">
                <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 right-2 p-1 bg-black/60 backdrop-blur-md text-white rounded-lg hover:bg-red-500 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-800/50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-900/30 transition-all active:scale-95"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </Model>
  );
};

export default PostPop;