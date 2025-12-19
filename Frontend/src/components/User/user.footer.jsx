import { useNavigate } from "react-router-dom";

export default function UserFoot({nav}) {
  const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 left-0 right-0 p-6 flex justify-between items-center backdrop-blur-md">
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
        <div className="w-2 h-2 rounded-full bg-gray-700"></div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 rounded-lg font-bold text-sm"
        >
          Back
        </button>

        <button
          onClick={()=>navigate(`/plan/${nav}`)}
          className="bg-[#10B981] text-black px-8 py-2 rounded-lg font-bold text-sm"
        >
          Continue
        </button>
      </div>
    </footer>
  );
}