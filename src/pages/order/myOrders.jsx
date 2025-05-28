import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

const MyOrders = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/order-details"); // Adjust path as needed
  };

  return (
    <div className="order-container">
      <div className="order-item" onClick={handleOrderClick}>
        {/* Left Column: Image + Info */}
        <div className="order-left">
          <div className="order-image">
            <img
              src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTt9qaxU5aRwIhwASlOqdBhM3rRO7EvnAPYlbHsmoT1zz-njsvY1FDuqbaA80nHnqc5kENAVGii9xm29aRPUAMgx8bBynx7-Ji_B72wr-7rnUjmQWtdfrcfWFg"
              alt="Flip Flops"
            />
          </div>
          <div className="order-info">
            <div className="order-title">Cloker Men Flip Flops</div>
            <div className="order-meta">Color: White &nbsp; Size: 8</div>
          </div>
        </div>

        {/* Center Column: Price */}
        <div className="order-center">
          <div className="order-price">₹234</div>
        </div>

        {/* Right Column: Cancel Status */}
        <div className="order-right">
          <div className="order-status-row">
            <span className="status-dot"></span>
            <span className="cancelled-text">Cancelled on May 20</span>
          </div>
          <div className="order-reason">
            You requested a cancellation because you wanted it in another
            size/colour.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
