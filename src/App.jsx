import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  NavBar,
  ListCategories,
  CartList,
  Menus,
} from "./components/Component";
import axios from "axios";
import "./App.css";
import Swal from "sweetalert2";

const App = () => {
  const [menus, setMenus] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [cartList, setCartList] = useState([]);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(url + "products")
      .then((res) => {
        console.log("isi res GET", res);
        const menus = res.data;
        setMenus(menus);
      })
      .catch((err) => {
        console.log("GET error bos", err);
      });

    getCartData();
  }, []);

  const getCartData = () => {
    axios
      .get(url + "keranjangs")
      .then((res) => {
        console.log("isi res GET", res);
        const cartList = res.data;
        setCartList(cartList);
      })
      .catch((err) => {
        console.log("GET error bos", err);
      });
  };
  // useEffect(() => {
  //   const fetchCartData = async () => {
  //     try {
  //       const cartResponse = await axios.get(url + "keranjangs");
  //       setCartList(cartResponse.data);
  //     } catch (error) {
  //       console.error("Error fetching cart data:", error);
  //     }
  //   };

  //   fetchCartData();
  // }, [url, cartList]);

  const handleCategories = (category) => {
    setSelectedCategories(category);
    console.log(category);

    axios
      .get(url + "products?category.nama=" + category) // Use the updated value
      .then((res) => {
        const menus = res.data;
        setMenus(menus);
      })
      .catch((err) => {
        console.log("GET error bos", err);
      });
  };

  const addCart = async (value) => {
    try {
      // Check menu di dalam Cart
      const cartRes = await axios.get(
        url + "keranjangs?product.id=" + value.id
      );

      if (cartRes.data.length === 0) {
        // Jika tidak ada di Cart, tambahkan item baru ke Cart
        const newCartItem = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
        };

        await axios.post(url + "keranjangs", newCartItem);
        getCartData();
      } else {
        // Jika ada di Cart, update item yang sudah ada
        const existingCartItem = cartRes.data[0];
        const updatedCartItem = {
          jumlah: existingCartItem.jumlah + 1,
          total_harga: existingCartItem.total_harga + value.harga,
          product: value,
        };

        await axios.put(
          url + "keranjangs/" + existingCartItem.id,
          updatedCartItem
        );
      }
      // Swal menampilkan pesan sukses
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Menu ${value.nama} Ditambahkan ke Keranjang`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error:", error);
    }
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
              <Row>
                {menus &&
                  menus.map((menu) => {
                    return (
                      <Menus key={menu.id} menu={menu} addCart={addCart} />
                    );
                  })}
              </Row>
            </Col>
            <CartList cartList={cartList} getCartData={getCartData} />
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default App;
