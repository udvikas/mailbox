import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Mail Box Client</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className="nav-link">
            Home
          </Nav.Link>

          <Nav.Link as={Link} to="/login" className="nav-link">
            Login
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
