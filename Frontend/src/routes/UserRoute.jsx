import { Routes, Route } from 'react-router-dom';
import Plan from '../pages/user/plan/Plan';
import Create from '../pages/user/plan/Create';
import SetTripDetails from '../pages/user/plan/Set'
import Preview from '../pages/user/plan/Preview'
import UserPlan from '../pages/user/plan/UserPlan'

const UserRoutes = () => {
  return (
    <Routes>
      {/* /plan renders Plan component/ parent route */}
      <Route index element={<Plan />} />
    
      
      {/* /plan/create renders Create component */}
      <Route path="create" element={<Create />} />
      <Route path="set" element={<SetTripDetails />}/>
      <Route path="preview" element={<Preview/>}/>
      <Route path="myplan" element={<UserPlan/>}/>
     
    </Routes>
  );
};

export default UserRoutes;