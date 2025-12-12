import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const EmployeeDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="card">
        <h2>Employee Dashboard</h2>
        <p>Welcome, {user?.name}</p>

        <div className="grid">
          <Link to="/employee/apply-leave" className="card-link">
            Apply for Leave
          </Link>
          <Link to="/employee/my-leaves" className="card-link">
            View My Leave History
          </Link>
          <Link to="/employee/my-balance" className="card-link">
            View My Leave Balance
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
