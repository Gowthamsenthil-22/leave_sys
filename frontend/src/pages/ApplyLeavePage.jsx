import React, { useState } from "react";
import axiosClient from "../api/axiosClient";

const ApplyLeavePage = () => {
  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    leaveType: "casual",
    reason: "",
  });

  const [loading, setLoading] = useState(false); // 🔥 NEW

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // 🚫 block double click
    setLoading(true);

    try {
      await axiosClient.post("/leaves/apply", form);
      alert("Leave applied successfully!");

      // optional: reset form
      setForm({
        fromDate: "",
        toDate: "",
        leaveType: "casual",
        reason: "",
      });
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to apply leave. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Apply for Leave</h2>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>From Date</label>
          <input
            type="date"
            name="fromDate"
            value={form.fromDate}
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>To Date</label>
          <input
            type="date"
            name="toDate"
            value={form.toDate}
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Leave Type</label>
          <select
            name="leaveType"
            value={form.leaveType}
            onChange={handleChange}
          >
            <option value="casual">Casual</option>
            <option value="sick">Sick</option>
            <option value="earned">Earned</option>
          </select>
        </div>

        <div className="form-group">
          <label>Reason</label>
          <textarea
            name="reason"
            rows="4"
            value={form.reason}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
            }}
          ></textarea>
        </div>

        <button className="primary-btn" disabled={loading}>
          {loading ? "Submitting..." : "Apply"}
        </button>
      </form>
    </div>
  );
};

export default ApplyLeavePage;
