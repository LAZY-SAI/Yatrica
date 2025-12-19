
import { Route, Routes, useLocation } from "react-router-dom";
import Land from "./section/Landing";
import About from "./section/About";
import Popular from "./section/Popular";
import Feature from "./section/Feature";
import Signup from "./pages/user/signup/Signup";
import Footer from "./section/Footer";
import Userdash from "./pages/user/UserDash";
import UserRoutes from "./routes/UserRoute"; 
import Nav from "./components/Nav";
import Discover from "./pages/user/discover/Discover";
import Post from "./pages/user/post/Post";
import Profile from "./pages/user/profile/Profile";
import AdminDash from "./pages/admin/AdminDash";
import AdUser from "./pages/admin/admin.user";
import Adestination from "./pages/admin/admin.destination";
import Notify from './pages/admin/admin.notify';
import Adsetting from './pages/admin/admin.setting';

const App = () => {
  const location = useLocation();

  const hideFooterRoutes = [
    "/signup",
    "/userdash",
    "/plan",
    "/profile",
    "/posts",
    "/discover",
    "/admindash",
    "/admin-users",
    "/admin-destination",
    "/admin-trip",
    "/admin-notify",
    "/admin-setting",
    "/plan/create",
    "/plan/set",
    "/plan/preview"
  ];
  
  const showNavRoutes = [
    "/userdash",
    "/plan",
    "/profile",
    "/posts",
    "/discover",

  ];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
  const shouldShowNav = showNavRoutes.includes(location.pathname);

  return (
    <>
      <div className="container mx-auto max-w-8xl">
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
          <Route path="/discover" element={<Discover />} />
          
          {/* User planning routes with wildcard */}
          <Route path="/plan/*" element={<UserRoutes />} />
          
          <Route path="/posts" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admindash" element={<AdminDash />} />
          <Route path="admin-users" element={<AdUser />} /> 
          <Route path="/admin-destination" element={<Adestination />} />
          <Route path="/admin-notify" element={<Notify />} />
          <Route path="/admin-setting" element={<Adsetting />} />
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