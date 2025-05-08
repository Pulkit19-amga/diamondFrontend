// DiamondDetails.jsx
import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import DiamondViewer from '../diamondviewer/diamondViewer';

const steps = [
  { id: 1, label: "CHOOSE A DIAMOND" },
  { id: 2, label: "CHOOSE A SETTING" },
  { id: 3, label: "COMPLETE YOUR RING" },
];

export default function DiamondDetails() {
  const { state } = useLocation();
  const diamond = state?.diamond;
  const [currentStep, setCurrentStep] = useState(1);


  if (!diamond) {
    return <div style={{ padding: '40px' }}>No diamond data available.</div>;
  }

  return (
    <>
    
 <section class="hero_section_wrapper">
        <div class="container-fluid p-0 position-relative ">
          <img src="/images/Header_Banner.jpg" alt="" class="img-fluid w-100" />
        </div>
      </section>

      <div className="diamond-ring-wrapper">
        <h2 className="title">Create Your Diamond Ring</h2>
        <div className="step-container">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`step ${currentStep === step.id ? "active" : ""}`}
              onClick={() => handleStepClick(step.id)}
            >
              <span className="step-number">{step.id}</span>
              <span className="step-label">{step.label}</span>
              {index < steps.length - 1 && <span className="divider">|</span>}
            </div>
          ))}
        </div>

        {/* <div className="step-content">
          {currentStep === 1 && <p>🔹 Showing diamond options...</p>}
          {currentStep === 2 && <p>🔸 Showing setting options...</p>}
          {currentStep === 3 && <p>💍 Complete your ring!</p>}
        </div> */}
      </div>


      <DiamondViewer /> 

      <div className="grid__item product-single__information medium-up--one-third product-single__description-container"> 
        <div style={{ marginLeft: "40px" }} className="product-single__meta">
          <div style={{ padding: '20px', marginLeft: '40px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {diamond.carat_weight} Carat {diamond.shape.name} Natural Diamond
            </h1>
            <p><strong>Certificate Number#:</strong> {diamond.certificate_number}</p>
            <p>${diamond.price}</p>
            <p>(Diamond Only)</p>
            <p><strong>BANK WIRE PRICE</strong> ${(diamond.price - 5).toFixed(2)}</p>
            <p>Starting at $23/mo or 0% APR with Affirm. <a href="#">See if you qualify</a></p>
            <p>Free Insured Shipping. <a href="#">30 Day Returns</a></p>

            <div style={{ display: 'flex', justifyContent: 'start', marginTop: '20px', gap: '200px' }}>
              <div>
                <p>Shape: {diamond.shape.name}</p>
                <p>Carat: {diamond.carat_weight}</p>
                <p>Cut: {diamond.cut}</p>
                <a href="#" style={{ color: '#3c749b', textDecoration: 'underline' }}>MORE DETAILS</a>
              </div>
              <div>
                <p>Color: {diamond.color.name}</p>
                <p>Clarity: {diamond.clarity.name}</p>
                <p>Certificate: {diamond.certificate_company.dl_name}</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'start', marginTop: '20px', gap: "200px" }}>
              <div>
                <p>📦 30 - day Return Period</p>
              </div>
              <div>
                <p>🚚 Free Shipping</p>
                <a href="#" style={{ color: '#3c749b', textDecoration: 'underline' }}>Drop a hint</a>
              </div>
            </div>

            <div className="holiday-diamond-event flex align-items_center">
          <div className="image-wrapper">
            <img
              src="https://cdn.shopify.com/s/files/1/0757/8851/7659/files/March-promo_diamond-nacklace_studs.png?v=1741847877"
              className="d-block"
              alt="Our Gift to You"
            />
          </div>
          <div className="content">
            <p className="extra-para-bold"><b>ENDING SOON</b></p>
            <h3><span>Our Gift to You</span></h3>
            <p>Enjoy a Free Diamond Necklace with purchases of $1k+, or receive Free Diamond Studs with a spend of $2.5k+</p>
          </div>
        </div>

        <div className="holiday-diamond-event pdp-store-appointment-section flex">
          <div className="image-wrapper">
            <img
              src="https://cdn.shopify.com/s/files/1/0757/8851/7659/files/meet-us-in-soho-ny_2x_97b5a6f4-fcaa-4182-886f-764ed9d48693.png?v=1706868175"
              className="d-block"
              alt="Meet us in SoHo, NY"
            />
          </div>
          <div className="content">
            <h3>Meet us in SoHo, NY</h3>
            <p>Reserve your private in-person appointment at our SoHo Showroom.</p>
            <span className="store-appointmet-btn">BOOK IN-PERSON APPOINTMENT</span>
          </div>
        </div>

        <div style={{marginLeft:"40px" }} className="pdp-black-friday-sale flex hide">
  <div className="image-wrapper">
    <img
      src="https://cdn.shopify.com/s/files/1/0757/8851/7659/files/cyber_sale_pdp-banner.png?v=1733128296"
      className="d-block small--hide"
      alt="Black Friday Sale"
      data-uw-rm-alt-original="Black Friday Sale"
      data-uw-rm-alt="ALT"
    />
    <img
      src="https://cdn.shopify.com/s/files/1/0757/8851/7659/files/cyber_sale_pdp-banner-mobile.png?v=1733128296"
      className="d-block medium-up--hide"
      alt="Black Friday Sale"
      data-uw-rm-alt-original="Black Friday Sale"
      data-uw-rm-alt="ALT"
    />
  </div>
  <div className="content">
    <p className="extra-para-bold">
      <b>LAST DAY</b>
    </p>
    <h3>CYBER SALE</h3>
    <p>UP TO 30% OFF SITEWIDE</p>
  </div>
</div>

<form style={{marginLeft:"40px" }} 
  method="post"
  action="/cart/add"
  id="product_form_8281019023643"
  acceptCharset="UTF-8"
  encType="multipart/form-data"
  noValidate
  data-product-form=""
>
  <input type="hidden" name="form_type" value="product" />
  <input type="hidden" name="utf8" value="✓" />

  <div
    className="product-form__error-message-wrapper product-form__error-message-wrapper--hidden"
    data-error-message-wrapperrole="alert"
  >
    <span className="visually-hidden">Error</span>
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      className="icon icon-error"
      viewBox="0 0 14 14"
    >
      <g fill="none" fillRule="evenodd">
        <path d="M7 0a7 7 0 0 1 7 7 7 7 0 1 1-7-7z" />
        <path
          className="icon-error__symbol"
          d="M6.328 8.396l-.252-5.4h1.836l-.24 5.4H6.328zM6.04 10.16c0-.528.432-.972.96-.972s.972.444.972.972c0 .516-.444.96-.972.96a.97.97 0 0 1-.96-.96z"
        />
      </g>
    </svg>
    <span className="product-form__error-message" data-error-message="">
      Quantity must be 1 or more
    </span>
  </div>

  <div className="product-form__controls-group product-form__controls-group--submit">
    <p className="error-message"></p>
    <div className="product-form__item product-form__item--submit">
      <div className="product-form__add-to-setting">
        <div className="ship-timeline-n-tracking">
          <p className="product-form_ship-in-ring-timeline ship-msg">
            Ships in a ring by <b>Wed, Apr 16</b>
          </p>
          <p className="realtime-track">Track in real time before it ships</p>
        </div>

        <div className="sticky-button-price-wrapper">
          <div className="product-sticky-price engagement-ring medium-up--hide">
            <div className="product-single__price">
              <div className="prodcut__price">
                <div className="price__on-sale" data-uw-rm-sr="">
                ${diamond.price}
              
                </div>
                <div className="diamond__only">(Diamond Only)</div>
              </div>
              <div className="bank-wire-price" data-uw-rm-sr="">
              ${(diamond.price - 5).toFixed(2)}
              </div>
            </div>
          </div>

          <button type="button" name="add" className="btn">
            <span className="loading-spinner" data-loader=""></span>
            <span data-add-to-cart-text="">Add to Ring</span>
          </button>
        </div>
      </div>

      <div className="product-form__buy-loose">
        <p className="product-form_ship-loose-timeline ship-msg">
          Ships Loose By <b>Tues, Apr 15</b>
        </p>
        <input
          type="hidden"
          name="properties[_Ship by]"
          id="properties-ship-by"
          value="Wednesday, April 16"
        />
        <input
          type="hidden"
          name="properties[_Ship In]"
          id="properties-ship-in"
          value="8"
        />
        <button
          type="button"
          name="add"
          aria-label="Add to cart"
          className="btn btn--secondary-accent"
        >
          <span className="loading-spinner" data-loader=""></span>
          <span data-add-to-cart-text="">Buy Loose</span>
        </button>
      </div>
    </div>
  </div>

  <input type="hidden" name="product-id" value="8281019023643" />
  <input
    type="hidden"
    name="section-id"
    value="diamond-product-template"
  />
</form> 

<div className="product_description--accordion" style={{marginLeft:"40px" }} >
  <div className="accordion-header">
    <h4>DIAMOND DETAILS</h4>
    <span className="arrow">
      <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-chevron-down" viewBox="0 0 9 9">
        <path d="M8.542 2.558a.625.625 0 0 1 0 .884l-3.6 3.6a.626.626 0 0 1-.884 0l-3.6-3.6a.625.625 0 1 1 .884-.884L4.5 5.716l3.158-3.158a.625.625 0 0 1 .884 0z" fill="#fff"></path>
      </svg>
    </span>
  </div>

  <div className="accordion-content" style={{ display: 'none' }}>
    <div className="pair-first-diamond">
      <p className="hide">
        <span className="meta__title">Lab</span>
        <span className="meta-info-desc metal-variant-info">
          <a className="diamond-certificate-link" target="_blank" rel="noopener noreferrer" href="https://www.gia.edu/report-check?reportno=2497611917" aria-label="GIA - open in a new tab">
            <span className="lab-name">GIA</span>
          </a>
        </span>
      </p>

      <p className="hide">
        <span className="meta__title">Certificate Number</span>
        <span className="meta-info-desc metal-variant-info">
          <a className="diamond-certificate-link" target="_blank" rel="noopener noreferrer" href="https://www.gia.edu/report-check?reportno=2497611917" aria-label="2497611917 - open in a new tab">
            <span className="certificate-number">2497611917</span>
          </a>
        </span>
      </p>

      <p><span className="meta__title">SHAPE</span><span className="meta-info-desc shape-info">Round</span></p>
      <p><span className="meta__title">CARAT</span><span className="meta-info-desc carat-info">0.31</span></p>
      <p><span className="meta__title">Cut</span><span className="meta-info-desc cut-info">Excellent</span></p>
      <p><span className="meta__title">Color</span><span className="meta-info-desc color-info">K</span></p>

      <p className="color-intensity" style={{ display: 'none' }}>
        <span className="meta__title">Intensity</span>
        <span className="meta-info-desc intensity-info"></span>
      </p>

      <p><span className="meta__title">Clarity</span><span className="meta-info-desc clarity-info">VVS1</span></p>
      <p><span className="meta__title">Polish</span><span className="meta-info-desc polish-info">Excellent</span></p>
      <p><span className="meta__title">Symmetry</span><span className="meta-info-desc symmetry-info">Excellent</span></p>
      <p><span className="meta__title">Fluorescence</span><span className="meta-info-desc fluorescence-info">Medium</span></p>
      <p><span className="meta__title">TABLE</span><span className="meta-info-desc table-info">59.0%</span></p>
      <p><span className="meta__title">DEPTH</span><span className="meta-info-desc depth-info">61.1%</span></p>
      <p><span className="meta__title">MEASUREMENT</span><span className="meta-info-desc measurements-info">4.35x4.37x2.67</span></p>
      <p><span className="meta__title">L/W RATIO</span><span className="meta-info-desc l-w-ratio-info">1.00</span></p>
    </div>
  </div>


  <div className="accordion-header lifetime-diamond-upgrade active">
    <h4>LIFETIME DIAMOND UPGRADE</h4>
    <span className="arrow">
      <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-chevron-down" viewBox="0 0 9 9">
        <path d="M8.542 2.558a.625.625 0 0 1 0 .884l-3.6 3.6a.626.626 0 0 1-.884 0l-3.6-3.6a.625.625 0 1 1 .884-.884L4.5 5.716l3.158-3.158a.625.625 0 0 1 .884 0z" fill="#fff"></path>
      </svg>
    </span>
  </div>
  <div className="accordion-content" style={{ display: 'block' }}>
    <p>
      We offer a lifetime upgrade policy for all Natural GIA certified diamonds purchased from With Clarity, with proof of receipt. If you would like to upgrade your diamond, we’ll apply 100% of the credit toward the purchase of a new GIA certified diamond priced at least twice the original diamond purchase.
    </p>
  </div>
</div>

          </div>
        </div>
      </div>  


     


        
    </>
  );
}
