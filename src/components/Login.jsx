import React, {useState} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login(){
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://brotherscafe-backend.onrender.com/api/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/billing");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="container">
      <h2>☕ Coffee Billing — Login</h2>
      <div style={{maxWidth:360}}>
        <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} className="card" />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} className="card" style={{marginTop:8}} />
        <div style={{marginTop:10}}>
          <button onClick={handleLogin} className="btn">Login</button>
          <Link to="/register" style={{marginLeft:12}}>Register</Link>
        </div>
      </div>
    </div>
    );
}
