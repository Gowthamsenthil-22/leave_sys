import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const TeamCalendarPage = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState('');

  const fetchCalendar = async () => {
    try {
      setError('');
      const params = {};
      if (fromDate) params.from = fromDate;
      if (toDate) params.to = toDate;

      const res = await axiosClient.get('/leaves/team/calendar', {
        params,
      });
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch calendar data.');
    }
  };

  useEffect(() => {
    fetchCalendar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    fetchCalendar();
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Team Leave Calendar (Simple View)</h2>
        {error && <div className="error-text">{error}</div>}

        <form onSubmit={onSubmit} className="form-inline">
          <div className="form-group">
            <label>From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <button type="submit" className="primary-button">
            Filter
          </button>
        </form>

        {leaves.length === 0 ? (
          <p>No leaves in this range.</p>
        ) : (
          <ul className="calendar-list">
            {leaves.map((leave) => (
              <li key={leave._id} className="calendar-item">
                <div>
                  <strong>{leave.user?.name}</strong> ({leave.leaveType}) –{' '}
                  {leave.fromDate?.slice(0, 10)} to {leave.toDate?.slice(0, 10)}
                </div>
                <div>Status: {leave.status}</div>
                {leave.reason && <div>Reason: {leave.reason}</div>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TeamCalendarPage;
