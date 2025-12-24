import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AiLayout from "./AiLayout";
const AI = () => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);

  const Vibes = [
    { id: 1, name: "chill & slow" },
    { id: 2, name: "Packed Days" },
    { id: 3, name: "Foods & Drinks" },
    { id: 4, name: "Nature & Hike" },
    { id: 5, name: "culture & museum" },
  ];

  return (
    <AiLayout currentStep={1}
    subtitle={"Tell us Your Vibe & Constraints"}
    title={"Plan with Ai"}
    HeaderTitle={"Describe Your Ideal Trip"}>
      <div className="space-y-6 col-span-6">
        <section className="w-full">
          <h2 className=" font-bold text-lg">Your Vibe & Constraints</h2>
          <p className="text-m text-gray-500">
            We'll use this to shape the pace, neighbourhood picks & daily rythm
          </p>
        </section>

        <div>
          <label className="text-m text-gray-600">
            Where are you thinking of going?
          </label>
          <input
            type="text"
            placeholder="e.g. Lisbon and nearby beaches"
            className="w-full bg-gray-900 border border-zinc-800 p-2 rounded-lg focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div>
          <label>What's the overall vibe?</label>
          <div className="gap-4 flex">
            {Vibes.map((items) => {
              return (
                <div
                  key={items.id}
                  className="p-1 bg-emerald-900 rounded-xl items-center text-center"
                >
                  <p>{items.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold mb-2">Travelers</h2>
            <div className="flex gap-3  items-center">
              <div>
                <p className="font-medium">Adults</p>
                <p className="text-xs text-gray-500">18+</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800"
                >
                  <FaMinus size={12} />
                </button>
                <span className="w-4 text-center">{adults}</span>
                <button
                  onClick={() => setAdults(adults + 1)}
                  className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div>
                <p className="font-medium">Children</p>
                <p className="text-xs text-gray-500">0-17</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800"
                >
                  <FaMinus size={12} />
                </button>
                <span className="w-4 text-center">{children}</span>
                <button
                  onClick={() => setChildren(children + 1)}
                  className="p-2 border border-gray-700 rounded-lg hover:bg-gray-800"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-lg">Pace</label>
            <input
              type="text"
              placeholder="e.g 1-2 key things per day"
              className="w-full bg-gray-900 border border-zinc-800 p-2 rounded-lg focus:outline-none focus:border-emerald-500"
            />


             <label className="font-semibold text-lg">Budget</label>
            <input
              type="text"
              placeholder="NPR"
              className="w-full bg-gray-900 border border-zinc-800 p-2 rounded-lg focus:outline-none focus:border-emerald-500"
            />
          </div>

          
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-lg">Must Do's</label>
          <textarea
            type="text"
            placeholder="e.g  culture shows & dine..."
            className="w-full bg-gray-900 border border-zinc-800 p-2 rounded-lg focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>
    </AiLayout>
  );
};

export default AI;
