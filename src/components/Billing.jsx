import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Billing() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("https://brotherscafe-backend.onrender.com/api/menu").then(res => setMenu(res.data)).catch(()=>{});
  }, []);

  const addToCart = (item) => setCart([...cart, item]);
  const total = cart.reduce((sum, i) => sum + i.price, 0);

  const handleSave = async () => {
    if(cart.length===0) return alert("Cart is empty");
    try {
      await axios.post("https://brotherscafe-backend.onrender.com/api/bill/new", { items: cart, total });
      alert("Bill saved successfully!");
      setCart([]);
    } catch (err) {
      alert("Error saving bill");
    }
  };

  const handlePrint = () => {
    if(cart.length===0) return alert("Cart is empty");

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
    receiptWindow.document.write(`<div class='center'><strong>Brothers Cafe</strong></div>`);
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
  };

  return (
    <div className="container">
      <h2>☕ Coffee Billing</h2>
      <div style={{marginBottom:10}}>
        <Link to="/menu-management">Manage Menu</Link>
        <Link to="/bills-list" style={{marginLeft:12}}>View Bills</Link>
      </div>
      <h3>Menu</h3>
      {menu.length===0 && <div className="card">No menu items. Add items in Menu Management.</div>}
      {menu.map((item, idx) => (
        <div key={idx} className="card">
          <div>{item.name} — ₹{item.price}</div>
          <button className="btn" onClick={()=>addToCart(item)}>Add</button>
        </div>
      ))}
      <div style={{marginTop:20}}>
        <h3>Cart</h3>
        {cart.length===0 && <div className="card">Cart is empty</div>}
        {cart.map((i, idx) => (
          <div key={idx} className="card">
            <div>{i.name}</div>
            <div>₹{i.price}</div>
          </div>
        ))}
        <hr/>
        <h3>Total: ₹{total}</h3>
        <div style={{marginTop:10}}>
          <button className="btn btn-blue" onClick={handleSave}>Save</button>
          <button className="btn" onClick={handlePrint} style={{marginLeft:12}}>Print</button>
        </div>
      </div>
    </div>
);
}
