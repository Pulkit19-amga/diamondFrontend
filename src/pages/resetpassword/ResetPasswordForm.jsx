import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();
  const location = useLocation();

  // Extract email from query string
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
        // alert('Password reset successful! Please login.');

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
    <div className="container mt-5">
      <h2>Reset Password</h2>
      {error && <p className="text-danger">{error}</p>}
      {successMsg && (
        <p className="text-success">
          {successMsg} Redirecting to sign-in page...
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control my-2"
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-control my-2"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="form-control my-2"
        />
        <button type="submit" className="btn btn-primary w-100">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
