import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const PendingRequestsPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axiosClient.get("/leaves/pending/team").then((res) => {
      setRequests(res.data);
    });
  }, []);

  return (
    <div className="page-card">
      <h2 className="page-title">Pending Leave Requests</h2>

      {requests.length === 0 ? (
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
                  <button
                    className="primary-btn"
                    style={{ padding: "8px 12px", fontSize: "14px" }}
                    onClick={async () => {
                      await axiosClient.put(`/leaves/${req._id}/decision`, {
                        status: "approved",
                      });
                      setRequests((prev) => prev.filter((x) => x._id !== req._id));
                    }}
                  >
                    Approve
                  </button>

                  <button
                    className="secondary-button"
                    style={{ padding: "8px 12px", marginLeft: "8px" }}
                    onClick={async () => {
                      await axiosClient.put(`/leaves/${req._id}/decision`, {
                        status: "rejected",
                      });
                      setRequests((prev) => prev.filter((x) => x._id !== req._id));
                    }}
                  >
                    Reject
                  </button>
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
