import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MenuManagement() {
  const [menu, setMenu] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const fetchMenu = async () => {
    try {
      const res = await axios.get("https://brotherscafe-backend.onrender.com/api/menu");
      setMenu(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchMenu(); }, []);

  const handleAddOrUpdate = async () => {
    if (!name || !price) return alert("Enter name & price");
    try {
      await axios.post("https://brotherscafe-backend.onrender.com/api/menu/add", { name, price: Number(price) });
      setName(""); setPrice("");
      fetchMenu();
    } catch (err) {
      alert("Error adding/updating");
    }
  };

  return (
    <div className="container">
      <h2>Menu Management</h2>
      <Link to="/billing">← Back to Billing</Link>
      <div style={{maxWidth:400, marginBottom:20, marginTop:10}}>
        <input placeholder="Item Name" value={name} onChange={e=>setName(e.target.value)} className="card"/>
        <input placeholder="Price" type="number" value={price} onChange={e=>setPrice(e.target.value)} className="card" style={{marginTop:8}}/>
        <button className="btn btn-blue" onClick={handleAddOrUpdate} style={{marginTop:8}}>Add / Update</button>
      </div>
      <h3>Current Menu</h3>
      {menu.map((item, idx) => (
        <div key={idx} className="card">
          <div>{item.name}</div>
          <div>₹{item.price}</div>
        </div>
      ))}
    </div>
);
}
