import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavBar } from "../components/Component";

const Success = () => {
  return (
    <div>
      <NavBar />
      <div className="mt-4 text-center">
        <Image src="/assets/images/Success.png" width={400} />
        <h1>Order Successfully</h1>
        <p>Thanks for your order!</p>
        <Button variant="primary" as={Link} to="/home">
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default Success;
