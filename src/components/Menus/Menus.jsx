import { Card, Col } from "react-bootstrap";
import { numberWithCommas } from "../../utils/utils";

const Menus = ({ menu, addCart }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card style={{ height: "100%" }} onClick={() => addCart(menu)}>
        <Card.Img
          variant="top"
          src={
            "/assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
        />
        <Card.Body>
          <Card.Title>{menu.nama}</Card.Title>
          <Card.Text>
            <strong>Rp.{numberWithCommas(menu.harga)}</strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
