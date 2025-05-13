import React, { useState, useRef, useEffect } from 'react';
import './signin.css';
import { Link } from "react-router-dom";

const SignIn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
        <div className="dropdown-panel">
          <div className="dropdown-header">
            <span className="active-tab">Sign in</span>
           <Link to="/registration" className="inactive-tab">
  Create an Account
</Link>

          </div>
          <form className="login-form">
            <label>
              Username or email <span className="required">*</span>
              <input type="text" placeholder="Username" required />
            </label>

            <label>
              Password <span className="required">*</span>
              <input type="password" placeholder="Password" required />
            </label>

            <button type="submit" className="login-button">LOGIN</button>

            <div className="forgot-password">
              <a href="#">Lost your password?</a>
            </div>
          </form>
        </div>
      )}

export default SignIn;
