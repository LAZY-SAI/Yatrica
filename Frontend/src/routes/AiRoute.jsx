import { Routes, Route } from 'react-router-dom';
import Ai from '../pages/user/plan/AI/AI'
import Preference from '../pages/user/plan/AI/Preference';
import Review from '../pages/user/plan/AI/Review'
const AiRoute = () => {
  return (
  <Routes>
    <Route  index element={<Ai/>}/>
    <Route path='preference' element={<Preference />}/>
    <Route path='Review' element ={<Review/>}/>
  </Routes>
  )
}

export default AiRoute