import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h3 className="nav-logo">Leave & Expense (Leave Only)</h3>

        {user && user.role === "employee" && (
          <div className="nav-links">
            <Link to="/employee/dashboard">Dashboard</Link>
            <Link to="/employee/apply-leave">Apply</Link>
            <Link to="/employee/my-leaves">My Leaves</Link>
            <Link to="/employee/my-balance">Balance</Link>
          </div>
        )}

        {user && user.role === "manager" && (
          <div className="nav-links">
            <Link to="/manager/dashboard">Dashboard</Link>
            <Link to="/manager/pending-requests">Pending</Link>
            <Link to="/manager/team-history">History</Link>
            <Link to="/manager/team-calendar">Calendar</Link>
          </div>
        )}
      </div>

      <div className="nav-right">
        {user ? (
          <button className="logout-btn" onClick={logout}>
            Logout ({user.role})
          </button>
        ) : (
          <>
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/register" className="auth-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

