import { Row, Col, Badge, ListGroup } from "react-bootstrap";
import { numberWithCommas } from "../../utils/utils";
import { useEffect } from "react";
import { CartTotal } from "../Component";

const CartList = ({ cartList, getCartData }) => {
  // Data Infinite Loop
  useEffect(() => {
    getCartData();
  }, []);

  return (
    <Col md={3}>
      <h4>
        <strong>Cart</strong>
      </h4>
      <hr />
      {cartList.length !== 0 && (
        <ListGroup>
          {cartList.map((cartItem) => (
            <ListGroup.Item
              className="d-flex justify-content-between align-items-start"
              key={cartItem.product.id}
            >
              <Row>
                <Col>
                  <img
                    src={
                      "/assets/images/" +
                      cartItem.product.category.nama.toLowerCase() +
                      "/" +
                      cartItem.product.gambar
                    }
                    alt={cartItem.product.nama}
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col>
                  <p>
                    <strong>{cartItem.product.nama}</strong>
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Rp.{numberWithCommas(cartItem.product.harga)}</p>
                    <Badge bg="primary" pill className="">
                      {cartItem.jumlah}
                    </Badge>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <CartTotal cartList={cartList} />
    </Col>
  );
};

export default CartList;
