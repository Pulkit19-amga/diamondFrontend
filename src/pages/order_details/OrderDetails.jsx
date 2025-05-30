import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../api/axios";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { userId, nth } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosClient.get(`/api/users/${userId}/orders/history?nth=${nth}`);
        const orderData = res.data.history[0];
        setOrder(orderData);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    fetchOrder();
  }, [userId, nth]);

  if (!order) {
    return <div className="order-container">Loading...</div>;
  }

  // Parse item details
  let item = null;
  try {
    const parsed = JSON.parse(order.item_details);
    item = parsed.length > 0 ? parsed[0] : null;
  } catch (e) {
    console.warn("Item details parsing failed", e);
  }

  return (
    <div className="order-container">
      <div className="left-section">
        <div className="product-header">
          <img
            src={item?.image || "https://i.imgur.com/6LZxZZL.png"}
            alt={item?.title || "Product"}
            className="product-image"
          />
          <div className="product-info">
            <h3>{item?.title || "Product Name"}</h3>
            <p>{item?.variant || "Size/Color info"}</p>
            <p className="seller">Seller: {item?.seller || "Your Seller"}</p>
            <p className="price">₹{item?.price || order.total_price}</p>
          </div>
        </div>

        <div className="order-status">
          <div className={`status ${order.order_status === "Cancelled" ? "cancelled" : "confirmed"}`}>
            <span className={`dot ${order.order_status === "Cancelled" ? "red" : "green"}`}></span>
            {order.order_status}, {new Date(order.updated_at).toLocaleDateString()}
          </div>
          <a href="#" className="see-updates">See All Updates ›</a>
          {order.order_status === "Cancelled" && (
            <p className="cancel-msg">Your order was cancelled as per your request.</p>
          )}
          <button className="chat-btn">💬 Chat with us</button>
        </div>

        <div className="experience">
          <p>🛍️ How was your {order.order_status?.toLowerCase()} experience?</p>
        </div>
      </div>

      <div className="right-section">
        <div className="shipping-details-box">
          <h4>Shipping details</h4>
          <p><strong>{order.user_name}</strong></p>
          <p>{order.address?.replace(/, /g, ",\n")}</p>
          <p>Phone number: {order.contact_number}</p>
        </div>

        <div className="price-details-box">
          <h4>Price Details</h4>
          <div className="price-row"><span>List price</span><span className="strikethrough">₹{item?.original_price}</span></div>
          <div className="price-row"><span>Selling price</span><span>₹{item?.price}</span></div>
          <div className="price-row"><span>Shipping Cost</span><span>₹{order.shipping_cost}</span></div>
          <div className="price-row"><span>Discount</span><span>-₹{order.discount}</span></div>
          <div className="price-row total"><span>Total Amount</span><span>₹{order.total_price}</span></div>
          <ul className="cod">
            <li>• {order.payment_mode}: ₹{order.total_price}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
