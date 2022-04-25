import { isAuthenticated } from ".";

import  {Navigate,Outlet} from "react-router-dom"
const ProtectedRoutes=()=>{
let isAuth=isAuthenticated();
return isAuth && isAuth.token ? <Outlet/> :<Navigate to="signin"/>


}

export default ProtectedRoutes;