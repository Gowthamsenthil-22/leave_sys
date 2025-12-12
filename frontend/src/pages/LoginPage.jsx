import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axiosClient.post("/auth/login", formData);
    login(res.data.user, res.data.token);
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Login</h2>

        <form onSubmit={onSubmit} className="form">
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={onChange}
              required
            />
          </div>

          <button className="primary-button">Login</button>
        </form>

        <p className="muted-text">
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
