import axios from "axios";
import React, { useEffect, useState } from "react";

import { VerticalGraph } from "./VerticalGraph";
import { useAuth } from "../hooks/useAuth";

const Positions = () => {
  const [allPositions, SetAllPositions] = useState([]);

  // GET token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://zerodha-prg0.onrender.com/positions/index", {
        headers: {
          Authorization: `Bearer ${token}`,   // FIXED
        },
      })
      .then((res) => {
        SetAllPositions(res.data);
      })
      .catch((err) => {
        console.log("Positions fetch error:", err);
      });
  }, []); // FIXED: no infinite loop

  const labels = allPositions.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allPositions.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>

          <tbody>
            {allPositions.map((stock, index) => {
              const currValue = stock.price * stock.qty;
              const isProfit = currValue - stock.avg * stock.qty >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>
                    {(currValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <VerticalGraph data={data} />
      </div>
    </>
  );
};

export default Positions;
