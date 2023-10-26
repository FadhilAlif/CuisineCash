import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
        sessionStorage.setItem("user", JSON.stringify(user));
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  };

  return (
    <div className="background-image">
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={6} className="login-container">
            <Form>
              <h2 className="text-center">
                <strong>Login Page</strong>
              </h2>
              <Form.Group controlId="formBasicEmail" className="mt-4">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mt-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={onLogin}
                className="w-100 mt-5"
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
