import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./index.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Signin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
              alt="left-image"
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

              {/* Social Login */}
              <div className="sl-vertical social-wrap oxi_icon_right">
                <a
                  className="social_login google w-100 bg-danger d-block p-2 px-3 text-capitalize text-decoration-none text-white my-2"
                  href=""
                  aria-label="Google"
                >
                  <span>Sign in with Google</span>
                  <i className="bi bi-google"></i>
                </a>
              </div>
              <div className="sl-vertical social-wrap oxi_icon_right">
                <a
                  className="social_login apple w-100 bg-dark d-block p-2 px-3 text-capitalize text-decoration-none text-white my-2"
                  href="#"
                  aria-label="Apple"
                >
                  <span>Sign in with Apple</span>
                  <i className="bi bi-apple"></i>
                </a>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} id="RegisterForm">
                <div className="input__group my-3">
                  <input
                    type="email"
                    className="w-100 px-3 py-2 "
                    name="email"
                    id="RegisterForm-email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoCorrect="off"
                    autoCapitalize="off"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="input__group my-3">
                  <input
                    type="password"
                    className="w-100 px-3 py-2 "
                    name="password"
                    id="RegisterForm-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
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
                    role="alert"
                    aria-live="polite"
                  >
                    {error}
                  </div>
                )}

                {/* Hidden field (optional analytics id) */}
                <input
                  type="hidden"
                  name="login_with_shop[analytics_trace_id]"
                  value="321eb84b-851f-4cc4-9554-48c02852e1e7"
                />
              </form>

              {/* Link to Login */}
              <div className="form__actions d-flex justify-content-between login-account">
                <span>Create New Account?</span>
                <Link className="link align-items_center" to="/signup">
                  Sign up
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                  >
                    <g transform="translate(1967 20700.5)">
                      <g transform="translate(-1967 -20700.5)">
                        <path
                          d="M1518,753.5a.5.5,0,0,1,.5-.5h3.795l-1.15-1.146a.5.5,0,0,1,.71-.707l2,2a.5.5,0,0,1,0,.707l-2,2a.5.5,0,0,1-.71-.707l1.15-1.146H1518.5A.5.5,0,0,1,1518,753.5Z"
                          transform="translate(-1515 -747.5)"
                          fill="#181a1d"
                        />
                        <path
                          d="M1518,756a6,6,0,1,0-6-6A6,6,0,0,0,1518,756Zm0-1a5,5,0,1,0-5-5A5,5,0,0,0,1518,755Z"
                          transform="translate(-1512 -744)"
                          fill="#181a1d"
                          fillRule="evenodd"
                        />
                      </g>
                    </g>
                  </svg>
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
