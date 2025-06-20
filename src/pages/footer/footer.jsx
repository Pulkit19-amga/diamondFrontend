import React  from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-dark">
      <div className="container-fluid p-5">
        <div className="row">
          <div className="col-12 col-md-2">
            <nav className="site-footer__item-inner site-footer__item-inner--link_list" aria-label="Footer Navigation">
              <p className="footer-nav__title acc-title text-white">Company</p>
              <ul className="site-footer__linklist acc-content p-0 list-unstyled">
                <li className="site-footer__linklist-item">
                <Link to="/about" className="text-white">
  About
</Link>
                </li>
                <li className="site-footer__linklist-item">
                  <Link to="/contact" className="text-white">Contact us</Link>
                </li>
                <li className="site-footer__linklist-item">
                  <a href="#" className="text-white">Press</a>
                </li>
                <li className="site-footer__linklist-item">
                  <a href="#" className="text-white">Reviews</a>
                </li>
                <li className="site-footer__linklist-item">
                  <a href="#" className="text-white">Radiance Rewards</a>
                </li>
                <li className="site-footer__linklist-item">
                  <a href="#" className="text-white">Home Preview FAQs</a>
                </li>
                <li className="site-footer__linklist-item">
                  <a href="#" className="text-white">Monthly Payment Option</a>
                </li>
                <li className="site-footer__linklist-item">
                  <a href="#" className="text-white">Affiliate Program</a>
                </li>
                <li className="site-footer__linklist-item">
                <Link to="/terms" className="text-white">Terms of Use</Link>
                </li>
                <li className="site-footer__linklist-item">
                <Link to="/policy" className="text-white">Privacy Policy</Link>
                </li>
                <li className="site-footer__linklist-item">
                  <a href="#" className="text-white">Site Map</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-2">
  <div className="site-footer__item-inner site-footer__item-inner--link_list">
    <p className="footer-nav__title acc-title text-white">Education</p>
    <ul className="site-footer__linklist p-0 acc-content">
      <li id="footer-link_diamonds" className="site-footer__linklist-item">
        <a href="/diamond">Diamonds</a>
      </li>
      <li id="footer-link_engagement" className="site-footer__linklist-item">
        <a href="/engagement">Engagement</a>
      </li>
      <li id="footer-link_wedding-bands" className="site-footer__linklist-item">
        <a href="/wedding-brands">Wedding bands</a>
      </li>
      <li id="footer-link_gemstones" className="site-footer__linklist-item">
        <a href="#">Gemstones</a>
      </li>
      <li id="footer-link_jewelry" className="site-footer__linklist-item">
        <a href="#">Jewelry</a>
      </li>
      <li id="footer-link_conflict-diamond-policy" className="site-footer__linklist-item">
        <a href="#">Conflict diamond policy</a>
      </li>
      <li id="footer-link_lab-grown-diamonds" className="site-footer__linklist-item">
        <a href="#">Lab grown diamonds</a>
      </li>
      <li id="footer-link_metals" className="site-footer__linklist-item">
        <a href="#">Metals</a>
      </li>
      <li id="footer-link_blog" className="site-footer__linklist-item">
        <a href="#">Blog</a>
      </li>
    </ul>
  </div>
</div>

          <div className="col-2">
  <div className="site-footer__item-inner site-footer__item-inner--link_list">
    <p className="footer-nav__title acc-title text-white">Shop</p>
   
    <ul className="site-footer__linklist acc-content p-0">
  {[
    { label: "Diamonds", link: "/diamond" },
    { label: "Engagement rings", link: "/engagement-ring-style" },
    { label: "Bands for him", link: "#" },
    { label: "Bands for her", link: "#" },
    { label: "Home preview", link: "/home" },
    { label: "Gemstone rings", link: "#" },
    { label: "Preset rings", link: "#" },
    { label: "Custom rings", link: "#" },
    { label: "Fine jewelry", link: "#" },
  ].map((item, i) => (
    <li key={i} className="site-footer__linklist-item">
      <Link to={item.link} className="text-white">{item.label}</Link>
    </li>
  ))}
</ul>


  </div>
</div>

<div className="col-2">
  <div className="site-footer__item-inner site-footer__item-inner--link_list">
    <p className="footer-nav__title acc-title text-white">Customer care</p>
    <ul className="site-footer__linklist acc-content p-0">
      {[
        "Schedule an appointment",
        "Free shipping",
        "Free Returns",
        "Extended warranty",
        "Lifetime warranty",
        "Financing",
        "Insurance",
        "ID.me",
        "Accessibilty",
      ].map((item, i) => (
        <li key={i} className="site-footer__linklist-item">
          <a href="#" id={item === "Accessibilty" ? "click_userway" : undefined}>
            {item}
          </a>
        </li>
      ))}
    </ul>
  </div>
</div>

<div className="col-4">
  <div className="site-footer__item-inner site-footer__item-inner--newsletter ">
    <div className="site-footer__logo text-center">
      <a className="site-footer__logo-link" href="/">AOD</a>
    </div>
    <div className="newsletter-title">
      <h3 className="footer-newsletter__title text-white text-center">
        Elevate Your <i>Everyday</i>.
      </h3>
      <p className="text-white text-center">
        Sign up for <strong>$100 OFF</strong> your first purchase
      </p>
    </div>

    <div className="site-footer__newsletter">
      <form
        className="klaviyo-form"
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#000",
          padding: 0,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
          }}
        >
        <div style={{ display: "flex", alignItems: "stretch", maxWidth: "400px", border: "1px solid #ccc", borderRadius: "2px", overflow: "hidden" }}>
  <input
    type="email"
    name="email"
    placeholder="Enter your email"
    aria-label="Enter your email"
    required
    style={{
      flex: 1,
      padding: "0 0 0 14px",
      height: "36px",
      border: "none",
      fontSize: "15px",
      outline: "none"
    }}
  />
  <button
    type="submit"
    style={{
      background: "#14344A",
      color: "#fff",
      fontSize: "12px",
      fontWeight: "600",
      letterSpacing: "4px",
      height: "36px",
      padding: "0 15px",
      border: "none",
      cursor: "pointer",
      textTransform: "uppercase"
    }}
  >
    Submit
  </button>
</div>

        </div>
        <input type="submit" style={{ display: "none" }} aria-hidden="true" />
      </form>
    </div>

    <div className="social-icons_wrapper small--hide text-center">
  <ul className="gap-5 d-flex justify-content-center mt-5 p-0 list--inline site-footer__social-icons social-icons site-footer__icon-list justify-content_center">
    <li className="social-icons__item">
      <a
        className="social-icons__link"
        href="https://www.instagram.com/thecaratcasa/#"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa-brands fa-2x fa-instagram icon icon-instagram" style={{ fontSize: '30px' }}></i>
      </a>
    </li>
    <li className="social-icons__item">
     <a
  className="social-icons__link"
  href="/"
  onClick={(e) => e.preventDefault()}
  rel="noopener noreferrer"
>
  <i
    className="fa-brands fa-2x fa-tiktok icon icon-tiktok"
    style={{ fontSize: '30px' }}
  ></i>
</a>

    </li>
    <li className="social-icons__item">
      <a
        className="social-icons__link"
        href="https://www.facebook.com/share/194gTHJY21/?mibextid=wwXIfr"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa-brands  fa-facebook-f icon icon-facebook" style={{ fontSize: '30px' }}></i>
      </a>
    </li>
    <li className="social-icons__item">
     <a
  className="social-icons__link"
  href="/"
  onClick={(e) => e.preventDefault()}
  rel="noopener noreferrer"
>
  <i
    className="fa-brands fa-2x fa-twitter icon icon-twitter"
    style={{ fontSize: '30px' }}
  ></i>
</a>

    </li>
    <li className="social-icons__item">
     <a
  className="social-icons__link"
  href="/"
  onClick={(e) => e.preventDefault()}
  rel="noopener noreferrer"
>
  <i
    className="fa-brands fa-2x fa-youtube icon icon-youtube"
    style={{ fontSize: '30px' }}
  ></i>
</a>

    </li>
    <li className="social-icons__item">
      <a
  className="social-icons__link"
  href="/"
  onClick={(e) => e.preventDefault()}
  rel="noopener noreferrer"
>
  <i
    className="fa-brands fa-2x fa-pinterest-p icon icon-pinterest"
    style={{ fontSize: '30px' }}
  ></i>
</a>

    </li>
  </ul>
</div>

  </div>
</div>    
        </div>
      </div>
    </footer>
  );
};

export default Footer;
