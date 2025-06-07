import React from 'react'

export default function Help() {
  return (
    <section className="home-help-section mb-5">
    <div className="container position-relative">
      <div className="page-width-sm p-5">
        <div className="help-content">
          <h2 className="section-header">We're here to help.</h2>
          <p className="section-description">
            Our expert gemologists are here to help. <br />
            We’re available seven days a week to guide you on
            <br /> diamonds, gemstones, and jewelry.
          </p>
        </div>
        <div className="help-grids">
          <div className="help-grid absolute-link-wrapper">
            <a href="#" className="button-chat fa-regular fa-comment"></a>
            <p className="help-title">Chat</p>
          </div>
 <div className="help-grid absolute-link-wrapper">
 <a
  href="https://mail.google.com/mail/?view=cm&to=service@TheCaratecasa.com"
  target="_blank"
  rel="noopener noreferrer"
  className="button-email"
  title="Send email via Gmail"
>
  <i className="fa-regular fa-envelope"></i>
</a>

  <p className="help-title">Email</p>
</div>


          <div className="help-grid absolute-link-wrapper">
            <a
              href="tel: +1 (816) 888-1111"
              className="button-call US-contact fa-regular fa-phone"
            ></a>
            <p className="help-title">Call</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

