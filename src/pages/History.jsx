import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const History = () => {
  const url = import.meta.env.VITE_API_URL;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Mengambil semua data Pesanans dari API
    axios
      .get(url + "pesanans")
      .then((res) => {
        setHistory(res.data); // Simpan data ke dalam state
      })
      .catch((err) => console.log(err));
  }, []);

  return (
      <div className="mt-4">
        <h4 className="text-center">
          <strong>Order History</strong>
        </h4>
        <Table striped bordered className="container mt-4">
          <thead>
            <tr className="text-center">
              <th>Order ID</th>
              <th>Total Price</th>
              <th>Order Menu</th>
            </tr>
          </thead>
          <tbody>
            {history.map((order) => (
              <tr key={order.id}>
                <td className="text-center">{order.id}</td>
                <td className="text-center">Rp.{order.total_bayar}</td>
                <td>
                  <ol>
                    {order.menus.map((menu) => (
                      <li key={menu.id}>
                        <strong>{menu.product.nama}</strong>{" "}
                        {menu.keterangan ? `(${menu.keterangan})` : ``} -{" "}
                        {menu.jumlah}
                      </li>
                    ))}
                  </ol>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
  );
};

export default History;
