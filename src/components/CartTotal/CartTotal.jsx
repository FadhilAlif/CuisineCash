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
    const pesanan = {
      total_bayar: totalBayar,
      menus: cartList,
    };

    axios.post(url + "pesanans", pesanan).then((res) => {
      console.log("isi res POST", res);
      navigate("/success");
    });
  };

  const CartTotal = cartList.reduce(function (result, item) {
    return result + item.total_harga;
  }, 0);

  return (
    <div className="fixed-bottom">
      <Row>
        <Col md={{ span: 3, offset: 9 }} className="order py-4">
          <strong>Rp.{numberWithCommas(CartTotal)}</strong>
          <Button
            className="btn-cart float-end"
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
