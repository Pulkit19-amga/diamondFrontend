import React from 'react'

export default function DiamondDetails() {
  return (
   <>
  <section class="hero_section_wrapper">
      <div class="container-fluid p-0 position-relative ">
         <img src="/images/Header_Banner.jpg" alt="" class="img-fluid w-100" />
        
      </div>
   </section>

   <section className="diamond-section py-5 pb-5">
      <div className="diamond-container">
        <div className="process-steps page-width">
          <div className="process-steps-wrapper">
            <p className="process-steps-heading">Create Your Diamond Ring</p>
            <div className="process-steps-container">
              <div className="start-over-button">
                <p id="start-over" className="text-uppercase">
                  Start Over
                </p>
              </div>
              <div className="steps-wrapper">
                {/* Step 1 */}
                <div className="step step-1" data-step="ring-setting">
                  <div className="step-container">
                    <div className="step-count">
                      <div className="count">2</div>
                      <div className="title-wrapper">
                        <p className="title">Choose a setting</p>
                      </div>
                    </div>
                    <div className="product-selection">
                      <div
                        className="current-ring-setting"
                        style={{ display: "none" }}
                      >
                        <div className="product-img">
                          <img
                            src="//cdn.shopify.com/s/files/1/0718/9833/3499/products/enrrb1501246-round-white-frontview_60x.jpg?v=1675848070"
                            alt="Ring Setting"
                          />
                        </div>
                        <div className="product-link">
                          <a
                            href="/collections/engagement-rings"
                            className="change"
                          >
                            Change
                          </a>
                          <span>|</span>
                          <a href="#" className="remove">
                            Remove
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="step step-2 active first-step" data-step="diamonds">
                  <div className="step-container">
                    <div className="step-count">
                      <div className="count">1</div>
                      <div className="title-wrapper">
                        <p className="title">Choose a diamond</p>
                      </div>
                    </div>
                    <div className="product-selection">
                      <div className="current-diamond-option">
                        <div className="product-img">
                          <img
                            src="//cdn.shopify.com/s/files/1/0718/9833/3499/products/enrrb1501246-round-white-frontview_60x.jpg?v=1675848070"
                            alt="Diamond Option"
                          />
                        </div>
                        <div className="product-link">
                          <a
                            href="/collections/engagement-rings"
                            className="change"
                          >
                            Change
                          </a>
                          <span>|</span>
                          <a href="#" className="remove">
                            Remove
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="step step-3" data-step="final-ring">
                  <div className="step-container">
                    <div className="step-count">
                      <div className="count">3</div>
                      <div className="title-wrapper">
                        <p className="title">Complete Your Ring</p>
                      </div>
                    </div>
                    <div className="product-selection">
                      <div className="current-ring-setting">
                        <div className="product-img">
                          <img
                            src="//cdn.shopify.com/s/files/1/0718/9833/3499/products/enrrb1501246-round-white-frontview_60x.jpg?v=1675848070"
                            alt="Final Ring"
                          />
                        </div>
                        <div className="product-link">
                          <a href="/collections/engagement-rings">
                            Complete Purchase
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* End of steps-wrapper */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
   </>
  )
}


