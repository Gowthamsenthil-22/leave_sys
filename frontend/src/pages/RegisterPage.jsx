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

  // Load all managers for dropdown
  useEffect(() => {
    axiosClient
      .get("/auth/managers")
      .then((res) => setManagers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ⭐ FIXED SUBMIT FUNCTION
  const onSubmit = async (e) => {
    e.preventDefault();

    // Build final payload
    const payload = { ...form };

    // 🔥 IMPORTANT FIX: Remove manager field for managers
    if (form.role === "manager") {
      delete payload.manager;
    }

    try {
      const res = await axiosClient.post("/auth/register", payload);

      // backend returns: { user, token }
      const { user, token } = res.data;

      // store in context + localStorage
      login(user, token);

      // redirect based on role
      if (user.role === "employee") navigate("/employee/dashboard");
      else navigate("/manager/dashboard");
      
    } catch (err) {
      console.log("Registration error:", err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Register</h2>

      <form onSubmit={onSubmit}>

        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        {/* Only show manager dropdown for employees */}
        {form.role === "employee" && (
          <div className="form-group">
            <label>Assign Manager</label>
            <select
              name="manager"
              value={form.manager}
              onChange={handleChange}
              required
            >
              <option value="">Select Manager</option>

              {managers.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name} ({m.email})
                </option>
              ))}
            </select>
          </div>
        )}

        <button className="primary-btn" type="submit">Register</button>
      </form>

      <p style={{ marginTop: "10px", fontSize: "14px" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
