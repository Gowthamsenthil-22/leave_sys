import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const MyLeavesPage = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState('');

  const fetchLeaves = async () => {
    try {
      setError('');
      const res = await axiosClient.get('/leaves/my');
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch leaves.');
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="page-container">
      <div className="card">
        <h2>My Leave History</h2>
        {error && <div className="error-text">{error}</div>}

        {leaves.length === 0 ? (
          <p>No leave applications found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Reason</th>
                </tr>
              </thead>

              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave._id}>
                    <td>{leave.fromDate?.slice(0, 10)}</td>
                    <td>{leave.toDate?.slice(0, 10)}</td>
                    <td>{leave.leaveType}</td>
                    <td>{leave.status}</td>
                    <td>{leave.reason}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLeavesPage;
