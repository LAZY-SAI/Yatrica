import { useEffect } from "react";

const Model = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) {
    return null;
  }

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg p-6 mx-4 bg-gray-700 rounded-xl shadow-2xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6 border-b pb-2">
          <h2 className="text-xl font-bold ">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-600 transition-colors focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Model;
