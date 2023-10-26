import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const History = () => {
  const url = import.meta.env.VITE_API_URL;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get(url + "pesanans")
      .then((res) => {
        setHistory(res.data); // Simpan data ke dalam state
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Table striped className="container">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Total Price</th>
          <th>Menu</th>
        </tr>
      </thead>
      <tbody>
        {history.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>Rp.{order.total_bayar}</td>
            <td>
              <ul>
                {order.menus.map((menu) => (
                  <li key={menu.id}>
                    {menu.product.nama} - {menu.jumlah}x
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default History;
