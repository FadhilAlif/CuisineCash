import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="mt-4 text-center">
      <Image src="/assets/images/Success.png" width={500} />
      <h1>Sukses Bos</h1>
      <p>Terimakasih Sudah Memesan!</p>
      <Button variant="primary" as={Link} to="/">
        Kembali
      </Button>
    </div>
  );
};

export default Success;
