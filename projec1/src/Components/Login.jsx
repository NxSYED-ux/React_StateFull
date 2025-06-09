import React, { useState } from 'react';
import './Styles/Login.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstace';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/Login', formData);
      if (response.status === 200) {
        localStorage.setItem('sessionId', response.data.sessionId);
        window.location.href = `/userhome?email=${formData.email}`;
      }
    } catch (e) {
      console.error('Error during login:', e);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="login-container">
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          <input type="submit" value="Login" />
        </form>
        <p>Don't have an account? <Link to="/SignUp">Sign Up</Link></p>
      </div>
    </>
  );
}
