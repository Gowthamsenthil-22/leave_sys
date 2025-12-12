import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ManagerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="card">
        <h2>Manager Dashboard</h2>
        <p>Welcome, <strong>{user?.name}</strong></p>

        <div className="dashboard-actions">
          <Link to="/manager/pending-requests" className="dashboard-button">
            View Pending Requests
          </Link>

          <Link to="/manager/team-history" className="dashboard-button">
            View Team Leave History
          </Link>

          <Link to="/manager/team-calendar" className="dashboard-button">
            View Team Leave Calendar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
