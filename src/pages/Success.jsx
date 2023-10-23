import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="mt-4 text-center">
      <Image src="/assets/images/Success.png" width={500} />
      <h1>Order Successfully</h1>
      <p>Thanks for your order!</p>
      <Button variant="primary" as={Link} to="/">
        Go Back
      </Button>
    </div>
  );
};

export default Success;
