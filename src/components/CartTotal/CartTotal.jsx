import { Button, Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const CartTotal = ({ cartList }) => {
  const CartTotal = cartList.reduce(function (result, item) {
    return result + item.total_harga;
  }, 0);

  return (
    <div className="fixed-bottom">
      <Row>
        <Col md={{ span: 3, offset: 9 }} className="order px-4 ">
          <strong>Rp.{numberWithCommas(CartTotal)}</strong>
          <Button className="btn-cart float-right">Save</Button>
          <Button as={Link} to="/success" className="btn-cart float-right">
            <FontAwesomeIcon icon={faShoppingCart} /> <strong>Order</strong>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CartTotal;
