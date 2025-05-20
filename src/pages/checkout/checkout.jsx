
import React, {useState} from 'react'
import './checkout.css'

const Checkout = () => {

     const [selectedMethod, setSelectedMethod] = useState('pay-credit');

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.id);
  };

  const isVisible = (id) => selectedMethod === id ? '' : 'd-none';




  return (
    <>
   <section className="sign_up">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">

            {/* Redeem Section */}
            <div className="container my-5">
              <div className="redeem-card mb-4">
                <h6>Redeem your Points</h6>
                <p className="mb-2">
                  <a href="#">Log in</a> to view your points balance and discover rewards available for redemption.
                </p>
                <select className="form-select mb-2" disabled>
                  <option>Select a discount</option>
                </select>
                <button className="btn btn-disabled w-100" disabled>Redeem</button>
              </div>

              <div className="text-center mb-3">
                <small className="text-muted">Express checkout</small>
              </div>

              <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 mb-4">
                <button className="express-btn btn-shop">shop <strong>Pay</strong></button>
                <button className="express-btn btn-paypal">PayPal</button>
                <button className="express-btn btn-gpay">G Pay</button>
              </div>

              <div className="or-divider">
  <span>OR</span>
</div>

            </div>

            {/* Contact Section */}
            <div className="container my-5" style={{ maxWidth: "700px" }}>
              <div className="section-title d-flex justify-content-between align-items-center">
                <span>Contact</span>
                <a href="#" className="text-primary">Log in</a>
              </div>

              <div className="mb-3">
                <input type="email" className="form-control form-control-lg" placeholder="Email" />
              </div>

              <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" id="emailOffers" defaultChecked />
                <label className="form-check-label" htmlFor="emailOffers">
                  Email me with news and offers
                </label>
              </div>

              <div className="section-title">Delivery</div>

              <div className="mb-3">
                <select className="form-select form-select-lg">
                  <option>United States</option>
                </select>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-md">
                  <input type="text" className="form-control form-control-lg" placeholder="First name" />
                </div>
                <div className="col-md">
                  <input type="text" className="form-control form-control-lg" placeholder="Last name" />
                </div>
              </div>

              <div className="mb-3 position-relative">
                <input type="text" className="form-control form-control-lg" placeholder="Address" />
                <span className="input-icon"><i className="bi bi-search"></i></span>
              </div>

              <div className="mb-3">
                <input type="text" className="form-control form-control-lg" placeholder="Apartment, suite, etc. (optional)" />
              </div>

              <div className="row g-2 mb-3">
                <div className="col-md-4">
                  <input type="text" className="form-control form-control-lg" placeholder="City" />
                </div>
                <div className="col-md-4">
                  <select className="form-select form-select-lg">
                    <option>Alabama</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <input type="text" className="form-control form-control-lg" placeholder="ZIP code" />
                </div>
              </div>

              <div className="mb-3 position-relative">
                <input type="text" className="form-control form-control-lg" placeholder="Phone" />
                <span className="input-icon"><i className="bi bi-question-circle"></i></span>
              </div>

              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="smsOffers" />
                <label className="form-check-label" htmlFor="smsOffers">
                  Text me with news and offers
                </label>
              </div>
            </div>

            {/* Payment Section */}
          <div className="container my-5" style={{ maxWidth: '700px' }}>
      {/* Section Title */}
      <div className="section-title">Payment</div>
      <p className="text-muted mb-3">All transactions are secure and encrypted.</p>

      {/* Credit Card Option */}
      <div className="payment-option">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <input
              type="radio"
              name="payment-method"
              id="pay-credit"
              checked={selectedMethod === 'pay-credit'}
              onChange={handleMethodChange}
            />
            <strong> Credit card </strong>
          </div>
          <div className="card-icons">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/MasterCard_logo.png" alt="MasterCard" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg" alt="Amex" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Discover_Card_logo.svg" alt="Discover" />
            <span className="badge bg-secondary">+4</span>
          </div>
        </div>
        <div className={`payment-box ${isVisible('pay-credit')}`}>
          <div className="mb-2">
            <input type="text" className="form-control" placeholder="Card number" />
          </div>
          <div className="row g-2 mb-2">
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Expiration date (MM / YY)" />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Security code" />
            </div>
          </div>
          <div className="mb-2">
            <input type="text" className="form-control" placeholder="Name on card" />
          </div>
          <div className="form-check mb-2">
            <input className="form-check-input" type="checkbox" id="billingAddress" defaultChecked />
            <label className="form-check-label" htmlFor="billingAddress">
              Use shipping address as billing address
            </label>
          </div>
        </div>
      </div>

      {/* PayPal */}
      <div className="payment-option">
        <input
          type="radio"
          name="payment-method"
          id="pay-paypal"
          checked={selectedMethod === 'pay-paypal'}
          onChange={handleMethodChange}
         
        />
        <span className='input-span'>PayPal</span>
        
        <div className={`payment-box ${isVisible('pay-paypal')}`}>
          <p className="mt-2">You’ll be redirected to PayPal.</p>
        </div>
      </div>

      {/* Synchrony */}
      <div className="payment-option">
        <div>
          <input
            type="radio"
            name="payment-method"
            id="pay-synchrony"
            checked={selectedMethod === 'pay-synchrony'}
            onChange={handleMethodChange}
          />
          <span className='input-span'>Synchrony Financing – Pay Over Time</span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Synchrony_Financial_logo.svg"
            alt="Synchrony"
            style={{ height: '20px', float: 'right' }}
          />
        </div>
        <div className={`payment-box ${isVisible('pay-synchrony')}`}>
          <p className="mt-2">Apply with Synchrony for flexible financing.</p>
        </div>
      </div>

      {/* Affirm */}
      <div className="payment-option">
        <input
          type="radio"
          name="payment-method"
          id="pay-affirm"
          checked={selectedMethod === 'pay-affirm'}
          onChange={handleMethodChange}
        />
        <span className='input-span'>Affirm</span>
        <div className={`payment-box ${isVisible('pay-affirm')}`}>
          <p className="mt-2">Monthly payments with Affirm.</p>
        </div>
      </div>

      {/* Multiple Payments */}
      <div className="payment-option">
        <div>
          <input
            type="radio"
            name="payment-method"
            id="pay-multiple"
            checked={selectedMethod === 'pay-multiple'}
            onChange={handleMethodChange}
          />
          <span className='input-span'>Multiple Payments</span>
        </div>
        <div className={`payment-box ${isVisible('pay-multiple')}`}>
          <p className="mt-2">Split your total into multiple payment methods.</p>
        </div>
      </div>

      {/* Wire Transfer */}
      <div className="payment-option">
        <div>
          <input
            type="radio"
            name="payment-method"
            id="pay-wire"
            checked={selectedMethod === 'pay-wire'}
            onChange={handleMethodChange}
          />
          <span className='input-span'>Wire Transfer - Contact customer service to complete payment.</span>
        </div>
        <div className={`payment-box ${isVisible('pay-wire')}`}>
          <p className="mt-2">We'll contact you with bank transfer details after order confirmation.</p>
        </div>
      </div>
    </div>

   <div className="container my-5" style={{ maxWidth: '700px' }}>
      {/* Remember Me Section */}
      <div className="mb-3">
        <h6><strong>Remember me</strong></h6>
        <div className="remember-box">
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberCheck"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="rememberCheck">
              Save my information for a faster checkout with a Shop account
            </label>
          </div>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                <path d="M11 1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
              </svg>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Mobile phone number"
              defaultValue="+1"
            />
          </div>
        </div>
      </div>

      {/* Secure Notice */}
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="secure-text">
          🔒 Secure and encrypted
        </div>
        <div className="shop-logo">shop</div>
      </div>

      {/* Pay Now Button */}
      <button className="btn pay-button">Pay now</button>

      {/* Terms Text */}
      <p className="terms-text">
        Your info will be saved to a Shop account. By continuing, you agree to Shop’s{' '}
        <a href="#">Terms of Service</a> and acknowledge the{' '}
        <a href="#">Privacy Policy</a>.
      </p>
    </div>
          </div>

  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 co-sm-12 col-12">
      <div className="container my-5" style={{ maxWidth: '600px' }}>
        <div className="product-summary">

          {/* Product Row */}
          <div className="d-flex align-items-start mb-3">
            <div className="me-3 position-relative">
              <img
                src="https://cdn.shopify.com/s/files/1/0628/0490/7113/files/diamond-round.jpg?v=1649386574"
                alt="Diamond"
                className="product-img"
              />
              <span
                className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-dark"
                style={{ fontSize: '0.75rem' }}
              >
                1
              </span>
            </div>
            <div className="product-info flex-grow-1">
              <strong>0.3 Carat Round Lab Diamond</strong><br />
              <small>Color: D</small><br />
              <small>Clarity: VVS1</small><br />
              <small>Lab: GIA</small>
            </div>
            <div className="text-end">
              <strong>$424.00</strong>
            </div>
          </div>

          {/* Discount Code */}
          <div className="discount-box input-group mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Discount code or gift card"
            />
            <button className="btn btn-outline-secondary" type="button" disabled>
              Apply
            </button>
          </div>

          {/* Subtotal */}
          <div className="d-flex justify-content-between mb-2">
            <div className="text-gray">Subtotal</div>
            <div>$424.00</div>
          </div>

          {/* Shipping */}
          <div className="d-flex justify-content-between mb-3">
            <div className="text-gray">
              Shipping <span title="Shipping will be calculated after entering address">❔</span>
            </div>
            <div className="text-gray">Enter shipping address</div>
          </div>

          {/* Total */}
          <div className="d-flex justify-content-between align-items-center border-top pt-3">
            <div><strong>Total</strong></div>
            <div>
              <span className="currency">USD</span>{' '}
              <span className="total-price">$424.00</span>
            </div>
          </div>

        </div>
      </div>
    </div>



        </div>
      </div>
    </section>




    </>
  )
}

export default Checkout;
