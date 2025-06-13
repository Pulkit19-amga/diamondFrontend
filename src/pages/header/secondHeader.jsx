import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../cart/CartContext";
import { useState } from "react";

const SecondHeader = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/signin");
    }
  };

  return (
    <>
      {/* Custom Styles */}
      <style>{`
        .icon svg, .icon i {
          color: black !important;
          fill: black !important;
        }

        .navbar-nav .nav-item .btn {
          transition: background-color 0.3s, color 0.3s;
        }

        .navbar-nav .nav-item .btn:hover {
          background-color: black !important;
          color: white !important;
        }

        .text-black-custom {
          color: black !important;
        }
      `}</style>

      <header className="header-wrapper bg-white text-black">
        <div className="header-top-wrapper">
          <div className="container">
            <p className="m-0 text-center p-2 ">
              <strong className="text-white">
                {" "}
                FREE INSURED SHIPPING & RETURNS | LIFETIME WARRANTY
              </strong>
            </p>
          </div>
        </div>

        <div className="container py-2">
          <div className="d-flex align-items-center justify-content-between">
            <div className="left-side-logo-wrapper">
              <div className="d-flex align-items-center">
                <button
                  type="button"
                  className="border-0 bg-transparent text-black p-1 border-bottom d-flex gap-2 align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <img
                    src="./svg/book-appoinment.svg"
                    height={20}
                    width={20}
                    style={{ filter: "invert(100%)" }} // black color
                  />
                  Book an Appointment
                </button>
              </div>
            </div>

            <div className="logo-wrapper">
              <a className="navbar-brand text-black" href="/">
                <img
                  src="./images/logo-23.png"
                  className="img-fluid"
                  alt="Logo"
                />
              </a>
            </div>

            <div className="right-side-logo-wrapper">
              <div className="d-flex align-items-center gap-3">
                <div className="icon phn-icon">
                <a
  href="tel:+18168881111"
  style={{
    color: "#000",
    fontSize: "18px",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
  }}
>
  <i
    className="fa-solid fa-phone"
    style={{ marginRight: "8px", color: "#fff" }}
  ></i>
  +1 (816) 888-1111
</a>
                </div>

                <div className="icon search-icon">
                  <div className="search-box">
                    <i className="fa fa-search text-black-custom"></i>
                  </div>
                </div>

                <div className="icon login-icon position-relative">
                  <button
                    className="text-decoration-none text-white bg-transparent border-0 d-flex align-items-center"
                    onClick={handleRedirect}
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      className="icon icon-login"
                      viewBox="0 0 28.33 37.68"
                    >
                      <path
                        d="M14.17 14.9a7.45 7.45 0 1 0-7.5-7.45 7.46 7.46 0 0 0 7.5 7.45zm0-10.91a3.45 3.45 0 1 1-3.5 3.46A3.46 3.46 0 0 1 14.17 4zM14.17 16.47A14.18 14.18 0 0 0 0 30.68c0 1.41.66 4 5.11 5.66a27.17 27.17 0 0 0 9.06 1.34c6.54 0 14.17-1.84 14.17-7a14.18 14.18 0 0 0-14.17-14.21zm0 17.21c-6.3 0-10.17-1.77-10.17-3a10.17 10.17 0 1 1 20.33 0c.01 1.23-3.86 3-10.16 3z"
                        style={{ fill: "black" }}
                      />
                    </svg>
                    <span style={{ color: "black" }}>
                      {user
                        ? `Hi, ${user.name || "User"}`
                        : "SIGN IN / UP"}
                    </span>
                  </button>
                </div>

                <div className="icon wishlist-icon">
                  <a
                    className="text-decoration-none text-black-custom"
                    href="#"
                  >
                    <i className="fa fa-heart"></i>
                  </a>
                </div>

                <div className="icon cart-icon position-relative">
                  <Link
                    to="/cart"
                    className="text-decoration-none text-black position-relative"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      className="icon icon-cart"
                      viewBox="0 0 37 40"
                    >
                      <path
                        d="M36.5 34.8L33.3 8h-5.9C26.7 3.9 23 .8 18.5.8S10.3 3.9 9.6 8H3.7L.5 34.8c-.2 1.5.4 2.4.9 3 .5.5 1.4 1.2 3.1 1.2h28c1.3 0 2.4-.4 3.1-1.3.7-.7 1-1.8.9-2.9zm-18-30c2.2 0 4.1 1.4 4.7 3.2h-9.5c.7-1.9 2.6-3.2 4.8-3.2zM4.5 35l2.8-23h2.2v3c0 1.1.9 2 2 2s2-.9 2-2v-3h10v3c0 1.1.9 2 2 2s2-.9 2-2v-3h2.2l2.8 23h-28z"
                        style={{ fill: "black" }}
                      ></path>
                    </svg>
                    {cartItems.length > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {cartItems.length}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <nav className="py-2 navbar navbar-expand-lg text-center">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarTogglerDemo03"
                aria-controls="navbarTogglerDemo03"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse justify-content-center"
                id="navbarTogglerDemo03"
              >
                <ul className="navbar-nav text-center gap-4 align-items-center">
                  {[
                    { label: "ENGAGEMENT", path: "/engagement" },
                    { label: "WEDDING", path: "/wedding-brands" },
                    { label: "Diamonds", path: "/diamond" },
                    { label: "HIGh jewelry" },
                    { label: "jewelry", path: "/jewelry-list" },
                    { label: "collections" },
                  ].map((item, index) => (
                    <li key={index} className="nav-item">
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn text-uppercase dropdown-toggle text-black"
                          data-bs-toggle="dropdown"
                          onClick={() => item.path && navigate(item.path)}
                        >
                          {item.label}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <div className="header-spacer" style={{ height: "172px" }}></div>
    </>
  );
};

export default SecondHeader;
