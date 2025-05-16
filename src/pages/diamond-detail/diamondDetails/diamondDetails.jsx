import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './DiamondDetails.css';
import { useCart } from "../../../cart/CartContext";
import NoDealbreakers from "./nobrokrage/NoDealbreakers";

const steps = [
  { id: 1, label: "CHOOSE A DIAMOND" },
  { id: 2, label: "CHOOSE A SETTING" },
  { id: 3, label: "COMPLETE YOUR RING" },
];

export default function DiamondDetails() {
  const [selectedView, setSelectedView] = useState('image');
  const { state } = useLocation();
  const diamond = state?.diamond;
  const [currentStep, setCurrentStep] = useState(1);
  const { addToCart } = useCart();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleStepClick = (stepId) => {
    setCurrentStep(stepId);
  };

  const handleAddToCart = () => {
    try {
      const cartKey = 'cart';
      const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];

      const isDuplicate = existingCart.some(item => item.certificate_number === diamond.certificate_number);
      if (isDuplicate) {
        alert("This diamond is already in your cart.");
        return;
      }

      const updatedCart = [...existingCart, diamond];
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
      addToCart(diamond); // ✅ sync with context

      alert("Diamond added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!diamond) {
    return <div style={{ padding: '40px' }}>No diamond data available.</div>;
  }

  



  return (
    <>
      <section className="hero_section_wrapper">
        <div className="container-fluid p-0 position-relative">
          <img src="/images/Header_Banner.jpg" alt="" className="img-fluid w-100" />
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
      </div>


 <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'end' }}>
  {/* Section 1: Diamond Viewer */}
  <div className="diamond-viewer">
    <div className="diamond-main-display">
      {selectedView === 'image' && (
        <img
          src="https://dnadiamond.net/diaImages/Images/896797.jpg"
          alt="Diamond"
          className="diamond-main-img"
        />
      )}
      {selectedView === 'video' && (
        <iframe
          title="Diamond Video"
          className="diamond-main-img"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          allowFullScreen
        ></iframe>
      )}
      {selectedView === 'hand' && (
        <img
          src="https://cdn.shopify.com/s/files/1/0411/6437/4183/files/loose-diamond-hand-large.jpg?v=1681822779"
          alt="On Hand"
          className="diamond-main-img"
        />
      )}
      {selectedView === 'certificate' && (
        <img
          src="https://cdn.shopify.com/s/files/1/0757/8851/7659/files/gia_cert.png?v=123456789"
          alt="Certificate"
          className="diamond-main-img"
        />
      )}
    </div>

    <div className="diamond-thumbnails">
      <button onClick={() => setSelectedView('image')}>
        <img
          src="https://dnadiamond.net/diaImages/Images/896797.jpg"
          alt="Thumbnail"
          className={`thumb-img ${selectedView === 'image' ? 'active' : ''}`}
        />
      </button>
      <button onClick={() => setSelectedView('video')}>
        <img
          src="https://cdn.shopify.com/s/files/1/0411/6437/4183/files/video_play.png?v=1680007360"
          alt="Video Icon"
          className={`thumb-img ${selectedView === 'video' ? 'active' : ''}`}
        />
      </button>
      <button onClick={() => setSelectedView('hand')}>
        <img
          src="https://cdn.shopify.com/s/files/1/0411/6437/4183/files/loose-diamond-hand-large.jpg?v=1681822779"
          alt="Hand View"
          className={`thumb-img ${selectedView === 'hand' ? 'active' : ''}`}
        />
      </button>
      <button onClick={() => setSelectedView('certificate')}>
        <img
          src="https://cdn.shopify.com/s/files/1/0757/8851/7659/files/GIA_Icon_60d07140-6c0d-4f9d-8321-89b0bd69240a.png?v=1684576576"
          alt="GIA"
          className={`thumb-img ${selectedView === 'certificate' ? 'active' : ''}`}
        />
      </button>
    </div>
  </div>

  {/* Section 2: Diamond Details */}
  <div style={{ maxWidth: '600px' }}>
    <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
      {diamond.carat_weight} Carat {diamond.shape.name} Natural Diamond
    </h1>
    <p><strong>Certificate Number#:</strong> {diamond.certificate_number}</p>
    <p>${diamond.price} (Diamond Only)</p>
    <p><strong>BANK WIRE PRICE</strong> ${(diamond.price - 5).toFixed(2)}</p>
    <p style={{fontSize:'13px'}}>Starting at $23/mo or 0% APR with Affirm. <a href="#">See if you qualify</a> <br></br> Free Insured Shipping. <a href="#">30 Day Returns</a></p>
 

    <div style={{ display: 'flex', justifyContent: 'start', marginTop: '20px', gap: '40px' }}>
      <div>
        <p>Shape: {diamond.shape.name}</p>
        <p>Carat: {diamond.carat_weight}</p>
        <p>Cut: {diamond.cut.full_name}</p>
        <a href="#" style={{ color: '#3c749b', textDecoration: 'underline', }}>MORE DETAILS</a>
      </div>
      <div>
        <p>Color: {diamond.color.name}</p>
        <p>Clarity: {diamond.clarity.name}</p>
        <p>Certificate: {diamond.certificate_company.dl_name}</p>
      </div>
    </div>

      <div className="image-wrapper" >
                <img
                style={{width:'400px', marginTop: '20px'}}
                  src="https://cdn.shopify.com/s/files/1/0757/8851/7659/files/pdp-mothers-day-promo_desk_2x_65febe4d-0ce4-4b97-935c-96cf148fd87b.png?v=1744204757"
                  className="d-block"
                  alt="Our Gift to You"
                />
              </div>

             <div className='delivery'>
  <span>
    Ships in a ring by <strong style={{ fontWeight: 600 }}>Tues, May 27</strong>
  </span>
  <span style={{
    margin: '0 10px',
    color: '#ccc'
  }}>|</span>
  <span>Track in real time before it ships</span>
</div>
 

  <button className="add-to-cart-btn" onClick={handleAddToCart}>
  Add to Cart
</button>


    <div style={{ borderTop: "1px solid #dcdcdc" }}>
      {/* Section: Diamond Details */}
      <div className='sectionStyle'  onClick={() => toggleSection("details")}>
        DIAMOND DETAILS
        <span>{openSection === "details" ? "▲" : "▼"}</span>
      </div>
      {openSection === "details" && (
        <div className='contentStyle'>
          {[
            ["CARAT", diamond.carat_weight],
            ["SHAPE", diamond.shape.name],
            ["CUT", diamond.cut.full_name],
            ["COLOR", diamond.color.name],
            ["CLARITY", diamond.clarity.name],
            ["POLISH", diamond.polish?.name || "-"],
            ["SYMMETRY", diamond.symmetry?.name || "-"],
            ["FLUORESCENCE", diamond.fluorescence?.name || "-"],
            ["TABLE", diamond.table_diamond || "-"],
            ["DEPTH", diamond.depth || "-"],
            ["MEASUREMENT", diamond.measurements || "-"],
          ].map(([label, value], index) => (
            <div key={index} className='labelValueRow' >
              <span className='labelStyle'>{label}</span>
              <span className='valueStyle'>{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Section: Lifetime Upgrade */}
      <div className='sectionStyle'  onClick={() => toggleSection("upgrade")}>
        LIFETIME DIAMOND UPGRADE
        <span>{openSection === "upgrade" ? "▲" : "▼"}</span>
      </div>
      {openSection === "upgrade" && (
        <div className='contentStyle' >
          We offer a lifetime upgrade policy for all Natural GIA certified
          diamonds purchased from With Clarity, with proof of receipt. If you
          would like to upgrade your diamond, we’ll apply 100% of the credit
          toward the purchase of a new GIA certified diamond priced at least
          twice the original diamond purchase.
        </div>
      )}
    </div>
  </div>
</div>


<NoDealbreakers />




    </>
  );
}
