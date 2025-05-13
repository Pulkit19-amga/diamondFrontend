import React from 'react'

export default function Quetions() {
  return (
   
<section className="accordian_class">
      <div className="container">
        <div className="section-heading text-center">
          <h2 className="section-header-sm section-header-reverse section-header-sb mb-5">
            WE’VE GOT ANSWERS TO YOUR QUESTIONS
          </h2>
        </div>
        <div className="accordion mx-5 pb-5 px-5" id="accordionExample">
          {/* Accordion Item 1 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                How do I choose a unique diamond for an engagement ring?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p className="m-0">
                  To choose a unique diamond for an engagement ring, consider factors like shape, cut, color, clarity, carat weight, and certification. Look for a shape that reflects your style, an excellent cut for maximum sparkle, and a color and clarity grade that suits your preferences...
                </p>
              </div>
            </div>
          </div>

          {/* Accordion Item 2 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                What ring setting makes diamond look the biggest?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p className="m-0">
                  If you're looking to make your diamond appear larger, consider a halo setting, which surrounds the center diamond with smaller diamonds or gemstones...
                </p>
              </div>
            </div>
          </div>

          {/* Accordion Item 3 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Is $3000 cheap for an engagement ring?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p className="m-0">
                  Determining the affordability of an engagement ring is influenced by factors like personal preferences, budget, and individual financial circumstances...
                </p>
              </div>
            </div>
          </div>

          {/* Accordion Item 4 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                How do I determine right engagement ring size?
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p className="m-0">
                  To determine the right engagement ring size, consider the width of the ring and potential finger fluctuations due to factors like temperature and humidity...<br />
                  To measure ring size at home, you can try using a few methods. One option is to use a piece of string or a thin strip of paper...
                  <br />
                  Keep in mind that these at-home methods may not be as accurate as professional measurements...
                </p>
              </div>
            </div>
          </div>

          {/* Accordion Item 5 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                Can I design my own engagement ring?
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="headingFive"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p className="m-0">
                  Absolutely! You have the opportunity to design your own engagement ring. You can begin the process by selecting the setting that appeals to you...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

 
