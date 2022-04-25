import { API } from "../backend"
import { isAuthenticated } from "../Auth/helper"
import Axios from "axios"

export const createNewUser=async(data)=>{  
    let getuserdata=isAuthenticated();
return await fetch(`${API}admin/adduser/${getuserdata.user._id}`,{
    method:"POST",
    headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        Authorization: `Bearer ${getuserdata.token}`
    },
    body:JSON.stringify(data)
}).then((response)=>{
 return response.json()
}).catch((e)=>{
  console.log(e)
})

}


export const fetchAllUser=async(id,token)=>{  
    let getuserdata=isAuthenticated();
return await fetch(`${API}admin/getAllUsers/${id}`,{
    method:"GET",
    headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
    
}).then((response)=>{
    console.log(response)
 return response.json()
}).catch((e)=>{
  console.log(e)
})

}




export const deleteonlyone=async(id,token,deleteid)=>{  
   
return await fetch(`${API}admin/deleteOneUser/${id}`,{
    method:"POST",
    headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
    body:JSON.stringify(deleteid)
    
}).then((response)=>{
    console.log(response)
 return response.json()
}).catch((e)=>{
  console.log(e)
})

}





export const updatePassword=async(id,token,updateid)=>{  
   
    return await fetch(`${API}admin/updateUserPassword/${id}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(updateid)
        
    }).then((response)=>{
        console.log(response)
     return response.json()
    }).catch((e)=>{
      console.log(e)
    })
    
    }


    export const uploadmediafile=async(id,token,productid,formdat)=>{  
   
      
        return await fetch(`${API}admin/uploadfile/${id}/${productid}`,
        
        { method:"POST",
            headers:{
               
                
                Authorization: `Bearer ${token}`
            },
         
            body:formdat
            
        }).then((response)=>{
            console.log(response)
         return response.json();
        }).catch((e)=>{
          console.log(e)
        })
        
        }




    


    export const deletemediafile=async(id,token,productid)=>{  
   
      
        return await fetch(`${API}admin/deletefile/${id}/${productid}`,
        
        { method:"GET",
            headers:{
               
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            },
         
            
        }).then((response)=>{
            console.log(response)
         return response.json();
        }).catch((e)=>{
          console.log(e)
        })
        
        }


        export const getallfiles=async(id,token)=>{  
   
       
            return await fetch(`${API}admin/getAllFiles/${id}/`,
            
            { method:"GET",
                headers:{
                   
                    Accept:"application/json",
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                },
             
                
            }).then((response)=>{
                console.log(response)
             return response.json();
            }).catch((e)=>{
              console.log(e)
            })
            
            }
    
    
           
            
        


   
    
