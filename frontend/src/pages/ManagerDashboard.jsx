import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ManagerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page-card">
      <h2 className="page-title">Manager Dashboard</h2>

      <p style={{ marginBottom: "25px", fontSize: "15px", color: "#555" }}>
        Welcome, <b>{user?.name}</b>
      </p>

      <div className="dashboard-actions">
        <Link to="/manager/pending-requests" className="dashboard-btn">
          View Pending Requests
        </Link>

        <Link to="/manager/team-history" className="dashboard-btn">
          Team Leave History
        </Link>

        <Link to="/manager/team-calendar" className="dashboard-btn">
          Team Leave Calendar
        </Link>
      </div>
    </div>
  );
};

export default ManagerDashboard;
