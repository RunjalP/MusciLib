import { useEffect, useState } from "react";
import { authenticate, isAuthenticated, triggerSignin } from "../../Auth/helper";
import { useNavigate} from "react-router-dom";


import Home from "./Home"
const Signin=()=>{
console.log(process.env.REACT_APP_BACKEND)

const [formValue,setFormValue] =useState({
    MobileNo:"",
    password:"",
    errorMessage:false
})

let Navigate=useNavigate()
const {MobileNo,password,errorMessage} =formValue;

const handleChange=name=>e=>{
    setFormValue({...formValue, [name]:e.target.value})
   
}

const handleSubmit=async(e)=>{
    
 
console.log(formValue)
e.preventDefault();
setFormValue({...formValue, errorMessage:false})
if(MobileNo=="" || password==""){

    setFormValue({...formValue, errorMessage:"Enter valid credentials"})
  return false;
    
}
await triggerSignin({MobileNo,password}).then((r)=>{
    if(r.error){
        setFormValue({...formValue,errorMessage:r.error})
    }
    else
    {
       authenticate(r)
     

       if(isAuthenticated().user.Role==1){
           Navigate("/userDashboard/")
       }
       else
       {
           Navigate("/adminDashboard/")
       }

    
        


    }
})



}



    return(
        <>
        <Home />

        <br /><br />
                
  
            <div className="row" >
                <div className="col-sm-4"></div>
                <div className="col-sm-4">   
                
                  <div className="card" style={{boxShadow:"3px 3px 3px 3px",borderRadius:"8px 8px", overflowX: "hidden"}}>
  <div className="card-body" >
    
   <center> <h5 className="card-title">Signin</h5></center>

    <br />
   <form className="mb-4">
  <div className="form-group">
      <input type="number" name="mobileNo" onChange={handleChange("MobileNo")}  placeholder="MobileNo" className="form-control">

      </input>
  </div>
<br />
  <div className="form-group">
      <input type="password" name="password" onChange={handleChange("password")} placeholder="Password" className="form-control">

      </input>
  </div>

 
   </form>
   <br />
   <center> <button type="button" onClick={handleSubmit} className="btn btn-info">Login</button></center>
  </div>
  </div>
  <br />
  {
    errorMessage && (
  <div className="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>{errorMessage}</strong>
  
</div>
    )
}

  </div>
 
  <div className="col-4"></div>


 
     </div>
  

        </>
    )

}
export default Signin;