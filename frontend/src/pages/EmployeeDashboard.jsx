import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EmployeeDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page-card">
      <h2 className="page-title">Employee Dashboard</h2>

      <p style={{ fontSize: "15px", color: "#555", marginBottom: "25px" }}>
        Welcome, <b>{user?.name}</b>
      </p>

      <div className="dashboard-actions">
        <Link to="/employee/apply-leave" className="dashboard-btn">
          Apply for Leave
        </Link>

        <Link to="/employee/my-leaves" className="dashboard-btn">
          My Leave History
        </Link>

        <Link to="/employee/my-balance" className="dashboard-btn">
          View Leave Balance
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
