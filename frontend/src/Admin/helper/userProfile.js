import { isAuthenticated } from "../../Auth/helper";
import LoggedInNavbar from "./loggedInNavbar";

import { Link } from 'react-router-dom';
const UserProfile=()=>{
 let getdata=isAuthenticated().user;
    return(
        <>
        <LoggedInNavbar />
        <center>
            
         <i className="fa fa-user-circle-o"style={{color:"white",margin:"12px",padding:"12px",fontSize:"200px"}}></i>  
         <br />
         <span style={{color:"#FF1493",fontSize:"40px",wordSpacing:"0.5em"}}><b>{getdata.Name}</b></span>          
           
         </center>  
         <hr />
         <br />
            <div className="row">
                <center>
                   
            <div className="card w-75" style={{backgroundColor:"#FF1493",color:"black"}}>
  <div className="card-body">
    <h5 className="card-title" ><b>Account Info</b></h5>
    <br/>     <br/>
     
     EmailId: <b> {getdata.EmailId} </b>
     <br/>     <br/>
     Mobile:<b>  {getdata.MobileNo}</b>
     <br />     <br/>
     Address: <b> {getdata.Address}</b>
     <br/>     <br/>

     <Link to="/userDashboard"><button className="btn btn-success">Go to library</button></Link>

  </div>
</div>
</center>


                </div>  
                


        
        </>
    )

}

export default UserProfile;