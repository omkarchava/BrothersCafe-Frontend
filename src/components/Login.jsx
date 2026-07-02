import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config";

export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const start = Date.now();

      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );

      console.log(
        "Login Time:",
        Date.now() - start,
        "ms"
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "username",
        res.data.username
      );

      if (setIsLoggedIn) {
        setIsLoggedIn(true);
      }

      setIsSuccess(true);
      setMessage(
        "✅ Login successful! Redirecting..."
      );

      setTimeout(() => {
        navigate("/billing");
      }, 1200);
    } catch (err) {
      setIsSuccess(false);

      const errorMsg =
        err.response?.data?.message ||
        "Invalid credentials.";

      setMessage(`❌ ${errorMsg}`);
    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "80px",
      }}
    >
      <h2 style={{ color: "#0a74ff" }}>
        Brothers Cafe Sangrul
      </h2>

      <div
        style={{
          maxWidth: 360,
          width: "100%",
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.1)",
          marginTop: 20,
        }}
      >
        <input
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="card"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="card"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <div
          style={{
            marginTop: 16,
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            onClick={handleLogin}
            className="btn"
            style={{
              background: "#0a74ff",
              color: "#fff",
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <Link
            to="/register"
            style={{
              marginLeft: 12,
              textDecoration: "none",
              color: "#3e2723",
            }}
          >
            Register
          </Link>
        </div>

        {message && (
          <div
            style={{
              marginTop: "16px",
              padding: "10px 14px",
              background: isSuccess
                ? "#c8e6c9"
                : "#ffcdd2",
              color: "#0a74ff",
              borderRadius: "6px",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}