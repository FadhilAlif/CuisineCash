import { Col, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
// import { API_URL } from "../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMugSaucer,
  faUtensils,
  faPizzaSlice,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ListCategories = ({ selectedCategories, handleCategories }) => {
  const [categories, setCategories] = useState([]);
  const url = import.meta.env.VITE_API_URL;

  const Icons = ({ nama }) => {
    // Menampilkan Icon berdasarkan nama category
    if (nama === "Makanan") {
      return <FontAwesomeIcon icon={faUtensils} />;
    }
    if (nama === "Minuman") {
      return <FontAwesomeIcon icon={faMugSaucer} />;
    }
    if (nama === "Cemilan") {
      return <FontAwesomeIcon icon={faPizzaSlice} />;
    }
  };

  useEffect(() => {
    // Mengambil semua data CATEGORIES dari API
    axios
      .get(url + "categories")
      .then((res) => {
        const categories = res.data;
        setCategories(categories);
      })
      .catch((err) => {
        console.log("GET error bos", err);
      });
  }, []);

  return (
    <Col md={2}>
      <h4>
        <strong>List Categories</strong>
      </h4>
      <hr />
      <ListGroup>
        {categories &&
          categories.map((category) => {
            return (
              <ListGroup.Item
                key={category.id}
                onClick={() => handleCategories(category.nama)}
                className={
                  selectedCategories === category.nama
                    ? "categories-active"
                    : ""
                }
                style={{ cursor: "pointer" }}
              >
                <h5>
                  <Icons nama={category.nama} /> {category.nama}
                </h5>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </Col>
  );
};

export default ListCategories;
