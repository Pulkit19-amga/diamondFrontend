import React, { useState } from 'react';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: '',
    password: '',
    confirmPassword: ''
  });

  const [success, setSuccess] = useState(false); // for success message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(false); // hide success message on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Simulate form submission (e.g., send data to API)
    console.log('Form submitted:', formData);

    // Show success message
    setSuccess(true);

    // Reset form
    setFormData({
      name: '',
      email: '',
      userType: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        {/* Left Section */}
        <div className="register-left">
         
          <img src="https://images.pexels.com/photos/1485548/pexels-photo-1485548.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Illustration" />
        </div>

        {/* Right Section (Form) */}
        <div className="register-right">
          <h3>Create an Account</h3>

          {success && (
            <div className="success-message">🎉 Account created successfully!</div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            <label>
              Name <span>*</span>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email <span>*</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              User Type <span>*</span>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="">Select type</option>
                <option value="customer">User</option>
                <option value="vendor">Admin</option>
              </select>
            </label>

            <label>
              Password <span>*</span>
              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Confirm Password <span>*</span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" className="register-btn">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
