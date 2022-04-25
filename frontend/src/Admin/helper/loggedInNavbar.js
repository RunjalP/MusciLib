import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';

  import { Link, useNavigate } from 'react-router-dom';
  import { API } from "../../backend"
const LoggedInNavbar=()=>{
  let navi=useNavigate()
    const logout=async()=>{
      

    await  fetch(`${API}signout`,{
        method:"GET",
        headers:{
           
            Accept:"application/json",
            "Content-Type":"application/json",
            
        },
        
    })

    localStorage.removeItem("token")
    
     navi("/signin")

    }

    return(
        <div>

<MDBNavbar light bgColor='light' style={{overflow:"hidden"}}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
           
            MusicLib
          </MDBNavbarBrand>

          <div className='d-flex input-group w-auto'>
         <abbr title="logout"> <i className="fa fa-power-off" onClick={logout} aria-hidden="true" style={{fontSize:"20px",marginRight:"7px",cursor:"pointer",margin:"12px"}}></i> </abbr>
       <Link to="/userprofile">  <i className="fa fa-user" style={{fontSize:"35px",marginRight:"7px",cursor:"pointer"}} aria-hidden="true"></i>  </Link>
        </div>
        </MDBContainer>
      </MDBNavbar>


        </div>
    )

}

export default LoggedInNavbar;