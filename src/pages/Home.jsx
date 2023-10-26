import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  ListCategories,
  CartList,
  Menus,
  NavBar,
} from "../components/Component";
import axios from "axios";
import Swal from "sweetalert2";

const Home = () => {
  const [menus, setMenus] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [cartList, setCartList] = useState([]);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Mengambil semua data MENUS dari API
    axios
      .get(url + "products")
      .then((res) => {
        console.log("isi res GET", res);
        const menus = res.data;
        setMenus(menus);
      })
      .catch((err) => console.log(err));

    // Mengambil semua data CART dari API (getCartData)
    getCartData();
  }, []);

  const getCartData = () => {
    // Mengambil semua data CART dari API
    axios
      .get(url + "keranjangs")
      .then((res) => {
        console.log("isi res GET", res);
        const cartList = res.data;
        setCartList(cartList);
      })
      .catch((err) => console.log(err));
  };

  const handleCategories = (category) => {
    // Filter data MENUS berdasarkan category
    setSelectedCategories(category);
    console.log(category);

    axios
      .get(url + "products?category.nama=" + category)
      .then((res) => {
        const menus = res.data;
        setMenus(menus);
      })
      .catch((err) => console.log(err));
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
          keterangan: existingCartItem.keterangan,
          product: value,
        };

        await axios
          .put(url + "keranjangs/" + existingCartItem.id, updatedCartItem)
          .then(() => getCartData())
          .catch((err) => console.log(err));
      }
      // Swal menampilkan pesan sukses
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Menu ${value.nama} Ditambahkan ke Keranjang`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              selectedCategories={selectedCategories}
              handleCategories={handleCategories}
            />
            <Col className="mt-2">
              <Row className="overflow-auto menus">
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

export default Home;
