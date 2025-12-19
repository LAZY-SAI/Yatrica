import ParallelBackground from "../components/Parallel"

const Landing = () => {
  return (
    <div className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space ">
     <div className="bg-white z-10"></div>
      <ParallelBackground />
      
    </div>
  );
};

export default Landing;
