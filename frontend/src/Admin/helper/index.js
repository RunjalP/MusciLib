
import { API } from "../../backend"

export const getAllCategory=(id,token)=>{
  
  //console.log(id,token)
    return fetch(`${API}user/getcategory/${id}`,{
        method:"GET",
        headers:{
           
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        
    }).then(allcat=>{
        return allcat.json()
    }).catch((e)=>{
       return e
    })
}


export const getAllProducts=(id,token,catId)=>{
  
   
      return fetch(`${API}user/${id}/${catId}`,{
          method:"GET",
          headers:{
             
              Accept:"application/json",
              "Content-Type":"application/json",
              Authorization:`Bearer ${token}`
          },
          
      }).then(allcat=>{
          //console.log(allcat)
          return allcat.json()
      }).catch((e)=>{
         return e
      })
  }


  export const getSingleProducts=async(id,token,productId)=>{
   console.log("fff")
    return await fetch(`${API}user/getproduct/${id}/${productId}`,{
        method:"GET",
        headers:{
           
            Accept:"application/json",
           
            Authorization:`Bearer ${token}`
        },
        
    }).then(file=>{
        console.log(file.blob)
        return file.blob;
       // return file.json()
    }).catch((e)=>{
       return e
    })
      

  }






  export const allActiveMusicArray=async(id,token)=>{
      console.log(id,token)
    return  fetch(`${API}user/getactivemusicarray/${id}`,{
        method:"GET",
        headers:{
           
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        
    }).then(rs=>{
        
        return rs.json();
       // return file.json()
    }).catch((e)=>{
       return e
    })
      

  }



  export const sendbookmark=async(id,token,data)=>{
    console.log(id,token)
  return  fetch(`${API}user/sendbookmark/${id}`,{
      method:"POST",
      headers:{
         
          Accept:"application/json",
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
      },
      body:JSON.stringify(data)
      
  }).then(rs=>{
      
      return rs.json();
     // return file.json()
  }).catch((e)=>{
     return e
  })
    

}