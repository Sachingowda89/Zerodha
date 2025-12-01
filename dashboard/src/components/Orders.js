import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [allOrders, SetAllOrders] = useState([]);

  // CORRECT TOKEN
  const token = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("https://zerodha-prg0.onrender.com/orders/index", {
        headers: {
          Authorization: token,   // ✔ no Bearer, correct
        },
      })
      .then((res) => {
        SetAllOrders(res.data);
      })
      .catch((err) => {
        console.log("Orders fetch error:", err);
      });
  }, []);

  return (
    <>
      <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
            </tr>
          </thead>

          <tbody>
            {allOrders.map((stock, index) => (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{stock.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
