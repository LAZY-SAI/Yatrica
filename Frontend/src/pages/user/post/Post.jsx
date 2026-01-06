import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FiMapPin, FiShare2, FiExternalLink } from "react-icons/fi";
import PostPop from "./PostPop";
const Post = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 const [isPopOpen, setIsPopOpen] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    const fetchPosts = async () => {
      try {
        const response = await fetch("api/person.json");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const structuredData = data.map((post) => ({
          ...post,
          images: Array.isArray(post.images) ? post.images : [post.images],
        }));

        setPosts(structuredData); // Update state with fetched data
      } catch (error) {
        console.error("Could not fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-white">
      {/* Header */}
      <div className="w-full  border-b border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="text-2xl font-bold text-white">
              Community Post
            </span>
            <div className="flex space-x-2 text-sm">
              <button className="px-3 py-1 bg-emerald-700 p-2 rounded-lg hover:bg-emerald-900 transition-colors duration-200 ">
                Community posts
              </button>
              <button className="px-3 py-1 text-gray-400 hover:text-white transition-colors">
                Itineraries
              </button>
              <button className="px-3 py-1 text-gray-400 hover:text-white transition-colors">
                Questions
              </button>
            </div>
          </div>
          <button 
          onClick={() => { setIsPopOpen(true) }} 
          className="bg-emerald-700 p-2 rounded-lg text-white px-4 py-2  font-semibold flex items-center hover:bg-teal-700 transition-colors">
            <FaEdit className="mr-2" /> Post
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-grow max-w-7xl mx-auto w-full mt-6">
        {/* Posts Section */}
        <section className="flex-grow flex flex-col space-y-6 px-4">
          {isLoading ? (
            <div className="text-gray-500 text-center py-10">
              Loading posts...
            </div>
          ) : (
            posts.map((item) => (
              <div
                key={item.id}
                className=" bg-[#192c3b89] p-4 rounded-lg shadow-lg"
              >
                {/* Post Header */}
                <div className="flex items-center mb-3">
                  {/**profile */}
                  <div className="w-10 h-10 rounded-full bg-gray-600 mr-3"></div>
                  <div>
                    <span className="font-semibold text-lg text-white">
                      {item.name}
                    </span>
                    <p className="text-gray-400 text-sm">{item.title}</p>
                  </div>

                  <span className="ml-auto text-gray-500 text-sm">
                    1 day ago
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {/* Example tag: */}
                  <span className="bg-emerald-700 p-2  text-gray-300 text-xs px-3 py-1 rounded-full">
                    Travel
                  </span>
                </div>

                {/* Post Images */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {Array.isArray(item.images) &&
                    item.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Post image ${index + 1}`}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    ))}
                </div>

                {/* Post Actions */}
                <div className="flex justify-between items-center  text-sm mt-4">
                  <span>{item.likes} likes</span>
                  <div className="flex space-x-4">
                    <button className="flex items-center bg-emerald-700 p-2 rounded-lg hover:bg-emerald-900 transition-colors duration-200 ">
                      <FiMapPin className="mr-1" /> Map
                    </button>
                    <button className="flex items-center bg-emerald-700 p-2 rounded-lg hover:bg-emerald-900 transition-colors duration-200 ">
                      <FiShare2 className="mr-1" /> Share
                    </button>
                    <button className="flex items-center bg-emerald-700 p-2 rounded-lg hover:bg-emerald-900 transition-colors duration-200  ">
                      <FiExternalLink className="mr-1" /> Visit
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        <aside className="w-80 ml-8 px-4 py-2 hidden lg:block">
          <div className=" bg-[#192c3b89] p-4 rounded-lg shadow-lg mb-6">
            <h3 className="font-semibold text-white text-lg mb-3">Filters</h3>
            <div className="flex flex-wrap gap-2 mb-4 text-sm">
              <button className="px-3 py-1 bg-emerald-700 p-2 rounded-lg">
                All posts
              </button>
              <button className="px-3 py-1 bg-emerald-700 p-2 rounded-lg ">
                Slow travel
              </button>
            </div>
          </div>
          <div className=" bg-[#192c3b89] p-4 rounded-lg shadow-lg">
            <h3 className="   font-semibold text-white text-lg mb-3">
              Trending destinations
            </h3>
            {/* ... trending list items ... */}
          </div>
        </aside>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-800 py-3 px-4 shadow-lg lg:hidden">
        <div className="max-w-7xl mx-auto flex justify-around items-center text-gray-400 text-sm"></div>
      </nav>


      <PostPop
      isOpen={isPopOpen}
      onClose={()=>setIsPopOpen(false)}
      />
    </div>
  );
};

export default Post;
