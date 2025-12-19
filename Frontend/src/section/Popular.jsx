import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const Popular = () => {
  const [popularItems, setPopularItems] = useState([]);
  useEffect(() => {
    fetch("/api/popular.json")
      .then((res) => res.json())
      .then((data) => setPopularItems(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <section className="flex-1 mt-6 px-7 mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-xl text-white headtext">
          Featured destinations
        </h2>
        <span className="text-white text-sm cursor-pointer flex items-center gap-3 hover:text-blue-300">
          See all <FaArrowRight />
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {popularItems.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className="relative w-sm rounded-2xl overflow-hidden shadow-xl cursor-pointer hover:scale-[1.03] transition-transform duration-300 group aspect-[4/3] sm:aspect-[3/2] md:aspect-[4/3] lg:aspect-[3/2]"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
              <h3 className="text-white text-lg font-semibold">{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Popular;
