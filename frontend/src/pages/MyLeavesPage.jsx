import React, { useState } from "react";
import axiosClient from "../api/axiosClient";

const ApplyLeavePage = () => {
  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    leaveType: "casual",
    reason: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axiosClient.post("/leaves/apply", form);
    alert("Leave applied successfully!");
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Apply for Leave</h2>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>From Date</label>
          <input type="date" name="fromDate" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>To Date</label>
          <input type="date" name="toDate" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Leave Type</label>
          <select name="leaveType" onChange={handleChange}>
            <option value="casual">Casual Leave</option>
            <option value="sick">Sick Leave</option>
            <option value="earned">Earned Leave</option>
          </select>
        </div>

        <div className="form-group">
          <label>Reason</label>
          <textarea
            name="reason"
            rows="4"
            style={{ width: "100%", padding: "12px" }}
            required
            onChange={handleChange}
          ></textarea>
        </div>

        <button className="primary-btn">Submit</button>
      </form>
    </div>
  );
};

export default ApplyLeavePage;
