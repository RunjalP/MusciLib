import { useEffect, useState } from "react";
import { deleteonlyone, fetchAllUser, updatePassword } from "../..";
import { isAuthenticated } from "../../../Auth/helper";

const DeleteUser=()=>{
 const [alluser,setalluser]=useState([])
 const [updateUi,setUi]=useState(false)

useEffect(()=>{
  let getdt=isAuthenticated();

  let fetchAll=async()=>{
    await fetchAllUser(getdt.user._id,getdt.token).then((res)=>{
        console.log(res)
  
        setalluser(res)
  
  
      }).catch((e)=>{
          console.log(e)
      }
      )
  }

  fetchAll()
 

},[updateUi])

var a;
let currentuser=isAuthenticated();
const deleteoneuser=async(id)=>{
    console.log(id)
  
a=window.confirm("Areyou sure")
 if(a){  
   
 await deleteonlyone(currentuser.user._id,currentuser.token,{"id":id}).then((re)=>{
     console.log(re)
     if(re.message){
         setUi(!updateUi)

         alert(re.message);
         
     }
 }).catch((e)=>console.log(e))


 }
 else{
     return false;
 }


}



const resetPassword=async(uid)=>{
    var b=window.prompt("Enter new Password");
   // console.log(b)
    
   if(b.length>=6 && b!=null){

    await updatePassword(currentuser.user._id,currentuser.token,{"id":uid,"newPassword":b}).then((re)=>{
      if(re.message){
          alert(re.message);

      }
    }).catch((e)=>{
        console.log(e)
    })
}
else
{
    alert("Minimum character should be 6");
    return false;
}




}


return(<>
    
       {
    <div className="container"style={{color:"White"}}>
    <br/> <br />
    <center>
    <h5>Delete/Update User</h5>
    </center>
   <hr />
 
   <table className="table table-striped" >
   <thead>
    <tr  style={{backgroundColor:"#FF1493"}}>
 
        <th>Name</th>
        <th>Email</th>
        <th>Mob</th>
        <th>Address</th>
        <th>Role</th>
        <th>Action</th>
         
    </tr>
    </thead>
    <tbody style={{color:"white"}}>
    {alluser.map((item,key)=>{
        return(<>
        
        <tr style={{color:"white"}}>
       <td  style={{color:"white"}}>{item.Name}</td>
       <td style={{color:"white"}}>{item.EmailId}</td>
       <td style={{color:"white"}}>{item.MobileNo}</td>
       <td style={{color:"white"}}>{item.Address}</td>
       <td style={{color:"white"}}>{item.Role== 1 ? "User" : "Admin"}</td>
       <td style={{color:"white",cursor:"pointer"}}><i className="fa fa-trash" onClick={()=>deleteoneuser(item._id)}></i>   <i className="fa fa-level-up" onClick={()=>resetPassword(item._id)}></i> </td>
       
 
        </tr>
        
        </>)
    })}
    </tbody>
 </table>
   </div>
     

       }

    </>)
}

export default DeleteUser;