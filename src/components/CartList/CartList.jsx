import { Row, Col, Badge, ListGroup } from "react-bootstrap";
import { numberWithCommas } from "../../utils/utils";
import { useEffect, useState } from "react";
import { CartTotal } from "../Component";
import CartModal from "../CartModal/CartModal";

const CartList = ({ cartList, getCartData }) => {
  const [show, setShow] = useState(false);
  const [cartDetail, setCartDetail] = useState(false);
  const [jumlah, setJumlah] = useState(0);
  const [keterangan, setKeterangan] = useState("");
  // const [selectedCartItem, setSelectedCartItem] = useState(null);

  useEffect(() => {
    getCartData();
  }, []);

  const handleShow = (cartItem) => {
    setShow(true);
    setCartDetail(cartItem);
    setJumlah(cartItem.jumlah);
    setKeterangan(cartItem.keterangan);
  };

  const handleClose = () => {
    setShow(false);
  };

  const tambah = () => {
    setJumlah(jumlah + 1);
  };

  const kurang = () => {
    if (jumlah !== 1) {
      setJumlah(jumlah - 1);
    }
  };

  const handleChange = (e) => {
    setKeterangan(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    console.log("Keterangan : ", keterangan);
  };

  return (
    <Col md={3}>
      <h4>
        <strong>Cart</strong>
      </h4>
      <hr />
      {cartList.length !== 0 && (
        <ListGroup className="cart-border">
          {cartList.map((cartItem) => (
            <ListGroup.Item
              className="d-flex justify-content-between align-items-start"
              key={cartItem.id}
              onClick={() => handleShow(cartItem)}
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
          <CartModal
            show={show}
            handleClose={handleClose}
            cartDetail={cartDetail}
            jumlah={jumlah}
            tambah={tambah}
            kurang={kurang}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </ListGroup>
      )}
      <CartTotal cartList={cartList} />
    </Col>
  );
};

export default CartList;
