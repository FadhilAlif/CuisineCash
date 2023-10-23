import { Button, Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartTotal = ({ cartList }) => {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const submitOrder = (totalBayar) => {
    const order = {
      total_bayar: totalBayar,
      menus: cartList,
    };

    // Mengirimkan pesanan ke API
    axios
      .post(url + "pesanans", order)
      .then((res) => {
        console.log("isi res POST", res);
        // Navigasi ke halaman sukses
        navigate("/success");
      })
      .catch((err) => console.log(err));
  };

  // Menghitung total bayar dari item - item di Cart
  const CartTotal = cartList.reduce(function (result, item) {
    return result + item.total_harga;
  }, 0);

  return (
    <div className="fixed-bottom">
      <Row>
        <Col md={{ span: 3, offset: 9 }} className="order py-4">
          <strong className="px-3">Rp.{numberWithCommas(CartTotal)}</strong>
          <Button
            className="btn-cart float-end px-5"
            onClick={() => submitOrder(CartTotal)}
          >
            <FontAwesomeIcon icon={faShoppingCart} /> <strong>Order</strong>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CartTotal;
