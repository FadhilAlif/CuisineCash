import { Nav, Navbar, Container } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar expand="sm" variant="dark" className="navbar">
      <Container fluid>
        <Navbar.Brand href="/home">
          <img
            alt=""
            src="/src/assets/react.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          CuisineCash
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/history">History</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
