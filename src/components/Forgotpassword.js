import React, { useState } from 'react';
import API from '../Api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/forgot-password', { email });
      alert('Password reset link sent to your email!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error during request');
    }
  };

  return (
    <div className="background">
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Reset Link</button>
    </form>
    </div>
  );
};

export default ForgotPassword;