import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import ManagerDashboard from './pages/ManagerDashboard.jsx';
import ApplyLeavePage from './pages/ApplyLeavePage.jsx';
import MyLeavesPage from './pages/MyLeavesPage.jsx';
import MyBalancePage from './pages/MyBalancePage.jsx';
import PendingRequestsPage from './pages/PendingRequestsPage.jsx';
import TeamHistoryPage from './pages/TeamHistoryPage.jsx';
import TeamCalendarPage from './pages/TeamCalendarPage.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Employee routes */}
          <Route
            path="/employee/dashboard"
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/apply-leave"
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <ApplyLeavePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/my-leaves"
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <MyLeavesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/my-balance"
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <MyBalancePage />
              </ProtectedRoute>
            }
          />

          {/* Manager routes */}
          <Route
            path="/manager/dashboard"
            element={
              <ProtectedRoute allowedRoles={['manager']}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager/pending-requests"
            element={
              <ProtectedRoute allowedRoles={['manager']}>
                <PendingRequestsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager/team-history"
            element={
              <ProtectedRoute allowedRoles={['manager']}>
                <TeamHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager/team-calendar"
            element={
              <ProtectedRoute allowedRoles={['manager']}>
                <TeamCalendarPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<div style={{ padding: '1rem' }}>Page not found</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
