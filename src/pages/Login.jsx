import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Validasi email dan password
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^.{6,}$/;

    if (email === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email and Password cannot be empty",
      });
    } else if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid email address",
      });
    } else if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 6 characters",
      });
    } else if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must meet the required criteria",
      });
    } else {
      // Auth email dan pass menggunakan Firebase Authentication
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          sessionStorage.setItem("user", JSON.stringify(user));
          onLogin();
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "You have successfully logged in",
          });
          navigate("/home");
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage,
          });
        });
    }
  };

  return (
    <div className="background-image">
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={6} className="login-container">
            <Form>
              <h2 className="text-center">
                <strong>Login</strong>
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
                onClick={handleLogin} // Memanggil handleLogin saat tombol diklik
                className="w-100 mt-5"
              >
                Login
              </Button>
              <p className="text-center mt-3">Don`t have an account?</p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
