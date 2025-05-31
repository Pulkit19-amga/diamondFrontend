import React from 'react';
import './PaymentFailed.css';

const PaymentFailed = () => {
  return (
    <div className="payment-wrapper">
      <div className="payment-card">
        <div className="payment-icon">!</div>
        <h2 className="payment-title">Payment Failed</h2>
        <p className="payment-message">
          Hey there. We tried to charge your card but, something went wrong. Please update your payment method below to continue
        </p>
        <button className="update-button">Update Payment Method</button>
        <p className="support-text">
          Have a question? <a href="#" className="support-link">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default PaymentFailed;
