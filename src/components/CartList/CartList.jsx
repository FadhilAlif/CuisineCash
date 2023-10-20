import { Row, Col, Badge, ListGroup } from "react-bootstrap";
import { numberWithCommas } from "../../utils/utils";
import { useEffect } from "react";

const CartList = ({ cartList, getCartData }) => {
  //Data Infinite Loop 
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
              className="justify-content-between align-items-start"
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
                    style={{ width: "120px" }}
                  />
                </Col>
                <Col>
                  <p>
                    <strong>{cartItem.product.nama}</strong>
                  </p>
                  <p>Rp.{numberWithCommas(cartItem.product.harga)}</p>
                </Col>
                <Col className="text-center">
                  <Badge bg="primary" pill className="">
                    {cartItem.jumlah}
                  </Badge>
                </Col>
                <Col>
                  <strong className="float-right">
                    Rp.{numberWithCommas(cartItem.total_harga)}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Col>
  );
};

export default CartList;
