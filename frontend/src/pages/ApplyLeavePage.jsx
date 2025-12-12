import React, { useState } from 'react';
import axiosClient from '../api/axiosClient';

const ApplyLeavePage = () => {
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    leaveType: 'casual',
    reason: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onChange = (e) => {
    setError('');
    setSuccess('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axiosClient.post('/leaves/apply', formData);
      setSuccess('Leave applied successfully!');
      setFormData({
        fromDate: '',
        toDate: '',
        leaveType: 'casual',
        reason: '',
      });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 'Failed to apply for leave. Try again.'
      );
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Apply for Leave</h2>
        {error && <div className="error-text">{error}</div>}
        {success && <div className="success-text">{success}</div>}

        <form onSubmit={onSubmit} className="form">
          <div className="form-group">
            <label>From Date</label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label>To Date</label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Leave Type</label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={onChange}
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
              value={formData.reason}
              onChange={onChange}
              placeholder="Enter reason"
              rows={3}
              required
            />
          </div>

          <button type="submit" className="primary-button">
            Submit Leave Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeavePage;
