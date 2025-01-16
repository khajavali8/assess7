import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../Api';


const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/change-password', { token, newPassword ,oldPassword });
      alert('Password reset successful!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div className="background">
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
    </form>
    </div>
  );
};

export default ResetPassword;
