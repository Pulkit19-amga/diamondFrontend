import React from 'react';
import TrendingNow from "./TrendingNow";
import BestsellingRings from "./BestsellingRings";
import ExclusiveOffers from "./ExclusiveOffers";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero_section_wrapper">
        <div className="container-fluid p-0 position-relative">
          <video width="100%" height="100%" autoPlay muted loop>
            <source src="/vedio/main-banner-vedio.mp4" type="video/mp4" />
          </video>
          <div className="wrapper position-absolute text-center w-100 mb-5">
            <h2 className="fs-1 slide-title text-white">The Perfect Beginning</h2>
            <div className="content">
              <p className="text-white">
                Enjoy a Free Diamond Necklace with purchases of $1k+, or receive Free Diamond Studs with a spend of $2.5k+
              </p>
            </div>
            <div className="slide-btn-wrapper justify-content-center align-items-center gap-5">
              <a
                href="#"
                className="text-white btn border-button border my-2 p-2 rounded-0 fw-bold border-white"
              >
                SHOP ENGAGEMENT RINGS
              </a>
              <a
                href="#"
                className="text-white btn border-button border my-2 p-2 rounded-0 fw-bold border-white"
              >
                SHOP JEWELRY
              </a>
            </div>
          </div>
        </div>
      </section>

    {/* Trending Now Section */}
<TrendingNow />

<section className="build_engagement_wrapper my-5">
  <div className="container">
    <div className="row">
      <div className="col-6">
        <div className="row">
          <div className="col-12">
            <div className="content small--text-center text-start">
              <h2 className="section-header-lg section-header-md">
                Build Your <br /> Engagement Ring
              </h2>
              <p className="mb-4">
                Choose a setting, select a diamond, &amp; complete your ring.
              </p>
              <a
                href="#"
                className="btn border-button border my-4 p-2 rounded-0 fw-bold border-dark"
              >
                START DESIGNING
              </a>
            </div>
          </div>
          <div className="col-12">
            <img
              src="https://images.unsplash.com/photo-1716366192997-817bb5e88d52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGRpYW1vbmQlMjByaW5nfGVufDB8fDB8fHww"
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="row">
          <div className="col-12">
            <img
              src="https://img.freepik.com/free-photo/beautiful-engagement-ring-with-diamonds_23-2149509236.jpg?ga=GA1.1.1364773145.1746277227&semt=ais_hybrid&w=740"
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="col-12">
            <div className="content small--text-center text-end mt-5">
              <h2 className="section-header-lg section-header-md text-end">
                Preset <br /> Engagement Rings
              </h2>
              <p className="text-end ms-auto mb-4">
                Find your perfect match with our assortment of ready to purchase
                designs.
              </p>
              <a
                href="#"
                className="btn border-button border p-2 rounded-0 fw-bold border-dark text-end"
              >
                EXPLORE NOW
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



<section className="bond_wrapper_block my-5">
  <div className="container">
    <div className="vedio_block">
      <video
        width="100%"
        height="100%"
        playsInline
        preload="metadata"
        muted
        loop
        autoPlay
      >
        <source src="vedio/VEDIO_BLOCK.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="content text-center">
      <h2 className="section-header-lg section-header-md">The Bond</h2>
      <p>
        Inspired by our iconic emblem, each design is a masterwork of hundreds
        of micro-pavé diamonds; an ode to eternity and the power of an
        everlasting bond.
      </p>
      <div className="button-wrapper flex flex-wrap justify-content_center">
        <a
          href="#"
          className="btn border-button border p-2 rounded-0 fw-bold border-dark"
        >
          EXPLORE THE COLLECTION
        </a>
      </div>
    </div>
  </div>
</section>

{/* Best selling section  */}
<BestsellingRings />
<ExclusiveOffers />

<section className="Home_Preview_wrapper">
  <div className="container">
    <div className="row my-5 align-items-center">
      <div className="col-4">
        <div className="grid__content small--text-center">
          <span className="sub-title text-uppercase">TRY BEFORE YOU BUY</span>
          <h2 className="section-header-lg">Home Preview</h2>
          <p>
            Seeking love at first sight?<br />
            Try two rings at home &amp; find the right one for you.
          </p>
          <ul className="home-preview-features">
            <li>3D PRINTED</li>
            <li>FINELY CRAFTED</li>
            <li>CUSTOM REPLICA</li>
            <li>COMPLIMENTARY CONSULTATION</li>
          </ul>
          <a
            href="#"
            className="btn border-button border my-2 p-2 rounded-0 fw-bold border-dark"
          >
            LEARN MORE
          </a>
        </div>
      </div>
      <div className="col-8">
        <div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1559006864-38a01f201f95?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRpYW1vbmQlMjByaW5nfGVufDB8fDB8fHww"
              alt=""
              className="img-fluid p-2"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>




<section className="Home_Preview_wrapper">
  <div className="container">
    <div className="row my-5 align-items-end">
      <div className="col-8">
        <div>
          <div>
            <video
              width="100%"
              height="100%"
              playsInline
              preload="metadata"
              muted
              loop
              autoPlay
            >
              <source src="vedio/side.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="grid__content small--text-center">
          <span className="sub-title text-uppercase">TAILORED TO YOU</span>
          <h2 className="section-header-lg">Virtual or In-Person</h2>
          <p>
            Meet our jewelry specialists, virtually or in-person at our SoHo showroom, for expert
            guidance on finding your perfect engagement ring or gift.
          </p>
          <a
            href="#"
            className="btn border-button border my-2 p-2 rounded-0 fw-bold border-dark"
          >
            SCHEDULE YOUR APPOINTMENT
          </a>
        </div>
      </div>
    </div>
  </div>
</section>



<section className="bond_wrapper_block my-5">
  <div className="container">
    <div className="vedio_block">
      <video
        width="100%"
        height="100%"
        playsInline
        preload="metadata"
        muted
        loop
        autoPlay
      >
        <source src="vedio/VEDIO_BLOCK.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="content text-center mt-4">
      <span className="sub-title text-uppercase">DISCOVER THE WORLD OF</span>
      <h2 className="section-header-lg section-header-md">The Reserve</h2>
      <p className="mb-3">
        Uncover a sanctuary of one of a kind diamond artistry and immerse yourself in brilliance.
      </p>
      <div className="button-wrapper flex flex-wrap justify-content_center">
        <a
          href="#"
          className="btn border-button border mx-3 p-2 rounded-0 fw-bold border-dark"
        >
          DISCOVER THE RESERVE
        </a>
        <a
          href="#"
          className="btn border-button border mx-3 p-2 rounded-0 fw-bold border-dark"
        >
          EXPLORE LUXE
        </a>
      </div>
    </div>
  </div>
</section>



    </>
  );
}
