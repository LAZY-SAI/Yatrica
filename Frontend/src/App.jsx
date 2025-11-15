import { Route, Routes, useLocation } from 'react-router-dom'
import Land from './section/Landing'
import About from './section/About'
import Popular from './section/Popular'
import Feature from './section/Feature'
import Signup from './pages/Signup'
import Footer from './section/Footer'
import Userdash from "./pages/UserDash"

const App = () => {
  const location = useLocation();


  const hideFooterRoutes = ["/signup", "/userdash"];
  
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <div className="container mx-auto max-w-7xl">
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
        </Routes>
      </div>

     
      {!shouldHideFooter && <Footer />}
    </>
  )
}

export default App
