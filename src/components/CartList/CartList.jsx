import { Row, Col, Badge, ListGroup, Card } from "react-bootstrap";
import { numberWithCommas } from "../../utils/utils";
import { useEffect, useState } from "react";
import { CartTotal } from "../Component";
import CartModal from "../CartModal/CartModal";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const CartList = ({ cartList, getCartData }) => {
  const [show, setShow] = useState(false);
  const [cartDetail, setCartDetail] = useState(false);
  const [jumlah, setJumlah] = useState(0);
  const [keterangan, setKeterangan] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Mengambil semua data CART dari getCartData
    getCartData();
  }, []);

  const handleShow = (cartItem) => {
    // Menampilkan Modal untuk EDIT cart item
    setShow(true);
    setCartDetail(cartItem);
    setJumlah(cartItem.jumlah);
    setKeterangan(cartItem.keterangan);
    setTotalPrice(cartItem.total_harga);
  };

  const handleClose = () => {
    // Menutup Modal
    setShow(false);
  };

  const tambah = () => {
    // Menambah Jumlah Item
    setJumlah(jumlah + 1);
    setTotalPrice(cartDetail.product.harga * (jumlah + 1));
  };

  const kurang = () => {
    // Mengurangi Jumlah Item
    if (jumlah !== 1) {
      setJumlah(jumlah - 1);
      setTotalPrice(cartDetail.product.harga * (jumlah - 1));
    }
  };

  const handleChange = (e) => {
    // Mengubah Keterangan Item
    setKeterangan(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    // Menyimpan perubahan dari Cart ke API
    const data = {
      jumlah: jumlah,
      keterangan: keterangan,
      total_harga: totalPrice,
      product: cartDetail.product,
    };

    console.log(data);

    axios
      .put(url + "keranjangs/" + cartDetail.id, data)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Success Update Item",
          text: `Menu ${cartDetail.product.nama} Updated`,
          showConfirmButton: false,
          timer: 1500,
        });
        getCartData();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    handleClose();

    // Menghapus Item dari Cart
    axios
      .delete(url + "keranjangs/" + id)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "error",
          title: "Success Delete Item",
          text: `Menu ${cartDetail.product.nama} Deleted`,
          showConfirmButton: false,
          timer: 1500,
        });
        getCartData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Col md={3}>
      <h4>
        <strong>Cart List</strong>
      </h4>
      <hr />
      {cartList.length !== 0 && (
        <Card className="overflow-auto cart-list">
          <ListGroup>
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
                      <Badge pill className="btn-primary" bg="btn-primary">
                        {cartItem.jumlah}
                      </Badge>
                    </div>
                    <p className="text-muted" style={{ fontSize: "14px" }}>
                      <FontAwesomeIcon icon={faPenToSquare} />{" "}
                      {cartItem.keterangan}
                    </p>
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
              keterangan={keterangan}
              totalPrice={totalPrice}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleDelete={handleDelete}
            />
          </ListGroup>
        </Card>
      )}
      <CartTotal cartList={cartList} />
    </Col>
  );
};

export default CartList;
