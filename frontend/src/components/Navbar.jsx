import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">Leave &amp; Expense (Leave Only)</span>
      </div>

      <button
        className="navbar-toggle"
        onClick={() => {
          const nav = document.querySelector('.navbar-links');
          if (nav) {
            nav.classList.toggle('navbar-links-show');
          }
        }}
      >
        ☰
      </button>

      <div className="navbar-links">
        {!user && (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}

        {user && user.role === 'employee' && (
          <>
            <Link to="/employee/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/employee/apply-leave" className="nav-link">
              Apply Leave
            </Link>
            <Link to="/employee/my-leaves" className="nav-link">
              My Leaves
            </Link>
            <Link to="/employee/my-balance" className="nav-link">
              Balance
            </Link>
          </>
        )}

        {user && user.role === 'manager' && (
          <>
            <Link to="/manager/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/manager/pending-requests" className="nav-link">
              Pending
            </Link>
            <Link to="/manager/team-history" className="nav-link">
              History
            </Link>
            <Link to="/manager/team-calendar" className="nav-link">
              Calendar
            </Link>
          </>
        )}

        {user && (
          <button className="nav-button" onClick={handleLogout}>
            Logout ({user.role})
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
