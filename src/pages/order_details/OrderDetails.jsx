import React from 'react';
import './OrderDetails.css';

const OrderDetails = () => {
  return (
    <div className="order-container">
      <div className="left-section">
        <div className="product-header">
          <img
            src="https://i.imgur.com/6LZxZZL.png"
            alt="flip flops"
            className="product-image"
          />
          <div className="product-info">
            <h3>Cloker Men Flip Flops</h3>
            <p>8, White</p>
            <p className="seller">Seller: SalvationTrader</p>
            <p className="price">₹234</p>
          </div>
        </div>

        <div className="order-status">
          <div className="status confirmed">
            <span className="dot green"></span>
            Order Confirmed, May 20
          </div>
          <div className="status cancelled">
            <span className="dot red"></span>
            Cancelled, May 20
          </div>
          <a href="#" className="see-updates">See All Updates ›</a>
          <p className="cancel-msg">Your order was cancelled as per your request.</p>
          <button className="chat-btn">💬 Chat with us</button>
        </div>

        <div className="experience">
          <p>🛍️ How was your cancellation experience?</p>
        </div>
      </div>

      <div className="right-section">
        <div className="shipping-details-box">
          <h4>Shipping details</h4>
          <p><strong>Radhika Gour</strong></p>
          <p>1168<br />
            101 A, Mohan Complex,<br />
            Delhi<br />
            Delhi - 403233<br />
            Phone number: 9876543210</p>
        </div>

        <div className="price-details-box">
          <h4>Price Details</h4>
          <div className="price-row"><span>List price</span><span className="strikethrough">₹799</span></div>
          <div className="price-row"><span>Selling price</span><span>₹230</span></div>
          <div className="price-row"><span>Handling Fee</span><span>₹3</span></div>
          <div className="price-row"><span>Platform fee</span><span>₹1</span></div>
          <div className="price-row total"><span>Total Amount</span><span>₹234</span></div>
          <ul className="cod">
            <li>• Cash On Delivery: ₹234.0</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
