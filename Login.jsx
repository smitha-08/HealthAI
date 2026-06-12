import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const { setUser } = useContext(UserContext);



const handleSubmit = (e) => {
  e.preventDefault();

  axios.post("http://localhost:5000/api/auth/login", data)
    .then(res => {
      alert("Logged in successfully!");
      // store JWT token for future auth
      localStorage.setItem("token", res.data.token);
      navigate("/symptom-check");
    })
    .catch(err => {
      alert(err.response?.data?.error || "Invalid credentials!");
    });
};


  return (
   
    <div className="auth-bg">
      <div className="auth-card fade-in">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-sub">Login to continue</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button className="btn-primary" type="submit">
            Login
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

