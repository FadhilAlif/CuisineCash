import { Nav, Navbar, Container, Button } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar expand="sm" variant="dark" className="navbar">
      <Container>
        <Navbar.Brand href="/home">
          <img
            alt=""
            src="/assets/images/logo.png"
            width="100%"
            height="35px"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-2">
            <Button variant="light" href="/home">
              Home
            </Button>
            <Button variant="light" href="/history">
              History
            </Button>
            <Button variant="light" href="/chatai">
              Chat AI
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
