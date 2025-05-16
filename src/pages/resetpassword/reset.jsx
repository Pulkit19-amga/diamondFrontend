import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate sending OTP to email
    console.log('OTP sent to:', email);

    alert(`An OTP has been sent to ${email}`);

    // Optionally redirect to OTP verification page here
    // navigate('/verify-otp');
  };

  const handleCancel = () => {
    navigate('/signin'); // change this to your sign-in route
  };

  return (
    <section className="sign_up">
      <div className="container">
        <div className="row align-items-center" style={{ marginTop: "10%", marginBottom: "10%" }}>
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
                <h1 className="section-header-sm text-uppercase">Reset Password</h1>
                <p>Enter your email to receive a one-time password (OTP).</p>
              </div>

              <form onSubmit={handleSubmit} id="ResetPasswordForm">
                <div className="input__group my-3">
                  <input
                    type="email"
                    className="w-100 px-3 py-2 text-capitalize"
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
                    className="submit-btn w-100 text-uppercase text-white border-button border my-2 p-2 rounded-0 fw-bold border-dark"
                  >
                    Submit
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    style={{background:'#dc3545'}}
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
