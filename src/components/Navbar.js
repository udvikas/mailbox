import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import {  useSelector } from "react-redux";


const Header = () => {
    const mail = useSelector((state) => state.auth.email);
   
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Mail Box Client</Navbar.Brand>
       <div style={{display:'flex'}}>
       <h6>{mail}</h6>
       
       </div>
      </Container>
    </Navbar>
  )
  }

export default Header;
