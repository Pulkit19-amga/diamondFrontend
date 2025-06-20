import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./index.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"; // <-- Imported from react-icons

const Signin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate(redirectPath);
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
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
              alt="left"
              className="img-fluid"
            />
          </div>

          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div id="CustomerRegisterForm" className="form-vertical px-5">
              <div className="section-heading text-center">
                <h1 className="section-header-sm text-uppercase">Sign In</h1>
                <p>
                  Become a Radiance Rewards member to <br />
                  start earning points and unlock exclusive benefits.
                </p>
              </div>

              <div className="sl-vertical social-wrap oxi_icon_right">
                <a className="social_login google w-100 bg-danger d-block p-2 px-3 text-capitalize text-decoration-none text-white my-2">
                  <span>Sign in with Google</span>
                  <i className="bi bi-google"></i>
                </a>
              </div>
              <div className="sl-vertical social-wrap oxi_icon_right">
                <a className="social_login apple w-100 bg-dark d-block p-2 px-3 text-capitalize text-decoration-none text-white my-2">
                  <span>Sign in with Apple</span>
                  <i className="bi bi-apple"></i>
                </a>
              </div>

              <form onSubmit={handleSubmit} id="RegisterForm">
                <div className="input__group my-3">
                  <input
                    type="email"
                    className="w-100 px-3 py-2"
                    name="email"
                    id="RegisterForm-email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="input__group my-3 position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-100 px-3 py-2"
                    name="password"
                    id="RegisterForm-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="position-absolute"
                    style={{
                      top: "50%",
                      right: "15px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#999",
                      fontSize: "20px",
                    }}
                  >
                    {showPassword ? <BsEyeFill className="signin-eye-icon" />
 : <BsEyeFill className="signin-eye-icon" />}
                  </span>
                </div>

                <div className="form__actions d-flex justify-content-between login-account mb-2">
                  <Link
                    to="/resetpassword"
                    className="text-decoration-none text-primary fw-bold"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <div className="form__submission">
                  <button
                    type="submit"
                    className="submit-btn w-100 text-uppercase text-white border-button border my-2 p-2 rounded-0 fw-bold border-dark"
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </div>

                {error && (
                  <div
                    style={{
                      color: "red",
                      marginTop: "10px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {error}
                  </div>
                )}
              </form>

              <div className="form__actions d-flex justify-content-between login-account">
                <span>Create New Account?</span>
                <Link className="link align-items_center" to="/signup">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
