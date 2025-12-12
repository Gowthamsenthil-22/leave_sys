import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  // ❌ If user is NOT logged in → HIDE NAVBAR
  if (!user) return null;

  return (
    <nav className="navbar">
      <Link to={
        user.role === "manager"
          ? "/manager/dashboard"
          : "/employee/dashboard"
      }>
        Dashboard
      </Link>

      {user.role === "manager" && (
        <>
          <Link to="/manager/pending">Pending</Link>
          <Link to="/manager/history">History</Link>
          <Link to="/manager/calendar">Calendar</Link>
        </>
      )}

      {user.role === "employee" && (
        <>
          <Link to="/employee/myleaves">My Leaves</Link>
          <Link to="/employee/balance">Balance</Link>
        </>
      )}

      <button onClick={logout}>Logout ({user.role})</button>
    </nav>
  );
};

export default Navbar;
