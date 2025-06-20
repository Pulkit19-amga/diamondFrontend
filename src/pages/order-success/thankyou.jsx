import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './thankyou.css';

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  const handleViewOrder = () => {
    if (order) {
      navigate(`/order-details/:orderId`, { state: { order } });
    }
  };

  const handleContinueShopping = () => {
    navigate("/diamond"); 
  };

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
              <button className="btn-outline" onClick={handleViewOrder}>
                VIEW ORDER
              </button>
              <button className="btn-filled" onClick={handleContinueShopping}>
                CONTINUE SHOPPING
              </button>
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
