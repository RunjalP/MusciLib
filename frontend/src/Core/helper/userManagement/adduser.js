
import { useState } from "react"
import { createNewUser } from "../.."
import { isAuthenticated } from "../../../Auth/helper"
import { API } from "../../../backend"

const AddUser=()=>{

const [getform ,setform]=useState({
    Name:"",
    MobileNo:"",
    EmailId:"",
    Address:"",
    password:"",
    Role:1,
  

})

const {Name,MobileNo,EmailId,Address,password,Role}=getform;

    const getdetails=name=>e=>{
      setform({...getform,[name]:e.target.value})    
    }

    const handlesubmit=async(e)=>{
        e.preventDefault();
   if(Name==""  ||  password=="" || Address=="" || MobileNo=="")
   {
    alert("All fields are mandatory")
    return false;

   }

 await createNewUser({Name,MobileNo,EmailId,Address,password,Role}).then((r)=>{
     console.log(r)
    if(r.error){

        r.error.code ? alert( "ErrorCode:"+r.error.code): alert(r.error)
        return false; 

    }
     if(r.message){
      
    setform({...getform,EmailId:"",Name:"",MobileNo:"",Address:"",Role:1,password:""}); 
      alert(r.message);
     }
  
 })

   


        
    }

    return(<>
    
    <div className="container"style={{color:"White"}}>
   <br/> <br />
   <center>
   <h5>Add User</h5>
   </center>
  <hr />

    <form onSubmit={handlesubmit}>

    <div className="form-group">
    <label for="exampleFormControlInput1">Name</label>
    <input type="text" className="form-control" name="Name" value={Name} onChange={getdetails("Name")} id="exampleFormControlInput1" placeholder="User Name"/>
  </div>
  <div className="form-group">
    <label for="exampleFormControlInput2">Email address</label>
    <input type="email" className="form-control" name="EmailId"value={EmailId} onChange={getdetails("EmailId")} id="exampleFormControlInput2" placeholder="User Email"/>
  </div>
  <div className="form-group">
    <label for="exampleFormControlInput3">MobileNo</label>
    <input type="number" className="form-control"name="MobileNo"value={MobileNo} onChange={getdetails("MobileNo")} id="exampleFormControlInput3" placeholder="User MobileNo"/>
  </div>

  <div className="form-group">
    <label for="exampleFormControlInput3">Address</label>
    <input type="text" className="form-control" name="Address"value={Address} onChange={getdetails("Address")} id="exampleFormControlInput3" placeholder="User Address"/>
  </div>

  <div className="form-group">
    <label for="exampleFormControlInput3">Create new password for User</label>
    <input type="password" className="form-control" name="password" value={password} onChange={getdetails("password")} id="exampleFormControlInput3" placeholder="Enter password"/>
  </div>

  <div className="form-group">
    <label for="exampleFormControlInput4">Role</label>
    <input type="text" className="form-control" value={"User"} name="password"disabled={true} id="exampleFormControlInput4" placeholder="Enter password"/>
  </div>

<br />
  <center><button className="btn btn-success" type="submit">Submit</button></center>
  

</form>




    </div>
    
    
    

    
    </>)
}

export default AddUser