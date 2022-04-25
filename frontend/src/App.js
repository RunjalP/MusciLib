import {BrowserRouter ,Routes,Route} from "react-router-dom"
import { isAuthenticated } from "./Auth/helper"
import Home from "./User/helper/Home";
import Signin from "./User/helper/Signin";
import UserDashboard from "./Admin/helper/userDashboard";
import UserPlay from "./Admin/helper/userPlay";
import ProtectedRoutes from "./Auth/helper/protectedRoutes";
import UserProfile from "./Admin/helper/userProfile";
import AdminDashboard from "./Core/helper/adminDashboard";
function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
      
<Route path="/" exact  element={<Home/>}></Route>
<Route path="signin" exact  element={<Signin/>}></Route>
<Route  element={<ProtectedRoutes/>}>
      
   <Route path="userDashboard" exact  element={<UserDashboard />}></Route>
   <Route path="listen" exact  element={<UserPlay />}></Route>
   <Route path="userprofile" exact element={<UserProfile/>} ></Route>
   <Route path="adminDashboard" exact element={<AdminDashboard />} ></Route>
   
   </Route>



 
    
   






  </Routes>
   
  
  </BrowserRouter>
  
  </>
  );
}

export default App;
