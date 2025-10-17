import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const [message, setMessage] = useState("Logging out...");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setMessage("✅ Logged out successfully! Redirecting...");
      setTimeout(() => navigate("/"), 1000);
    }, 500);
  }, []);

  return (
    <div
      className="page"
      style={{
        padding: "40px",
        textAlign: "center",
        color: "0a74ff",
        background: "#fdfaf7",
      }}
    >
      <h2>{message}</h2>
    </div>
  );
}
