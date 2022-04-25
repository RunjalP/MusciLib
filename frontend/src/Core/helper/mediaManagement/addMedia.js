import { useEffect, useState } from "react";

import { getAllCategory } from "../../../Admin/helper";
import { isAuthenticated } from "../../../Auth/helper";
import { uploadmediafile } from "../..";

const AddMedia=()=>{

    const [uploadmedia, setupload]=useState({
       
        productName:"",
        
        categoryId:"1"
    })

    const [uploadafile,setuploadfile]=useState(0)

    const {productName,categoryId}=uploadmedia

    const [getallcat,setallcat]=useState([])

   useEffect(()=>{
let  currentdetails=isAuthenticated();

const  getcat=async()=>{
  
    await getAllCategory(currentdetails.user._id,currentdetails.token).then((re)=>{
      setallcat(re)
    }).catch((e)=>{
        console.log(e);
    })

}

getcat();


   },[])


   const handlesubmit=async(e)=>{
       e.preventDefault();
   
       if(productName=="" || categoryId=="" || categoryId=="1" || uploadafile==0){
           alert("All fields are mandatory");
           return false
       }
       else
       {
           var newform=new FormData();

          

        newform.append("myfile",uploadafile);
        newform.append("productName",productName);
        newform.append("categoryId",categoryId)
         
         //let abc={"productName":productName,"categoryId":categoryId}
let cur=isAuthenticated();

 await uploadmediafile(cur.user._id,cur.token,categoryId,newform).then((ret)=>{
 if(ret.message){
   alert(ret.message);
   setupload({...uploadmedia,productName:"",categoryId:""})
   setuploadfile(0)
   return false;
 }
 if(ret.error){
   alert("Error in processing request");
   return false;
 }
 }).catch((e)=>{
   alert("Error in sending request");
   return false
 })

       }

   }


  

   const handleformfield=name=>e=>{
       console.log(name,e.target.value)
       setupload({...uploadmedia,[name]:e.target.value})
   }

return(<>

<div className="container"style={{color:"White"}}>
   <br/> <br />
   <center>
   <h5>Add Media</h5>
   </center>
  <hr />

    <form onSubmit={handlesubmit} >

    <div className="form-group">
    <label for="exampleFormControlInput1">Select file</label>
    <input type="file" className="form-control" name="myfile" onChange={(e)=>setuploadfile(e.target.files[0])}  id="exampleFormControlInput1" placeholder="Select file"/>
  </div>
  <div className="form-group">
    <label for="exampleFormControlInput2">Enter Media Name</label>
    <input type="text" className="form-control" name="productName"value={productName} onChange={handleformfield("productName")}  id="exampleFormControlInput2" placeholder="Media Name"/>
  </div>
  <div className="form-group">
    <label for="exampleFormControlInput3"></label>
    <select className="form-select" aria-label="Default select example" value={categoryId} onChange={handleformfield("categoryId")}>
        
 <option value="1">Select Media type</option>
  {getallcat.map((i,key)=>{
      return(<>
      
      <option key={i._id} value={i._id}>{i.categoryName}</option>
      </>)
  })}
</select>
  </div>

  

<br />
  <center><button className="btn btn-success" type="submit">Submit</button></center>
  

</form>




    </div>
     




</>)

}

export default AddMedia;