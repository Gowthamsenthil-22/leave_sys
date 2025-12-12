import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ManagerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="center-box">
      <div className="card">

        <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
          Manager Dashboard
        </h2>
        <p style={{ marginBottom: "1.5rem", color: "#4b5563" }}>
          Welcome, {user?.name}
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link to="/manager/pending-requests">
            <button className="primary-button" style={{ width: 250 }}>View Pending Requests</button>
          </Link>

          <Link to="/manager/team-history">
            <button className="primary-button" style={{ width: 250 }}>View Team Leave History</button>
          </Link>

          <Link to="/manager/team-calendar">
            <button className="primary-button" style={{ width: 250 }}>View Team Leave Calendar</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ManagerDashboard;
