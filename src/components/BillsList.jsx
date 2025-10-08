import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BillsList() {
  const [bills, setBills] = useState([]);

  const fetchBills = async () => {
    try {
      const res = await axios.get("https://brotherscafe-backend.onrender.com/api/bill/all");
      setBills(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchBills(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bill?")) return;
    try {
      await axios.delete(`https://brotherscafe-backend.onrender.com/api/bill/delete/${id}`);
      alert("Bill deleted");
      fetchBills();
    } catch (err) {
      alert("Error deleting bill");
    }
  };

  return (
    <div className="container">
      <h2>Saved Bills</h2>
      <Link to="/billing">← Back to Billing</Link>
      <table>
        <thead>
          <tr><th>Date</th><th>Items</th><th>Total</th><th>Action</th></tr>
        </thead>
        <tbody>
          {bills.map(b => (
            <tr key={b._id}>
              <td>{new Date(b.createdAt).toLocaleString()}</td>
              <td>{b.items.map(i=>i.name).join(", ")}</td>
              <td>₹{b.total}</td>
              <td><button className="btn" onClick={()=>handleDelete(b._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
);
}
