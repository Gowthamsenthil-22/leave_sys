import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await axiosClient.post("/auth/login", form);

    login(res.data.user, res.data.token);

    if (res.data.user.role === "employee") navigate("/employee/dashboard");
    else navigate("/manager/dashboard");
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Login</h2>

      <form onSubmit={onSubmit}>

        <div className="form-group">
          <label>Email</label>
          <input name="email" type="email" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input name="password" type="password" required onChange={handleChange} />
        </div>

        <button className="primary-btn">Login</button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
