import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import './ResetPasswordForm.css';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromUrl = queryParams.get("email");
    if (emailFromUrl) setEmail(emailFromUrl);
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    try {
      const response = await axiosClient.post("/password/reset", {
        token,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      if (response.data.message) {
        setSuccessMsg(response.data.message);
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        setError("Something went wrong.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="reset-password-container">
      <h2 className="reset-password-title">Reset Password</h2>

      {error && <p className="reset-password-error">{error}</p>}
      {successMsg && (
        <p className="reset-password-success">
          {successMsg} Redirecting to sign-in page...
        </p>
      )}

      <form onSubmit={handleSubmit} className="reset-password-form">
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="reset-password-input"
        />

       <div className="reset-password-input-wrapper">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="New Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="reset-password-input"
  />
  <span
    className="password-toggle-icon"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <BsEyeSlash className="reset-eye-icon"  /> : <BsEye className="reset-eye-icon"  />}
  </span>
</div>

<div className="reset-password-input-wrapper">
  <input
    type={showConfirm ? "text" : "password"}
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
    className="reset-password-input"
  />
  <span
    className="password-toggle-icon"
    onClick={() => setShowConfirm(!showConfirm)}
  >
    {showConfirm ? <BsEyeSlash className="reset-eye-icon" /> : <BsEye className="reset-eye-icon" />}
  </span>
</div>


        <button type="submit" className="reset-password-button">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
