import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const NavBar = ({ isLoggedIn }) => {
  const location = useLocation();

  return isLoggedIn ? (
    <Navbar expand="sm" variant="dark" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img
            alt=""
            src="/assets/images/logo.png"
            width="100%"
            height="35px"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-2">
            <Button
              as={Link}
              to="/home"
              variant="light"
              className={location.pathname === "/home" ? "active" : ""}
            >
              Home
            </Button>
            <Button
              as={Link}
              to="/history"
              variant="light"
              className={location.pathname === "/history" ? "active" : ""}
            >
              History
            </Button>
            <Button
              as={Link}
              to="/chatai"
              variant="light"
              className={location.pathname === "/chatai" ? "active" : ""}
            >
              Chat AI
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : null; // Mengembalikan null jika isLoggedIn adalah false
};

export default NavBar;
