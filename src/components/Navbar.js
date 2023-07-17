// import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import {useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button"
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { authActions } from "./Redux-Store/AuthSlice";
// import { Button } from "react-bootstrap";

const Header = () => {
  // const [isLogin, setIsLogin] = useState(false);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const dispatch = useDispatch();
  
//  navigate = useNavigate();
  // const logOutHandler = () => {
  //   dispatch(authActions.logout());
  //   navigate("/")    
  // }
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Mail Box Client</Navbar.Brand>
       <div style={{display:'flex'}}>
       <Nav className="me-auto">
       {/* {isAuthenticated &&
              <button onClick={logOutHandler}>Logout</button>} */}
            
        </Nav>
       </div>
      </Container>
    </Navbar>
  );
};

export default Header;
