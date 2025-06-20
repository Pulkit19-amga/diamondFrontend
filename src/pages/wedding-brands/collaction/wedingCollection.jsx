import React, { useState } from "react";
import './index.css';

export default function WedingCollection() {

  const ringTypes = [
    "METAL BRANDS",
    "DIAMOND BRANDS",
    "ANNIVERSARY RINGS",
    "ETERNITY RINGS",
  ];

  const ringContent = {
    "METAL BRANDS": {
      heading: "METAL BRANDS",
      text: "Our women’s metal wedding bands and men’s wedding bands are the perfect choice for their timeless elegance and durability. Their sleek classic and modern designs in both gold and platinum symbolizes your enduring love and makes a lasting statement of your commitment to each other",
      image: "images/solitaire_540x.webp",
    },
    "DIAMOND BRANDS": {
      heading: "DIAMOND BRANDS",
      text: "Embark on an unforgettable journey of love with our exquisite collection of diamond wedding bands. Fall in love with our stunning women’s diamond wedding rings and sophisticated men’s diamond wedding rings in classic, vintage-inspired and modern styles, in both 14k and 18k gold and platinum. Find the perfect symbol of your one-of-a-kind love story.",
      image: "images/solitaire_540x.webp",
    },
    "ANNIVERSARY RINGS": {
      heading: "ANNIVERSARY RINGS",
      text: "Celebrate your cherished milestones with our collection of women’s anniversary rings, available in a wide range of styles, metals and diamond accents. Each anniversary band for her marks a journey of togetherness and sparkle to commemorate each special moment. Find the perfect symbol of your enduring love and relish in the joy of every anniversary.",
      image: "images/solitaire_540x.webp",
    },
    "ETERNITY RINGS": {
      heading: "ETERNITY RINGS",
      text: "Indulge in the timeless elegance of our women’s eternity rings, where the continuous circle of dazzling diamonds represents the ultimate symbol everlasting love. With an extensive selection of styles available in gold and platinum, our exquisite eternity bands for women are perfect to wear today and cherish forever. Wear them on their own for a classic statement or stack them together.",
      image: "images/solitaire_540x.webp",
    },
  };

  const [activeRing, setActiveRing] = useState("METAL BRANDS");

  const handleRingClick = (type) => {
    if (type !== activeRing) {
      setActiveRing(type);
    }
  };

  const { heading, text, image } = ringContent[activeRing];

  return (
    <section className="Ring-collection pb-5">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-4">
            <div className="section-heading text-center">
              <h2 className="section-header-sm section-header-reverse section-header-sb">
                WEDDING BAND COLLECTIONS
              </h2>
            </div>
          </div>

          <div className="col-12">
            <div className="main">
              {/* Filter Buttons */}
              <div className="d-flex justify-content-center flex-wrap mb-4">
                {ringTypes.map((type, index) => (
                  <React.Fragment key={type}>
                    <button
                      className={`btn border-0 fw-bold text-uppercase bg-transparent ${
                        activeRing === type ? "text-dark" : "text-muted"
                      }`}
                      onClick={() => handleRingClick(type)}
                    >
                      {type}
                    </button>
                    {index < ringTypes.length - 1 && (
                      <span className="text-muted mx-2">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Content Section */}
              <div className="slider slider-for px-5 mx-5">
                <div className="row align-items-center">
                  <div className="col-6">
                    <div className="medium-up--one-half block-content medium-up--text-left">
                      <h3 className="section-header-sm mb-5">{heading}</h3>
                      <p>{text}</p>
                      <a
                        title="SHOP ENGAGEMENT RINGS"
                        href="#"
                        className="btn border-button border my-2 p-2 rounded-0 border-dark mt-0"
                      >
                        SHOP NOW
                      </a>
                    </div>
                  </div>
                  <div className="col-6">
                    <img
                      src={image}
                      alt={`${heading} Ring`}
                      className="img-fluid hover-zoom"
                      style={{
                        transition: "transform 0.3s ease-in-out",
                        transform: "scale(1.05)",
                      }}
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
