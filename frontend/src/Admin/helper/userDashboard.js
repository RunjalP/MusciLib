import { useEffect , useState} from "react";
import { getAllCategory } from ".";
import LoggedInNavbar from "./loggedInNavbar";
import { isAuthenticated } from "../../Auth/helper"
import { Link, useNavigate } from "react-router-dom";

const UserDashboard=()=>{
    let nav=useNavigate();
var categorydata;

const [category,setcategory] =useState([]);
console.log(category)
    useEffect(()=>{

        let c=isAuthenticated();
     const {token,user}=c;

      let abc=  getAllCategory(user._id,token)
     
      abc.then(x=>{
         categorydata=x;
         console.log(categorydata)
         setcategory(categorydata)
      }).catch(e=>console.log(e))
     
      
    },[])

  
    const openfolder=(e)=>{
       nav(`/listen?musicid=${e}`)
    }
    return(
        <div>
        <LoggedInNavbar />
        <br />
        <center>  
        <div className="row" style={{margin:'5px'}}>
                  {
            category.map((item,key)=>{
                return(<>
                
                <div className="col-sm-4" id={key}>
                    <i className="fa fa-folder" onClick={()=>openfolder(item._id)} style={{fontSize:"60px",color:"#FFBF00",cursor:"pointer"}}></i>
                    <h5 style={{color:"white"}}>{item.categoryName}</h5>
                </div>
                

                </>)
            })
        }
        

</div>
</center>



        </div>
    )
}

export default UserDashboard;