import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  NavBar,
  ListCategories,
  CartList,
  Menus,
} from "./components/Component";
import { API_URL } from "./api/api";
import axios from "axios";
import "./App.css";

const App = () => {
  const [menus, setMenus] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  

  useEffect(() => {
    axios
      .get(API_URL + "products")
      .then((res) => {
        // console.log("isi res GET", res);
        const menus = res.data;
        setMenus(menus);
      })
      .catch((err) => {
        console.log("GET error bos", err);
      });
  }, []);

  const handleCategories = (category) => {
    setSelectedCategories(category);
    console.log(category);

    axios
      .get(API_URL + "products?category.nama=" + category) // Use the updated value
      .then((res) => {
        const menus = res.data;
        setMenus(menus);
      })
      .catch((err) => {
        console.log("GET error bos", err);
      });
  };

  return (
    <div className="App">
      <NavBar />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              selectedCategories={selectedCategories}
              handleCategories={handleCategories}
            />
            <Col>
              <h4>Ntar Isinya Daftar Menu</h4>
              <Row>
                {menus &&
                  menus.map((menu) => {
                    return <Menus key={menu.id} menu={menu} />;
                  })}
              </Row>
            </Col>
            <CartList />
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default App;
