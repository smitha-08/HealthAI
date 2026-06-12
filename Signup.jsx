import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }



function handleSubmit(e) {
  e.preventDefault();

  axios.post("http://localhost:5000/api/auth/signup", form)
    .then(res => {
      alert(res.data.message || "Signup successful!");
      navigate("/login");
    })
    .catch(err => {
      alert(err.response?.data?.error || "Signup failed!");
    });
}


  return (
    
   
    <div className="auth-bg">
      <div className="auth-card fade-in">
        <h2 className="auth-title">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="btn-primary" type="submit">
            Sign Up
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

