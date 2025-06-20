import React, { useState } from "react";
import axiosClient from "../../api/axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const response = await axiosClient.post("/api/password/email", { email });

      if (response.data.success) {
        setSuccessMsg(response.data.message);
        alert(`Reset link has been sent to ${email}`);
        // navigate('/verify-otp'); // Optional redirection
      } else {
        setError(response.data.message || "Something went wrong.");
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to send reset link.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/signin"); // change this to your sign-in route
  };

  return (
    <section className="sign_up">
      <div className="container">
        <div
          className="row align-items-center"
          style={{ marginTop: "10%", marginBottom: "10%" }}
        >
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <img
              src="/images/women-wearing-thai-costumes-that-are-symbolic-pointing-fingers.jpg"
              alt="left-image"
              className="img-fluid"
            />
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div id="CustomerRegisterForm" className="form-vertical px-5">
              <div className="section-heading text-center">
                <h1 className="section-header-sm text-uppercase">
                  Reset Password
                </h1>
                <p>Enter your email to receive a one-time password (OTP).</p>
              </div>

              {error && (
                <div className="text-danger mb-2 text-center fw-semibold">
                  {error}
                </div>
              )}
              {successMsg && (
                <div className="text-success mb-2 text-center fw-semibold">
                  {successMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} id="ResetPasswordForm">
                <div className="input__group my-3">
                  <input
                    type="email"
                    className="w-100 px-3 py-2"
                    name="email"
                    id="ResetPasswordForm-email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="submit-btn w-100 text-uppercase text-white border-button border my-2 p-2 rounded-0 fw-bold border-dark"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  style={{ background: "#dc3545" }}
                  disabled={loading}
                  className="submit-btn w-100 text-uppercase text-white border-button border my-2 p-2 rounded-0 fw-bold border-dark"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
