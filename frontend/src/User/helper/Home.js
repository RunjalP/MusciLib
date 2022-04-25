import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,MDBBtn
  } from 'mdb-react-ui-kit';

  import { Link } from 'react-router-dom';
const Home=()=>{

    return(
        <>

<MDBNavbar light bgColor='light' style={{overflow:"hidden"}}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
           
            MusicLib
          </MDBNavbarBrand>

          <div className='d-flex input-group w-auto'>
       
         <Link to="/signin"> <MDBBtn color='primary'>Login</MDBBtn></Link>
        </div>
        </MDBContainer>
      </MDBNavbar>


        </>
    )

}

export default Home;