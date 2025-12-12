import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [managers, setManagers] = useState([]);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    manager: "",
  });

  // Load managers list
  useEffect(() => {
    const loadManagers = async () => {
      try {
        const res = await axiosClient.get("/auth/managers");
        setManagers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadManagers();
  }, []);

  const onChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/auth/register", formData);

      const { token, role, name, email, _id } = res.data;

      login({ _id, name, email, role }, token);

      if (role === "employee") navigate("/employee/dashboard");
      else navigate("/manager/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Register</h2>

        {error && <div className="error-text">{error}</div>}

        <form onSubmit={onSubmit} className="form">
          <div className="form-group">
            <label>Name</label>
            <input name="name" value={formData.name} onChange={onChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email}
              onChange={onChange} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password"
              value={formData.password} onChange={onChange} required />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={onChange}>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Show manager dropdown ONLY for employees */}
          {formData.role === "employee" && (
            <div className="form-group">
              <label>Select Manager</label>
              <select
                name="manager"
                value={formData.manager}
                onChange={onChange}
                required
              >
                <option value="">-- Select Manager --</option>
                {managers.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.name} ({m.email})
                  </option>
                ))}
              </select>
            </div>
          )}

          <button type="submit" className="primary-button">
            Register
          </button>
        </form>

        <p className="muted-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
