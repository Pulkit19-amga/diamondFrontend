import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../cart/CartContext"; 
import { useState } from "react";

const Header = () => {
const { cartItems } = useCart();
 const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/signin'); 
  };




  return (
    <header className="header-wrapper">
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
        <div className="d-flex align-items-center  justify-content-between">
          <div className="left-side-logo-wrapper">
            <div className="d-flex align-items-center ">
              <button
                type="button"
                className="border-0 bg-transparent text-white p-1 border-bottom d-flex gap-2 align-items-center "
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <img src="./svg/book-appoinment.svg" height={20} width={20} />
                Book an Appointment
              </button>
            </div>
          </div>
          <div className="logo-wrapper">
            <a className="navbar-brand text-white" href="/">
              <img src="./images/logo.png" className="img-fluid" alt="" />
            </a>
          </div>
          <div className="right-side-logo-wrapper">
            <div className="d-flex align-items-center gap-3">
            <div className="icon phn-icon">
            <div className="icon phn-icon" style={{ pointerEvents: 'none' }}>
            <div className="icon phn-icon">
  <a
    href="tel:+18168881111"
    className="text-decoration-none text-white d-flex align-items-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon-phone"
      viewBox="0 0 23 23"
    >
      <g transform="translate(-19 -41)">
        <rect
          fill="#fff"
          opacity="0"
          transform="translate(19 41)"
        />
        {/* You can add the full phone icon path here if needed */}
      </g>
    </svg>
    <span className="small--hide text-white"> +1 (816) 888-1111</span>
  </a>
</div>

</div>

</div>

              <div className="icon search-icon">
                <div className="search-box">
                  <i className="fa fa-search"></i>
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
          <path d="M14.17 14.9a7.45 7.45 0 1 0-7.5-7.45 7.46 7.46 0 0 0 7.5 7.45zm0-10.91a3.45 3.45 0 1 1-3.5 3.46A3.46 3.46 0 0 1 14.17 4zM14.17 16.47A14.18 14.18 0 0 0 0 30.68c0 1.41.66 4 5.11 5.66a27.17 27.17 0 0 0 9.06 1.34c6.54 0 14.17-1.84 14.17-7a14.18 14.18 0 0 0-14.17-14.21zm0 17.21c-6.3 0-10.17-1.77-10.17-3a10.17 10.17 0 1 1 20.33 0c.01 1.23-3.86 3-10.16 3z" />
        </svg>
        <span className="text-white">SIGN IN / UP</span>
      </button>
    </div>

              <div className="icon wishlist-icon">
                <a className="text-decoration-none text-white" href="#">
                  {/* <svg fill="none" stroke="#14344a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg> */}
                  <div
                    className="site-header__iwish-count critical-hidden"
                    style={{ display: "none" }}
                  >
                    <span className="iWishCount"></span>
                  </div>
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
              className="collapse navbar-collapse  justify-content-center"
              id="navbarTogglerDemo03"
            >
              <ul className="navbar-nav text-center gap-4 align-items-center">
                <li className="nav-item">
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn text-uppercase  dropdown-toggle text-white"
                      data-bs-toggle="dropdown"
                      onClick={() => navigate("/engagement")}
                    >
                      ENGAGEMENT
                    </button>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn text-uppercase  dropdown-toggle text-white"
                      data-bs-toggle="dropdown"
                      onClick={() => navigate("/wedding-brands")}
                    >
                      WEDDING
                    </button>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn text-uppercase  dropdown-toggle text-white"
                      data-bs-toggle="dropdown"
                      onClick={() => navigate("/diamond")}
                    >
                      Diamonds
                    </button>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn text-uppercase  dropdown-toggle text-white"
                      data-bs-toggle="dropdown"
                    >
                      HIGh jewelry
                    </button>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn text-uppercase  dropdown-toggle text-white"
                      data-bs-toggle="dropdown"
                    >
                      jewelry
                    </button>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn text-uppercase  dropdown-toggle text-white"
                      data-bs-toggle="dropdown"
                    >
                      collections
                    </button>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn text-uppercase  dropdown-toggle text-white"
                      data-bs-toggle="dropdown"
                    >
                      gifts
                    </button>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn text-uppercase  dropdown-toggle text-white"
                      data-bs-toggle="dropdown"
                    >
                      sale
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
