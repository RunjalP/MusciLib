import { useEffect, useState } from "react";
import { getallfiles,deletemediafile } from "../..";

import { isAuthenticated } from "../../../Auth/helper";

const DeleteMedia=()=>{

const[allprdt,setprdt]=useState([]);
const[updateMedia,setMedia]=useState(false);

useEffect(()=>{
let curent=isAuthenticated();

const fetchAllProduct=async()=>{
await getallfiles(curent.user._id,curent.token).then((r)=>{
    console.log(r)
   setprdt(r);

}).catch(e=>{
    alert("Error in processing request")
    return false;
})


}

    fetchAllProduct()

},[updateMedia])


const deletemedia=async(id)=>{

    let cu=isAuthenticated();

    await deletemediafile(cu.user._id,cu.token,id).then((re)=>{
        if(re.message){
            alert("Product deleted successfully");
        }
        setMedia(!updateMedia)
        

    }).catch(e=>{
        alert("Error in deleting media.");
        return false;
    })

}

return(<>
     
     <div className="container"style={{color:"White"}}>
    <br/> <br />
    <center>
    <h5>Delete/Update Media</h5>
    </center>
   <hr />
 
   <table className="table table-striped" >
   <thead>
    <tr  style={{backgroundColor:"#FF1493"}}>
 
        <th>Media Name</th>
        <th>Media Type</th>
        <th>Action</th>
         
    </tr>
    </thead>
    <tbody style={{color:"white"}}>
    {allprdt.map((item,key)=>{
        return(<>
        
        <tr style={{color:"white"}}>
       <td  style={{color:"white"}}>{item.productName}</td>
       <td style={{color:"white"}}>{item.productCategory.categoryName}</td>
    
       <td style={{color:"white",cursor:"pointer"}}><i className="fa fa-trash" onClick={()=>deletemedia(item._id)} ></i>    </td>
       
 
        </tr>
        
        </>)
    })}
    </tbody>
 </table>
   </div>
     

</>)

}

export default DeleteMedia;