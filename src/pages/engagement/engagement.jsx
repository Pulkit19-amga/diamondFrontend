import React, { useState,useEffect } from 'react';
import "./index.css"
import DesigningProcess from './designing-process/designingProcess.';
import Education from './education/education';
import Quetions from './quetions/quetions';
import Customize from './customize/customize';


    export default function Engagement() {

        const ringTypes = [
            "Solitaire",
            "Halo",
            "Vintage",
            "Side Stone",
            "Three Stone",
            "Pave",
            "Hidden Halo",
          ];
        
          const [activeRing, setActiveRing] = useState("Solitaire");
          // const [animateImage, setAnimateImage] = useState(false);
        
          const handleRingClick = (type) => {
            if (type !== activeRing) {
              setActiveRing(type);
              setAnimateImage(true);
            }
          };

  return (
<>
    <section className="hero_section_wrapper">
  <div className="container-fluid p-0 position-relative">
    <img
      src="images/engagement-rings-banner.webp"
      alt=""
      className="img-fluid w-100"
    />
    <div className="wrapper position-absolute text-center w-100 mb-5">
      <h2 className="fs-1 slide-title text-white">Engagement Rings</h2>
      <div className="content">
        <p className="text-white">
          Discover our treasure trove of unique engagement rings that will
          forever symbolize your love story.
        </p>
      </div>
      <div className="slide-btn-wrapper justify-content-center align-items-center gap-5">
        <a
          title="SHOP ENGAGEMENT RINGS"
          href="#"
          className="text-white btn border-button border my-2 p-2 rounded-0 fw-bold border-white"
        >
          SHOP ENGAGEMENT RINGS
        </a>
      </div>
    </div>
  </div>
</section>
  <section className="build_engagement_wrapper engagement-bulid-your-ring py-5">
    <div className="container">
      <div className="row">
        <div className="col-12 mb-4">
          <div className="section-heading text-center">
            <h2 className="section-header-sm section-header-reverse section-header-sb">
              2 EASY WAYS TO SHOP ENGAGEMENT RINGS
            </h2>
          </div>
        </div>
  
        <div className="col-12">
          <div className="row align-items-start">
            <div className="col-6 content">
              <h2 className="section-header mb-2">
                <span>1</span> Build Your Engagement Ring
              </h2>
              <ul className="mb-0">
                <li>
                  <span>1. CHOOSE A SETTING</span>
                  <p>Select your engagement ring metal and style.</p>
                </li>
                <li>
                  <span>2. CHOOSE A DIAMOND</span>
                  <p>
                    Select either a natural or lab certified diamond in your
                    preferred shape &amp; size.
                  </p>
                </li>
                <li>
                  <span>3. COMPLETE YOUR RING</span>
                  <p>Fill in your size and complimentary engraving.</p>
                </li>
              </ul>
              <a
                title="SHOP ENGAGEMENT RINGS"
                href="#"
                className="btn border-button border my-2 p-2 rounded-0 fw-bold border-dark ms-5 mt-0 mb-2"
              >
                Build Your Ring
              </a>
            </div>
            <div className="col-6">
              <img
                src="images/build-your-engagement-ring.webp"
                alt=""
                className="img-fluid w-100"
              />
            </div>
          </div>
        </div>
  
        <div className="col-12">
          <div className="row align-items-start">
            <div className="col-6">
              <img
                src="images/preset-engagement-ring.webp"
                alt=""
                className="img-fluid w-100"
              />
            </div>
            <div className="col-6">
              <div className="content">
                <h2 className="section-header">
                  <span>2</span> Preset Lab Grown Engagement Ring
                </h2>
                <ul>
                  <li>
                    <span>1. SELECT A RING</span>
                    <p>
                      Browse our curated collection of over 300 styles, selected
                      by our designers and ready to ship.
                    </p>
                  </li>
                  <li>
                    <span>2. CHOOSE A LAB DIAMOND</span>
                    <p>
                      Select your shape and size of the center stone, previously
                      paired by our in-house gemologists.
                    </p>
                  </li>
                  <li>
                    <span>3. COMPLETE YOUR RING</span>
                    <p>Fill in your ring size and get ready to be wowed.</p>
                  </li>
                </ul>
                <a
                  title="SHOP ENGAGEMENT RINGS"
                  href="#"
                  className="btn border-button border my-2 p-2 rounded-0 fw-bold border-dark ms-5 mt-0"
                >
                  EXPLORE LAB DIAMOND RINGS
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  {/* customize section  */}
  
  <Customize />


{/* desiging-process section  */}
<DesigningProcess />



<section className="Ring-collection pb-5">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-4">
            <div className="section-heading text-center">
              <h2 className="section-header-sm section-header-reverse section-header-sb">
                RING COLLECTIONS
              </h2>
            </div>
          </div>

          <div className="col-12">
            <div className="main">
              {/* Filter Buttons with Separators */}
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

              {/* Ring Content */}
              <div className="slider slider-for px-5 mx-5">
                {ringTypes.map((type, index) => (
                  <div key={index}>
                    {activeRing === type && (
                      <div className="row align-items-center">
                        <div className="col-6">
                          <div className="medium-up--one-half block-content medium-up--text-left">
                            <h3 className="section-header-sm mb-5">{type}</h3>
                            <p>
                              Discover the captivating allure of {type.toLowerCase()} engagement rings, the epitome
                              of classic beauty. These engagement rings for women feature a single diamond
                              that effortlessly sparkles on its own, drawing all eyes to its mesmerizing
                              brilliance. The simplicity of the {type.toLowerCase()} setting allows the diamond to
                              take center stage, showcasing its exquisite cut, clarity and carat weight.
                            </p>
                            <a
                              title="SHOP ENGAGEMENT RINGS"
                              href="#"
                              className="btn border-button border my-2 p-2 rounded-0 fw-bold border-dark mt-0"
                            >
                              EXPLORE LAB DIAMOND RINGS
                            </a>
                          </div>
                        </div>
                        <div className="col-6">
                          <img
                            src="images/solitaire_540x.webp"
                            alt={`${type} Ring`}
                            className="img-fluid hover-zoom"
                            style={{
                              transition: "transform 0.3s ease-in-out",
                              transform:
                                activeRing === type ? "scale(1.05)" : "scale(1)",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

<section className="home-preview">
  <div className="container pb-5">
    <div className="row engagement-bulid-your-ring align-items-center">
      <div className="col-8 p-0">
        <video
          width="100%"
          height="100%"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="vedio/home-preview.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="col-4 ps-5">
        <div className="grid__content medium-up--one-half small--text-center">
          <p className="section-sub-title m-0">TRY BEFORE YOU BUY</p>
          <h2 className="section-header-lg fst-italic">Home Preview</h2>
          <div className="content">
            <p>Seeking love at first sight? Try two rings at home &amp; find the right one for you.</p>
            <ul className="features p-0">
              <li>3D PRINTED</li>
              <li>FINELY CRAFTED</li>
              <li>CUSTOM REPLICA</li>
              <li>COMPLIMENTARY CONSULTATION</li>
            </ul>
          </div>
          <a
            title="SHOP ENGAGEMENT RINGS"
            href="#"
            className="btn border-button border my-2 p-2 rounded-0 fw-bold border-dark mt-0"
            tabIndex="0"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Education section */}
<Education />

{/* Quetions section */}

<Quetions />



  </>
  )
}


