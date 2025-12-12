import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const PendingRequestsPage = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState('');

  const fetchPending = async () => {
    try {
      setError('');
      const res = await axiosClient.get('/leaves/team/pending');
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch pending requests.');
    }
  };

  const decide = async (id, status) => {
    const managerComment = window.prompt(`Enter comment for ${status}:`, '');
    try {
      await axiosClient.put(`/leaves/${id}/decision`, {
        status,
        managerComment,
      });
      fetchPending();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to update leave.');
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div className="page-container">
      <div className="card">
        <h2>Pending Leave Requests</h2>
        {error && <div className="error-text">{error}</div>}

        {leaves.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Email</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Type</th>
                  <th>Reason</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave._id}>
                    <td>{leave.user?.name}</td>
                    <td>{leave.user?.email}</td>
                    <td>{leave.fromDate?.slice(0, 10)}</td>
                    <td>{leave.toDate?.slice(0, 10)}</td>
                    <td>{leave.leaveType}</td>
                    <td>{leave.reason}</td>
                    <td>
                      <button
                        className="primary-button small-button"
                        onClick={() => decide(leave._id, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="danger-button small-button"
                        onClick={() => decide(leave._id, 'rejected')}
                      >
                        Reject
                      </button>
                    </td>
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

export default PendingRequestsPage;
