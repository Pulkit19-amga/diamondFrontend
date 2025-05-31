import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axios";
import "./MyOrders.css";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosClient.get("/api/get-orders");
        const data = Array.isArray(response.data.data) ? response.data.data : [];
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (userId, nthIndex) => {
    navigate(`/order-details/${order.id}`, { state: { order } });
  };

  return (
    <div className="order-containers">
      {orders.length > 0 ? (
        orders.map((order, index) => {
          let items = [];
          try {
            items = JSON.parse(order.item_details);
          } catch (e) {
            console.warn("Invalid item_details JSON", e);
          }

          return (
            <div
              className="order-item"
              key={order.id}
             onClick={() => handleOrderClick(order)}
            >
              <div className="order-left">
                <div className="order-image">
                  <img
                    src={"https://via.placeholder.com/100"}
                    alt={"Order"}
                  />
                </div>
                <div className="order-info">
                  <div className="order-title">Order #{order.order_id}</div>
                  <div className="order-meta">
                    Items: {items.length}
                    {items.length > 0 && (
                      <ul className="order-items-list">
                        {items.map((item, idx) => (
                          <li key={idx}>
                            ID: {item.id}, Qty: {item.quantity}, ₹{item.price}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className="order-center">
                <div className="order-price">₹{order.total_price}</div>
              </div>

              <div className="order-right">
                <div className="order-status-row">
                  <span className="status-dot"></span>
                  <span className="cancelled-text">
                    {order.order_status || "Unknown"} on{" "}
                    {order.updated_at
                      ? new Date(order.updated_at).toLocaleDateString()
                      : "Unknown Date"}
                  </span>
                </div>
                <div className="order-reason">
                  Payment: {order.payment_mode || "N/A"} (
                  {order.payment_status || "Pending"})
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;
