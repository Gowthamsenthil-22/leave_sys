import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [managers, setManagers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    manager: "",
  });

  useEffect(() => {
    axiosClient.get("/auth/managers").then((res) => setManagers(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await axiosClient.post("/auth/register", form);

    login(res.data.user, res.data.token);

    if (res.data.user.role === "employee") navigate("/employee/dashboard");
    else navigate("/manager/dashboard");
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Register</h2>

      <form onSubmit={onSubmit}>
        
        <div className="form-group">
          <label>Name</label>
          <input name="name" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input name="email" type="email" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input name="password" type="password" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        {form.role === "employee" && (
          <div className="form-group">
            <label>Assign Manager</label>
            <select name="manager" onChange={handleChange} required>
              <option value="">Select Manager</option>
              {managers.map((m) => (
                <option value={m._id} key={m._id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button className="primary-btn">Register</button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
