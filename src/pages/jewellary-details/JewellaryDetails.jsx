import React, { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useParams } from "react-router-dom";

import "./JewellaryDetails.css";

const metalOptions = [
  { id: "14K-white", label: "14K" },
  { id: "14K-yellow", label: "14K" },
  { id: "14K-rose", label: "14K" },
  { id: "PT", label: "PT" },
];


const JewelryDetailsPage = () => {
const { sku } = useParams();


  const [activeFeature, setActiveFeature] = useState(null);
const [selectedMetal, setSelectedMetal] = useState("14K-white");
const [selectedPlan, setSelectedPlan] = useState("1-year");
const [selectedWeight, setSelectedWeight] = useState("2");
const [selectedQuality, setSelectedQuality] = useState("F/G SI+");

  const toggleFeature = (index) => {
    setActiveFeature(activeFeature === index ? null : index);
  };

 const [mainImage, setMainImage] = useState("/images/product.webp");

  const thumbnails = [
    "/images/STUDS.webp",
    "/images/product.webp",
    "/images/STUDS.webp",
    "/images/product.webp",
    "/images/STUDS.webp",
  ];


  const protectionPlans = [
  { id: "1-year", label: "1 Year - $79" },
  { id: "2-year", label: "2 Year - $99" },
  {
    id: "3-year",
    label: (
      <>
        3 Year - $159 <br />
        <small className="text-muted">MOST POPULAR</small>
      </>
    ),
  },
];

  return (
    <div className="container py-5">
      <div className="row">
        {/* Left Images */}
       <div className="col-md-1 thumbs">
          {thumbnails.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Thumb ${i + 1}`}
              onClick={() => setMainImage(src)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>

        <div className="col-md-6 main-image">
          <div className="zoom-container">
            <Zoom>
              <img
                src={mainImage}
                alt="Main Product Image"
                className="img-fluid w-100 zoomable-image"
              />
            </Zoom>
          </div>
          <button className="btn btn-outline-dark mt-2">📷 VIRTUAL TRY ON</button>
        </div>

        {/* Right Details */}
        <div className="col-md-5">
          <h5 className="text-muted">
            Classic Round Diamond Four Prong Studs Earrings (F/G SI+)
          </h5>
          <p>
            <strong>$847</strong>{' '}
            <del className="text-muted">$1,210</del>{' '}
            <span className="text-success">($363 OFF)</span>
          </p>

          <p className="mb-1">METAL COLOR</p>
<div className="d-flex mb-3">
  {metalOptions.map((metal, i) => (
    <div
      key={i}
      className={`option-circle ${selectedMetal === metal.id ? "active" : ""}`}
      onClick={() => setSelectedMetal(metal.id)}
    >
      {metal.label}
    </div>
  ))}
</div>


          <p className="mb-1">
            DIAMOND TYPE : <strong>LAB</strong>
          </p>

          <p className="mb-1">TOTAL CARAT WEIGHT :</p>
          <div className="mb-3">
  {["1/2", "3/4", "1", "1 1/2", "2", "3", "4"].map((w, i) => (
    <span
      key={i}
      className={`option-btn ${selectedWeight === w ? "active" : ""}`}
      onClick={() => setSelectedWeight(w)}
    >
      {w}
    </span>
  ))}
</div>


          <p className="mb-1">DIAMOND QUALITY :</p>
         <div className="mb-3">
  {["EF VS+", "F/G SI+"].map((q, i) => (
    <span
      key={i}
      className={`option-btn ${selectedQuality === q ? "active" : ""}`}
      onClick={() => setSelectedQuality(q)}
    >
      {q}
    </span>
  ))}
</div>


          <hr />

          <div className="section-title">SHOP THE SET</div>
          <div className="d-flex align-items-center mb-3">
            <img
              src="assets/images/pside.png"
              width="250"
              alt="Set Image"
              className="me-3"
            />
            <div>
              <div>The Classic Set</div>
              <div className="text-muted">14KT White Gold</div>
              <strong>$1,000</strong>
              <br />
              <a href="#">SHOP NOW</a>
            </div>
          </div>

          <div className="section-title">
            ADD CLARITY COMMITMENT PROTECTION PLAN
          </div>
          <p className="protection-plan">
            Ensure your jewelry lasts a lifetime. <span title="More Info">ℹ️</span>
          </p>
          <div className="d-flex gap-2">
  {protectionPlans.map((plan) => (
    <div
      key={plan.id}
      className={`option-btn ${selectedPlan === plan.id ? "active" : ""}`}
      onClick={() => setSelectedPlan(plan.id)}
    >
      {plan.label}
    </div>
  ))}
</div>

          <div className="container py-4">
            {/* Add to Cart Section */}
            <div className="mb-4">
              <button className="btn btn-dark w-100">ADD TO CART</button>
              <button className="btn btn-outline-dark w-100 mt-2">
                VIRTUAL / SHOWROOM APPOINTMENT
              </button>
              <p className="mt-2 mb-0">
                Ships by <strong>Thurs, June 12</strong> | Track in real time before it ships
              </p>
              <p className="mb-1">
                <span className="text-primary">0% APR</span> or as low as $53/mo with{' '}
                <strong>affirm</strong>. <a href="#">See if you qualify</a>
              </p>
              <p className="mb-2">
                Free Insured Shipping. <a href="#">30 Day Returns.</a>
              </p>
              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-light">
                  <i className="bi bi-envelope"></i> DROP A HINT
                </button>
                <button className="btn btn-light">
                  <i className="bi bi-telephone"></i> CONTACT US
                </button>
                <button className="btn btn-light">
                  <i className="bi bi-heart"></i> ADD TO WISHLIST
                </button>
                <button className="btn btn-light">
                  <i className="bi bi-calendar-event"></i> SCHEDULE APPOINTMENT
                </button>
              </div>
              <div className="mt-2">
                <span className="me-2">SHARE</span>
                <i className="bi bi-pinterest"></i>
                <i className="bi bi-facebook"></i>
                <i className="bi bi-x"></i>
              </div>
              <div className="bg-light p-2 mt-3">
                <i className="bi bi-gift"></i> Earn 847 Points when you buy this item.
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="reviews">
          <h4>Customer Reviews</h4>
          <div className="mb-3">
            <h5 className="mb-0">
              4.9 <span className="rating-stars">★★★★★</span>
            </h5>
            <small>Based on 17 Reviews</small>
          </div>
          {[90, 8, 2, 0, 0].map((percent, i) => (
            <div className="d-flex align-items-center" key={i}>
              <span className="me-2">{5 - i} Star</span>
              <div className="progress flex-grow-1">
                <div className="progress-bar" style={{ width: `${percent}%` }}></div>
              </div>
            </div>
          ))}

          {["James R.", "Chloe T.", "Daniel S."].map((name, i) => (
            <div className="review-item" key={i}>
              <strong>{name}</strong>{' '}
              <span className="text-success">Verified Buyer</span>
              <br />★★★★★<br />
              {[
                "Love these earrings! The studs are absolutely stunning and catch the light perfectly.",
                "Great sparkle and fit. My second purchase from this site. Love it!",
                "Amazing quality and craftsmanship. Highly recommended."
              ][i]}
            </div>
          ))}
          <div className="text-center mt-3">
            <button className="btn btn-outline-dark">Load More Reviews</button>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section row align-items-center">
          <div className="col-md-6">
            {[
              {
                title: "Gemologist Consultation",
                content:
                  "Our dedicated gemologists offer comprehensive support throughout your diamond selection process..."
              },
              {
                title: "Conflict Free Diamonds",
                content:
                  "We are committed to sourcing diamonds from conflict-free regions..."
              },
              {
                title: "Home Preview",
                content:
                  "Try your favorite designs from the comfort of your home..."
              }
            ].map((feature, i) => (
              <div className="feature-item" key={i}>
                <h5 onClick={() => toggleFeature(i)}>
                  {feature.title} <i className="bi bi-chevron-down"></i>
                </h5>
                <div className={`feature-content ${activeFeature === i ? "active" : ""}`}>
                  <p>{feature.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-6">
            <div className="ratio ratio-4x3">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Feature Video"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="container py-4">
          {/* Related Products */}
          <div className="related-products">
            <h4>Related Products</h4>
            <div className="d-flex flex-wrap">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  src="assets/images/main.png"
                  className="product-thumb"
                  alt="Related Product"
                />
              ))}
            </div>
          </div>

          {/* Inspired By Your Browsing History */}
          <div className="custom-slider-section">
            <h4>Inspired By Your Browsing History</h4>
            <div className="d-flex flex-wrap">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  src="assets/images/main.png"
                  className="product-thumb"
                  alt="Browsing History Product"
                />
              ))}
            </div>
          </div>

          {/* Top Selling Products */}
          <div className="custom-slider-section">
            <h4>Top Selling Products</h4>
            <div className="d-flex flex-wrap">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  src="assets/images/main.png"
                  className="product-thumb"
                  alt="Top Selling Product"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JewelryDetailsPage;
