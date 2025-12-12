import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient"; // FIXED PATH ✔

const TeamHistoryPage = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setError("");
        const res = await axiosClient.get("/leaves/team/history");
        setLeaves(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch team leave history.");
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="page-container">
      <div className="card">
        <h2>Team Leave History</h2>
        {error && <div className="error-text">{error}</div>}

        {leaves.length === 0 ? (
          <p>No leave history found.</p>
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
                  <th>Status</th>
                  <th>Manager Comment</th>
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
                    <td>{leave.status}</td>
                    <td>{leave.managerComment || "-"}</td>
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

export default TeamHistoryPage;
