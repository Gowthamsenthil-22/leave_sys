import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const PendingRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await axiosClient.get("/leaves/pending/team");
        setRequests(res.data);
      } catch (error) {
        console.error("Failed to fetch pending requests", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, []);

  const handleDecision = async (id, status) => {
    try {
      await axiosClient.put(`/leaves/${id}/decision`, { status });
      setRequests((prev) => prev.filter((x) => x._id !== id));
    } catch (error) {
      alert("Failed to update leave status");
    }
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Pending Leave Requests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>From</th>
              <th>To</th>
              <th>Type</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.user?.name}</td>
                <td>{req.fromDate?.slice(0, 10)}</td>
                <td>{req.toDate?.slice(0, 10)}</td>
                <td>{req.leaveType}</td>
                <td>{req.reason}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="approve-btn"
                      onClick={() => handleDecision(req._id, "approved")}
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => handleDecision(req._id, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingRequestsPage;
