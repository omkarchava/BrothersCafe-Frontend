import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SalesReport() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://brotherscafe-backend.onrender.com/api/sales/daywise");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="container">
      <h2>Sales Report (Daywise)</h2>
      <Link to="/billing">← Back to Billing</Link>
      <table>
        <thead><tr><th>Date</th><th>Total Sales (₹)</th></tr></thead>
        <tbody>
          {data.map(d => (
            <tr key={d._id}><td>{d.date}</td><td>₹{d.totalSales}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
);
}
