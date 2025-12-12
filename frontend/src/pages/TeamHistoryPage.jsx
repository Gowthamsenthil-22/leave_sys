import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const TeamHistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axiosClient.get("/leaves/team/history").then((res) => {
      setHistory(res.data);
    });
  }, []);

  return (
    <div className="page-card">
      <h2 className="page-title">Team Leave History</h2>

      {history.length === 0 ? (
        <p>No leave records.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {history.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.user?.name}</td>
                <td>{leave.leaveType}</td>
                <td>{leave.fromDate?.slice(0, 10)}</td>
                <td>{leave.toDate?.slice(0, 10)}</td>
                <td>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeamHistoryPage;
