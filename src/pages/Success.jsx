import axios from "axios";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Success = () => {
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Delete all cart items
    axios.get(url + "keranjangs").then((res) => {
      console.log("isi res Sukses", res);
      const cartList = res.data;
      // Map data dalam Cart Item
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
      <h1>Sukses Bos</h1>
      <p>Terimakasih Sudah Memesan!</p>
      <Button variant="primary" as={Link} to="/">
        Kembali
      </Button>
    </div>
  );
};

export default Success;
