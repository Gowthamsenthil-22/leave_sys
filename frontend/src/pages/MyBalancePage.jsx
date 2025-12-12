import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const MyBalancePage = () => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setError('');
        const res = await axiosClient.get('/leaves/balance');
        setBalance(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch leave balance.');
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="page-container">
      <div className="card">
        <h2>My Leave Balance</h2>
        {error && <div className="error-text">{error}</div>}

        {!balance ? (
          <p>No balance data found.</p>
        ) : (
          <div className="grid">
            <div className="balance-card">
              <h4>Casual Leaves</h4>
              <p>{balance.casual}</p>
            </div>
            <div className="balance-card">
              <h4>Sick Leaves</h4>
              <p>{balance.sick}</p>
            </div>
            <div className="balance-card">
              <h4>Earned Leaves</h4>
              <p>{balance.earned}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBalancePage;
