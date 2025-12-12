import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const TeamCalendarPage = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axiosClient.get("/leaves/team/calendar").then((res) => {
      setLeaves(res.data);
    });
  }, []);

  return (
    <div className="page-card">
      <h2 className="page-title">Team Leave Calendar</h2>

      {leaves.length === 0 ? (
        <p>No leave events.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date Range</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((l) => (
              <tr key={l._id}>
                <td>{l.user?.name}</td>
                <td>
                  {l.fromDate?.slice(0, 10)} → {l.toDate?.slice(0, 10)}
                </td>
                <td>{l.leaveType}</td>
                <td>{l.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default TeamCalendarPage;
