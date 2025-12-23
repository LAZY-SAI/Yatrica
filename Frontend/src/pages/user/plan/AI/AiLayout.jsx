import { FaArrowLeft } from 'react-icons/fa'; // Fixed import
 import { useNavigate } from 'react-router-dom';

const AiLayout = ({ children, title, subtitle, currentStep = 1 }) => {
    const navigate = useNavigate()

  const options = [
    { id: 1, name: "1. Vibe & constraints" },
    { id: 2, name: "2. Preferences" },
    { id: 3, name: "3. Review itinerary" }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* 1. Top Header */}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Plan with AI</h1>
          <p className="text-gray-400 text-sm">Tell us your vibe and constraints; we'll draft a tailored itinerary.</p>
        </div>
        <button className="text-sm font-medium hover:underline">Start over</button>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* 2. Step Header Section */}
        <section className="bg-[#0a0f0d] border border-emerald-900/30 p-6 rounded-xl mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Describe your ideal trip</h2>
            <span className="bg-emerald-900 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/30">
              Step {currentStep} of 3
            </span>
          </div>
          
          {/* Horizontal Step Pills */}
          <div className="flex gap-3">
            {options.map((item) => (
              <div 
                key={item.id} 
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors
                  ${item.id === currentStep 
                    ? 'bg-emerald-900/40 border-emerald-500 text-emerald-400' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </section>

        {/* 3. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side */}
          <section className="lg:col-span-7">
            {children}
          </section>

          {/* Right Side:  */}
          <aside className="lg:col-span-5 bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl h-fit">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Live itinerary preview</h3>
              <span className="bg-emerald-600 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded text-white">AI Draft</span>
            </div>
            <p className="text-zinc-400 text-sm mb-6">We'll sketch a first draft as soon as you confirm your vibe.</p>
            
            {/* Placeholder for Preview Items */}
            <div className="space-y-4">
                <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
                    <h4 className="font-medium text-sm">Day 1 - Alfama & viewpoints</h4>
                    <p className="text-xs text-zinc-500 mt-1">Slow arrival, sunset miradouros...</p>
                </div>
               
            </div>
          </aside>
        </div>

        <div className='flex p-2 gap-4'>
            <button className='bg-gray-800 '
            onClick={()=>navigate(-1)}>Back</button>
        </div>
      </main>
    </div>
  );
};

export default AiLayout;