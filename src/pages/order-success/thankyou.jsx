import React from "react";
import { useLocation } from "react-router-dom";
import "./ThankYou.css";

const ThankYou = () => {
  const location = useLocation();
  const order = location.state?.order;
  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <div className="thankyou-icon">
          <div className="checkmark">&#10003;</div>
          <div className="particles"></div>
        </div>
        {order ? (
          <>
            <h2>Thank you for ordering!</h2>
            <p>
              Order ID: <strong> {order.order_id}</strong>
            </p>
            <p>
              Total Price: <strong>{order.total_price}</strong>
            </p>
            <div className="thankyou-buttons">
              <button className="btn-outline">VIEW ORDER</button>
              <button className="btn-filled">CONTINUE SHOPPING</button>
            </div>
          </>
        ) : (
          <p>No order data found.</p>
        )}
      </div>
    </div>
  );
};

export default ThankYou;
