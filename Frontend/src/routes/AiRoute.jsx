import { Routes, Route } from 'react-router-dom';
import Ai from '../pages/user/plan/AI/AI'
import Preference from '../pages/user/plan/AI/Preference';
import Review from '../pages/user/plan/AI/Review'
import Final from '../pages/user/plan/AI/Final.jsx'
const AiRoute = () => {
  return (
  <Routes>
    <Route  index element={<Ai/>}/>
    <Route path='preference' element={<Preference />}/>
    <Route path='Review' element ={<Review/>}/>
    <Route path='Final' element ={<Final/>}/>
  </Routes>
  )
}

export default AiRoute