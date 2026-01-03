import AiLayout from "./AiLayout";

const Preference = () => {
  const options = [
    { id: 1, name: "Cafe & Coffee culture" },
    { id: 2, name: "Local food spots" },
    { id: 3, name: "Iconic landmarks" },
    { id: 4, name: "Night Life" },
    { id: 5, name: "Arts & Design" },
    { id: 6, name: "Nature & viewpoints" },
  ];

  const edibles = [
    { id: 1, name: "Street foods" },
    { id: 2, name: "Casual local restaurants" },
    { id: 3, name: "Fine dining" },
    { id: 4, name: "Bars" },
    { id: 5, name: "Coffee & Bakeries" },
  ];

  return (
    <AiLayout
      currentStep={2}
      title="Preferences"
      subtitle="Fine-tune your experience"
      HeaderTitle={"Tell Us What You Love"}
    >
      <div className="space-y-10 max-w-2xl">
        <header>
          <h2 className="font-bold text-2xl mb-1">
            What should we prioritize?
          </h2>
          <p className="text-gray-400">Choose as many as you like</p>
        </header>

        {/* Experiences Section */}
        <section>
          <h3 className="text-gray-300 font-medium mb-4">Experiences</h3>

          <div className="flex flex-wrap gap-3">
            {options.map((item) => (
              <button
                key={item.id}
                className="px-5 py-2 rounded-full border border-zinc-700 bg-emerald-800 text-zinc-300 hover:border-emerald-500 hover:text-emerald-400 transition-all text-sm whitespace-nowrap"
              >
                {item.name}
              </button>
            ))}
          </div>
        </section>

        {/* Foods and Drinks Section */}
        <section>
          <h3 className="text-gray-300 font-medium mb-4">Foods & Drinks</h3>
          <div className="flex flex-wrap gap-3">
            {edibles.map((item) => (
              <button
                key={item.id}
                className="px-5 py-2 rounded-full border border-zinc-700 bg-emerald-800 text-zinc-100 hover:border-emerald-500 hover:text-emerald-400 transition-all text-sm whitespace-nowrap"
              >
                {item.name}
              </button>
            ))}
          </div>
        </section>

        <button className="w-full mt-8 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-colors">
          View my itinerary
        </button>
      </div>
    </AiLayout>
  );
};

export default Preference;
