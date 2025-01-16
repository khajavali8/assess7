import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/Forgotpassword';
import ResetPassword from './components/Resetpassword';
import Dashboard from './components/Dashboard';
import CreateEmployee from '../src/components/CreateEmployee';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="navbar-container">
        <nav>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/forgot-password">Forgot Password</Link>
            </li>
            <li>
              <Link to="/change-password">Reset Password</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/CreateEmployee">CreateEmployee</Link>
            </li>
          </ul>
        </nav>
        <div className="form-container">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/CreateEmployee" element={<CreateEmployee />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
