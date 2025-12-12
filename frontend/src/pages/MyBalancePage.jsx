import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const MyBalancePage = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    axiosClient.get("/leaves/balance").then((res) => setBalance(res.data));
  }, []);

  return (
    <div className="page-card">
      <h2 className="page-title">My Leave Balance</h2>

      {!balance ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Casual</th>
              <th>Sick</th>
              <th>Earned</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{balance.casual}</td>
              <td>{balance.sick}</td>
              <td>{balance.earned}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBalancePage;
