import { Col, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { API_URL } from "../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMugSaucer,
  faUtensils,
  faPizzaSlice,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ListCategories = ({ selectedCategories, handleCategories }) => {
  const [categories, setCategories] = useState([]);

  const Icons = ({ nama }) => {
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
    axios
      .get(API_URL + "categories")
      .then((res) => {
        // console.log("isi res GET", res);
        const categories = res.data;
        setCategories(categories);
      })
      .catch((err) => {
        console.log("GET error bos", err);
      });
  }, []);

  return (
    <Col md={2}>
      <h4>List Categories</h4>
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
