import {useState} from "react";
import AiLayout from "./AiLayout"

const Review = () => {
    const [isGenerating, setIsGenerating] = useState(false)
  const days = [
    { day: 1, title: "Arrival", theme: "Settle in...", activities: "Check-in, neighborhood stroll..." },
    { day: 2, title: "Baixa & Chiado", theme: "Cafes & Viewpoints", activities: "10:30 Coffee, 13:00 Lunch..." }
  ];

  return (
      <AiLayout
          currentStep={3}
          title="Review your AI itinerary"
          subtitle="Check the day-by-day plan based on your vibe before we lock things in."
          HeaderTitle="Here's what we've drafted for you"

      >
        <div className="space-y-6">
          {days.map((item) => (
              <div key={item.day} className=" border border-zinc-800 p-5 rounded-xl group hover:border-emerald-500/30 transition-colors">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <div className="text-zinc-500 font-mono text-sm">Day 0{item.day}</div>
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-zinc-400 text-sm">{item.theme}</p>
                    </div>
                  </div>
                  <button className="text-emerald-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Edit day</button>
                </div>
              </div>
          ))}
        </div>
      </AiLayout>
  );
}

export default Review