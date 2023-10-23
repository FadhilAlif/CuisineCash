import axios from "axios";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Success = () => {
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Mengambil semua data CART
    axios.get(url + "keranjangs").then((res) => {
      console.log("isi res Sukses", res);
      const cartList = res.data;
      // Map data CART untuk dihapus
      cartList.map(function (cartItem) {
        return axios
          .delete(url + "keranjangs/" + cartItem.id)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      });
    });
  }, []);

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
