import { Routes, Route } from 'react-router-dom';
import Ai from '../pages/user/plan/AI/AI'
import Prefence from '../pages/user/plan/AI/Prefence';
const AiRoute = () => {
  return (
  <Routes>
    <Route  index element={<Ai/>}/>
    <Route path='preference' element={<Prefence/>}/>
    {/* <Route path='Review' element ={<Review/>}/> */}
  </Routes>
  )
}

export default AiRoute