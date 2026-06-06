import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

export default function Register(){
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/register`, { username, password });
      alert("Registered! Please login.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Error registering");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <div style={{maxWidth:360}}>
        <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} className="card"/>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} className="card" style={{marginTop:8}}/>
        <div style={{marginTop:10}}>
          <button onClick={handleRegister} className="btn">Register</button>
        </div>
      </div>
    </div>
);
}
