import { useState } from "react";
import LoggedInNavbar from "../../Admin/helper/loggedInNavbar";
import AddUser from "./userManagement/adduser";
import DeleteUser from "./userManagement/deleteUser";
import AddMedia from "./mediaManagement/addMedia";
import DeleteMedia from "./mediaManagement/deleteMedia";

const AdminDashboard=()=>{
const [getaction,setaction]=useState(0)



  return(<>
  
   <LoggedInNavbar/>
   <br />
   
     <div className="row">
      
      <div className="col-sm-4">
      <div className="card w-100" style={{backgroundColor:"#191919",color:"white"}}>
  <div className="card-body">
    <h5 className="card-title">User Management</h5>
   
   <div className="row">
 <div className="col-sm-6"> <button className="btn btn-success" style={{width:"100%"}} onClick={()=>setaction(1)} >AddUser</button></div>
 <div className="col-sm-6"> <button className="btn btn-danger" style={{width:"100%"}} onClick={()=>setaction(2)}>DeleteUser</button></div> 
 </div>
 <br />

  
  </div>
</div>
</div>

  

     
      <div className="col-sm-4">

      <div className="card w-100" style={{backgroundColor:"#191919",color:"white",height:"140px"}}>
  <div className="card-body">
    <h5 className="card-title">Media Management</h5>
      
    <div className="row">
 <div className="col-sm-6"> <button className="btn btn-success" style={{width:"100%"}} onClick={()=>setaction(3)} >Add Media</button></div>
 <div className="col-sm-6"> <button className="btn btn-danger" style={{width:"100%"}} onClick={()=>setaction(4)}>Delete Media</button></div> 
 </div>
    
  </div>
</div>


      </div>
      <div className="col-sm-4">

            <div className="card w-100" style={{backgroundColor:"#191919",color:"white",height:"176px"}}>
  <div className="card-body">
    <h5 className="card-title">Overview</h5>
   
 
  </div>
</div>

      </div>
      </div>

      { getaction==1 ? <AddUser /> : getaction==2 ? <DeleteUser/>:getaction==3 ? <AddMedia/>: <DeleteMedia/> }
    
      
  
  </>)

}

export default AdminDashboard;