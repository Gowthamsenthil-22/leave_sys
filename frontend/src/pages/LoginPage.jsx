import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext.jsx';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const onChange = (e) => {
    setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axiosClient.post('/auth/login', formData);
      const { token, role, name, email, _id } = res.data;

      login({ _id, name, email, role }, token);

      if (role === 'employee') {
        navigate('/employee/dashboard');
      } else if (role === 'manager') {
        navigate('/manager/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 'Login failed. Please check your details.'
      );
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Login</h2>
        {error && <div className="error-text">{error}</div>}
        <form onSubmit={onSubmit} className="form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="primary-button">
            Login
          </button>
        </form>

        <p className="muted-text">
          Don&apos;t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
