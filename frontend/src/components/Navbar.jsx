import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <h3 className="nav-logo">Leave & Expense (Leave Only)</h3>

      {user && (
        <div className="nav-links">
          {user.role === "employee" && (
            <>
              <Link className={pathname.includes("dashboard") ? "active" : ""} to="/employee/dashboard">Dashboard</Link>
              <Link className={pathname.includes("apply") ? "active" : ""} to="/employee/apply-leave">Apply</Link>
              <Link className={pathname.includes("my-leaves") ? "active" : ""} to="/employee/my-leaves">My Leaves</Link>
              <Link className={pathname.includes("balance") ? "active" : ""} to="/employee/my-balance">Balance</Link>
            </>
          )}

          {user.role === "manager" && (
            <>
              <Link className={pathname.includes("dashboard") ? "active" : ""} to="/manager/dashboard">Dashboard</Link>
              <Link className={pathname.includes("pending") ? "active" : ""} to="/manager/pending-requests">Pending</Link>
              <Link className={pathname.includes("history") ? "active" : ""} to="/manager/team-history">History</Link>
              <Link className={pathname.includes("calendar") ? "active" : ""} to="/manager/team-calendar">Calendar</Link>
            </>
          )}
        </div>
      )}

      <div className="nav-right">
        {user ? (
          <button className="logout-btn" onClick={logout}>
            Logout ({user.role})
          </button>
        ) : (
          <>
            <Link className="auth-link" to="/login">Login</Link>
            <Link className="auth-link" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
