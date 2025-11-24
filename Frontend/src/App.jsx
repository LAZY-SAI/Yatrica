import { Route, Routes, useLocation } from "react-router-dom";
import Land from "./section/Landing";
import About from "./section/About";
import Popular from "./section/Popular";
import Feature from "./section/Feature";
import Signup from "./pages/Signup";
import Footer from "./section/Footer";
import Userdash from "./pages/UserDash";
import Plan from "./pages/Plan";
import Nav from "./components/Nav";
import Discover from "./pages/Discover"
import Post from './pages/Post'
import Profile from './pages/Profile'
const App = () => {
  const location = useLocation();

  const hideFooterRoutes = ["/signup", "/userdash", "/plan", "/profile", "/posts","/discover",];
  const showNavRoutes = ["/userdash", "/plan", "/profile", "/posts", "/discover"];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
  const shouldShowNav = showNavRoutes.includes(location.pathname);

  return (
    <>
      <div className="container mx-auto max-w-8xl mb-32">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Land />
                <About />
                <Popular />
                <Feature />
              </>
            }
          />

          <Route path="/signup" element={<Signup />} />
          <Route path="/userdash" element={<Userdash />} />
          <Route path="/discover" element={<Discover/>}/>
          <Route path="/plan" element={<Plan />} />
          <Route path="/posts" element={<Post/>}/>
          <Route path="/profile" element ={<Profile/>}/>
        </Routes>
      </div>

      {/* Bottom fixed nav */}
      {shouldShowNav && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-4">
          <div className="w-full max-w-7xl">
            <Nav />
          </div>
        </div>
      )}

      {!shouldHideFooter && <Footer />}
    </>
  );
};

export default App;
