import React, { useState } from 'react';
import './index.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { message } from 'antd'; 

const LoginSignup = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  
    try {
      if (login) {
        const response = await axios.post(`brewery-app-backend-git-master-thirupathireddy-s-projects.vercel.app/api/login`, formData);
        console.log("Login response:", response.data);
        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          console.log("Navigating to /home");
          navigate('/Home');  // Use navigate here
        } else {
          console.log("Login failed:", response.data.message);
        }
      } else {
        const response = await axios.post(`brewery-app-backend-git-master-thirupathireddy-s-projects.vercel.app/api/register`, formData);
        console.log("Register response:", response.data);
        localStorage.setItem('token', response.data.token);
        message.success('User created successfully. Switching to login.');
  
        // Switch to login form
        setLogin(true);
  
        // Clear form inputs
        setFormData({
          username: '',
          email: '',
          password: '',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      message.error('Error submitting form. Please try again.');
    }
  };  

  const toggleForm = () => {
    setLogin((prevLogin) => !prevLogin);
  };

  return (
    <div className="loginSignup-container">
      <form className="form" onSubmit={handleFormSubmit}>
        <h2>{login ? 'Login' : 'Sign Up'}</h2>
        {!login && (
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
            required
          />
        </div>
        <button type="submit">{login ? <Link to={`/Home`}><span className='login'>Login</span></Link> : 'Sign Up'}</button>
        <p onClick={toggleForm}>
          {login ? 'Need an account? Sign up' : 'Already have an account? Login'}
        </p>
      </form>
    </div>
  );
};

export default LoginSignup;
