import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Billing() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://brotherscafe-backend.onrender.com/api/menu")
      .then(res => setMenu(res.data))
      .catch(() => {});
  }, []);

  const addToCart = (item) => setCart([...cart, item]);
  const total = cart.reduce((sum, i) => sum + i.price, 0);

  const handleSavePrint = async () => {
    if(cart.length === 0) return alert("Cart is empty");

    try {
      // Save bill to backend
      await axios.post("https://brotherscafe-backend.onrender.com/api/bill/new", { items: cart, total });
      alert("Bill saved successfully!");

      // Date & Time
      const now = new Date();
      const dateStr = now.toLocaleDateString();
      const timeStr = now.toLocaleTimeString();

      // Print receipt
      const receiptWindow = window.open("", "PRINT", "width=300,height=600");
      const style = `
        <style>
          body { font-family: 'Courier New', monospace; font-size: 12px; width: 220px; margin: 0 auto; }
          .center { text-align: center; }
          .line { display: flex; justify-content: space-between; }
          hr { border: none; border-top: 1px dashed #000; margin: 4px 0; }
        </style>
      `;

      receiptWindow.document.write(`<html><head><title>Receipt</title>${style}</head><body>`);
      receiptWindow.document.write(`<div class='center' style='font-size:20px;'>🌳</div>`); // Tree logo
      receiptWindow.document.write(`<div class='center'><strong>Brothers Cafe</strong></div>`);
      receiptWindow.document.write(`<div class='center'>${dateStr} ${timeStr}</div>`); // Date & Time
      receiptWindow.document.write(`<div class='center'>Thank you for visiting!</div>`);
      receiptWindow.document.write(`<hr/>`);

      cart.forEach(item => {
        const name = item.name.length > 20 ? item.name.substring(0, 17) + '...' : item.name;
        receiptWindow.document.write(`<div class='line'><span>${name}</span><span>₹${item.price}</span></div>`);
      });

      receiptWindow.document.write(`<hr/>`);
      receiptWindow.document.write(`<div class='line'><strong>Total</strong><strong>₹${total}</strong></div>`);
      receiptWindow.document.write(`<hr/><div class='center'>Have a nice day!</div>`);
      receiptWindow.document.write(`</body></html>`);
      receiptWindow.document.close();
      receiptWindow.focus();
      receiptWindow.print();

      setCart([]);
    } catch (err) {
      console.error(err);
      alert("Error saving bill");
    }
  };

  // Filter menu items based on search
  const filteredMenu = menu.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container">
      <h2>☕ Brother's Cafe</h2>
      <div style={{marginBottom:10}}>
        <Link to="/menu-management">Manage Menu</Link>
        <Link to="/bills-list" style={{marginLeft:12}}>View Bills</Link>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search menu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="card"
        style={{ marginBottom: 12, padding: 6, width: '100%' }}
      />

      <h3>Menu</h3>
      {filteredMenu.length === 0 && <div className="card">No menu items found.</div>}
      {filteredMenu.map((item, idx) => (
        <div key={idx} className="card">
          <div>{item.name} — ₹{item.price}</div>
          <button className="btn" onClick={()=>addToCart(item)}>Add</button>
        </div>
      ))}

      <div style={{marginTop:20}}>
        <h3>Cart</h3>
        {cart.length===0 && <div className="card">Cart is empty</div>}
        {cart.map((i, idx) => (
          <div key={idx} className="card" style={{ display: "flex", justifyContent: "space-between" }}>
            <div>{i.name}</div>
            <div>₹{i.price}</div>
          </div>
        ))}
        <hr/>
        <h3>Total: ₹{total}</h3>
        <div style={{marginTop:10}}>
          <button className="btn btn-blue" onClick={handleSavePrint}>Save & Print</button>
        </div>
      </div>
    </div>
  );
}
