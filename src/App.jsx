import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Billing from "./components/Billing.jsx";
import MenuManagement from "./components/MenuManagement.jsx";
import SalesReport from "./components/SalesReport.jsx";
import BillsList from "./components/BillsList.jsx";
import Logout from "./components/Logout.jsx"

export default function App(){
  return (
    <div>
      <nav style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          background: "#fff",
          borderBottom: "1px solid #eee",
        }}>
        <Link to="/billing" style={{marginRight:12,padding: "6px 12px",
              background: "#0a74ff",
              color: "#fff",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",}}>Billing</Link>
        <Link to="/menu-management" style={{marginRight:12,padding: "6px 12px",
              background: "#0a74ff",
              color: "#fff",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",}}>Menu</Link>
        <Link to="/bills-list" style={{marginRight:12,padding: "6px 12px",
              background: "#0a74ff",
              color: "#fff",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",}}>Bills</Link>
        <Link to="/sales-report" style={{marginRight:12,padding: "6px 12px",
              background: "#0a74ff",
              color: "#fff",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",}}>Sales Report</Link>
        <Link to="/Logout" style={{
              padding: "6px 12px",
              background: "#eb1313ff",
              color: "#fff",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",
            }}>Logout</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/billing" element={<Billing/>} />
        <Route path="/menu-management" element={<MenuManagement/>} />
        <Route path="/bills-list" element={<BillsList/>} />
        <Route path="/sales-report" element={<SalesReport/>} />
        <Route path="/Logout" element={<Logout/>} />
      </Routes>
    </div>
  );
}
