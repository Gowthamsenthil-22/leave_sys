import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ManagerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="card dashboard-card">
        <h2>Manager Dashboard</h2>
        <p>Welcome, {user?.name}</p>

        <div className="dashboard-links">
          <Link to="/manager/pending-requests">View Pending Requests</Link>
          <Link to="/manager/team-history">View Team Leave History</Link>
          <Link to="/manager/team-calendar">View Team Leave Calendar</Link>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
