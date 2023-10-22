import { Button, Modal, Form } from "react-bootstrap";
import { numberWithCommas } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const CartModal = ({
  show,
  handleClose,
  cartDetail,
  jumlah,
  keterangan,
  tambah,
  kurang,
  handleSubmit,
  handleChange,
}) => {
  if (cartDetail) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {cartDetail.product.nama}
            <strong> (Rp. {numberWithCommas(cartDetail.product.harga)})</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Total Harga :</Form.Label>
              <p>
                <strong>Rp. {numberWithCommas(cartDetail.total_harga)}</strong>
              </p>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Jumlah :</Form.Label>
              <div className="button-quantity">
                <Button size="sm" className="me-2" onClick={() => kurang()}>
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <strong>{jumlah}</strong>
                <Button size="sm" className="ms-2" onClick={() => tambah()}>
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Keterangan :</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="keterangan"
                placeholder="Contoh : Pedas, Less Ice"
                value={keterangan}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            <FontAwesomeIcon icon={faTrash} /> Delete Item
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return null;
  }
};

export default CartModal;
