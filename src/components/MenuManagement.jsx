import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://brotherscafe-backend.onrender.com/api/menu";

export default function MenuManagement() {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState(""); // 🔹 search term
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch menu
  const fetchMenu = async () => {
    try {
      const res = await axios.get(API_URL);
      setMenu(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching menu");
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Add new item
  const handleAdd = async () => {
    if (!name || !price) return alert("Enter name & price");
    try {
      const res = await axios.post(`${API_URL}/add`, { name, price: Number(price) });
      alert(res.data.message);
      setName("");
      setPrice("");
      fetchMenu();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error adding item");
    }
  };

  // Update item
  const handleUpdate = async () => {
    if (!editId) return alert("Select an item to update");
    if (!name || !price) return alert("Enter name & price");
    try {
      const res = await axios.put(`${API_URL}/${editId}`, { name, price: Number(price) });
      alert(res.data.message);
      setEditId(null);
      setName("");
      setPrice("");
      fetchMenu();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error updating item");
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      alert(res.data.message);
      setMenu((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error deleting item");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setName(item.name);
    setPrice(item.price);
  };

  const handleCancel = () => {
    setEditId(null);
    setName("");
    setPrice("");
  };

  // 🔹 Filtered menu based on search
  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2>☕ Menu Management</h2>
      <Link to="/billing">← Back to Billing</Link>

      {/* Search input */}
      <div style={{ maxWidth: 400, marginTop: 20 }}>
        <input
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="card"
          style={{ marginBottom: 16 }}
        />
      </div>

      {/* Add / Update Form */}
      <div style={{ maxWidth: 400, marginBottom: 20 }}>
        <input
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="card"
        />
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="card"
          style={{ marginTop: 8 }}
        />
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button className="btn btn-green" onClick={handleAdd} disabled={!!editId}>
            Add
          </button>
          {editId && (
            <>
              <button className="btn btn-yellow" onClick={handleUpdate}>
                Update
              </button>
              <button className="btn btn-gray" onClick={handleCancel}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Menu List */}
      <h3>Current Menu</h3>
      {filteredMenu.length === 0 ? (
        <p>No items found.</p>
      ) : (
        filteredMenu.map((item) => (
          <div
            key={item._id}
            className="card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 8,
              marginBottom: 8,
              alignItems: "center",
            }}
          >
            <div>
              <strong>{item.name}</strong> — ₹{item.price}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => handleEdit(item)} className="btn btn-blue">
                Edit
              </button>
              <button onClick={() => handleDelete(item._id)} className="btn btn-red">
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
