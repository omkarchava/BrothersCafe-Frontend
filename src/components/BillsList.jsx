import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

export default function BillsList() {
  const [bills, setBills] = useState([]);

  const fetchBills = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/bill/all`);
      setBills(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching bills");
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <div className="container">
      <h2>Saved Bills</h2>

      <div style={{ marginBottom: 15 }}>
        <Link to="/billing">← Back to Billing</Link>
      </div>

      {bills.length === 0 ? (
        <p>No bills found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {bills.map((bill) => (
              <tr key={bill._id}>
                <td>{new Date(bill.createdAt).toLocaleString()}</td>

                <td>
                  {bill.items
                    ?.map((item) => `${item.name} x${item.quantity}`)
                    .join(", ")}
                </td>

                <td>₹{bill.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}