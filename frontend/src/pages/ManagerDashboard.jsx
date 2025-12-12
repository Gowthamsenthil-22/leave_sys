import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ManagerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Manager Dashboard</h2>

        <p className="welcome-text">
          Welcome, <strong>{user?.name}</strong>
        </p>

        <div className="dashboard-buttons">
          <Link to="/manager/pending-requests" className="dash-btn">
            View Pending Requests
          </Link>

          <Link to="/manager/team-history" className="dash-btn">
            View Team Leave History
          </Link>

          <Link to="/manager/team-calendar" className="dash-btn">
            View Team Leave Calendar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
