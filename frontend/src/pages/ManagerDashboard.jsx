import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ManagerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="card">
        <h2>Manager Dashboard</h2>
        <p>Welcome, {user?.name}</p>

        <div className="grid">
          <Link to="/manager/pending-requests" className="card-link">
            View Pending Requests
          </Link>
          <Link to="/manager/team-history" className="card-link">
            View Team Leave History
          </Link>
          <Link to="/manager/team-calendar" className="card-link">
            View Team Leave Calendar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
