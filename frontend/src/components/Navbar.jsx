import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  // Hide navbar when user is not logged in
  if (!user) return null;

  return (
    <nav className="navbar">
      {user.role === "employee" && (
        <>
          <Link to="/employee/dashboard">Dashboard</Link>
          <Link to="/employee/apply-leave">Apply Leave</Link>
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

      <button className="logout-btn" onClick={logout}>
        Logout ({user.role})
      </button>
    </nav>
  );
};

export default Navbar;
