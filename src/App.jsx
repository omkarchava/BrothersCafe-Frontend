import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Billing from "./components/Billing.jsx";
import MenuManagement from "./components/MenuManagement.jsx";
import SalesReport from "./components/SalesReport.jsx";
import BillsList from "./components/BillsList.jsx";
import Logout from "./components/Logout.jsx";

export default function App() {
  const location = useLocation();

  // Persistent login state
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  const navLinkStyle = {
    marginRight: 12,
    padding: "6px 12px",
    background: "#0a74ff",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
  };

  return (
    <div>
      {/* Navbar only if logged in */}
      {isLoggedIn && (
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            background: "#fff",
            borderBottom: "1px solid #eee",
          }}
        >
          <div>
            <Link to="/billing" style={navLinkStyle}>
              Billing
            </Link>
            <Link to="/menu-management" style={navLinkStyle}>
              Menu
            </Link>
            <Link to="/bills-list" style={navLinkStyle}>
              Bills
            </Link>
            <Link to="/sales-report" style={navLinkStyle}>
              Sales Report
            </Link>
          </div>
          <Link to="/logout" style={{ ...navLinkStyle, background: "#eb1313ff" }}>
            Logout
          </Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/menu-management" element={<MenuManagement />} />
        <Route path="/bills-list" element={<BillsList />} />
        <Route path="/sales-report" element={<SalesReport />} />
        <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
}
