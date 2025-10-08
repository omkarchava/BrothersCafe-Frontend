import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Billing from "./components/Billing.jsx";
import MenuManagement from "./components/MenuManagement.jsx";
import SalesReport from "./components/SalesReport.jsx";
import BillsList from "./components/BillsList.jsx";

export default function App(){
  return (
    <div>
      <nav style={{padding:10, background:'#fff', borderBottom:'1px solid #eee'}}>
        <Link to="/billing" style={{marginRight:12}}>Billing</Link>
        <Link to="/menu-management" style={{marginRight:12}}>Menu</Link>
        <Link to="/bills-list" style={{marginRight:12}}>Bills</Link>
        <Link to="/sales-report" style={{marginRight:12}}>Sales Report</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/billing" element={<Billing/>} />
        <Route path="/menu-management" element={<MenuManagement/>} />
        <Route path="/bills-list" element={<BillsList/>} />
        <Route path="/sales-report" element={<SalesReport/>} />
      </Routes>
    </div>
  );
}
