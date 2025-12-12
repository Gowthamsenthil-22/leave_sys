import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      {/* LEFT SIDE */}
      <div className="nav-left">
        <h3 className="nav-logo">Leave & Expense (Leave Only)</h3>

        {user && (
          <div className="nav-links">
            {user.role === "employee" && (
              <>
                <Link to="/employee/dashboard">Dashboard</Link>
                <Link to="/employee/apply-leave">Apply</Link>
                <Link to="/employee/my-leaves">My Leaves</Link>
                <Link to="/employee/my-balance">Balance</Link>
              </>
            )}

            {user.role === "manager" && (
              <>
                <Link to="/manager/dashboard">Dashboard</Link>
                <Link to="/manager/pending-requests">Pending</Link>
                <Link to="/manager/team-history">History</Link>
                <Link to="/manager/team-calendar">Calendar</Link>
              </>
            )}
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
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
