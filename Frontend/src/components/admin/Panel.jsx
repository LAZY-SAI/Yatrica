

 const Panel = ({ title, subtitle, children, Opt, className = "" }) => (
  <div className={`bg-gray-900 p-4 rounded-xl shadow-xl ${className}`}>
    <div className="flex justify-between items-center mb-4">
      <span>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400 text-xs">{subtitle}</p>
      </span>
      <span className="text-xs text-emerald-400 cursor-pointer hover:underline">
        {Opt}
      </span>
    </div>
    {children}
  </div>
);
export default Panel
