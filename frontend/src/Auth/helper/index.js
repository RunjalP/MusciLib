import {API} from "../../backend";

export const triggerSignin=(user)=>{
    
     return  fetch(`${API}signin`, {
        method:"POST",
        credentials: 'include',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            
        },

        body:JSON.stringify(user)
    }).then(response=>{
        console.log(response)
          return response.json()
 }).catch(e=>{
     console.log(e)
 })

}


export const authenticate=(data)=>{
    if(typeof window!=undefined){
        localStorage.setItem("token",JSON.stringify(data))
       
    }
    else
    {
        return false;
    }

}

export const signout=next=>{
    if(typeof window!=undefined){
        localStorage.removeItem("token")
       next()
    }
    return fetch(`${API}signout`,{
    method:"GET",
    headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
    },
    
}).then(response=>{
    return response.json()
}).catch(e=>{
    return e.json()
})

}

export const isAuthenticated=()=>{
    if(typeof window=="undefined"){
        return false;
    }
    if(localStorage.getItem("token")){
       // console.log(localStorage.getItem("token"))
        return JSON.parse(localStorage.getItem("token"))
    }
}