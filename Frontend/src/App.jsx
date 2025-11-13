import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Land from './section/Landing'
import About from './section/About'
import Popular from './section/Popular'
import Feature from './section/Feature'
import Signup from './pages/Signup'
import Footer from './section/Footer'

const App = () => {
  
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
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
