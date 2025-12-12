import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const MyLeavesPage = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axiosClient.get("/leaves/my").then((res) => {
      setLeaves(res.data);
    });
  }, []);

  const cancelLeave = async (id) => {
    await axiosClient.put(`/leaves/${id}/cancel`);
    setLeaves((prev) => prev.filter((x) => x._id !== id));
  };

  return (
    <div className="page-card">
      <h2 className="page-title">My Leave History</h2>

      {leaves.length === 0 ? (
        <p>No leave applications found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Type</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Action</th>
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
                <td>
                  {leave.status === "pending" && (
                    <button
                      className="secondary-button"
                      onClick={() => cancelLeave(leave._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyLeavesPage;
