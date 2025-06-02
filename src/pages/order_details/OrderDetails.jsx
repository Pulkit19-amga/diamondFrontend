import React from "react";
import { useLocation } from "react-router-dom";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

import "./OrderDetails.css";

const OrderDetails = () => {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return <div className="order-container">Loading...</div>;
  }

  // Parse item details
  let items = [];
  let addressObj = null;
  try {
    const parsed = JSON.parse(order.item_details || "{}");
    items = Object.values(parsed); // Array of all items
    addressObj =
      typeof order.address === "string"
        ? JSON.parse(order.address)
        : order.address;
  } catch (e) {
    console.warn("Item details parsing failed", e);
    console.warn("Address parsing failed", e);
  }

  const generateInvoicePDF = async () => {
    const input = document.getElementById("invoice-content");
    if (!input) return;

    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice_${order.order_id}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  return (
    <div className="order-container">
      <div className="left-section">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div className="product-header" key={index}>
              <img
                src={item?.image || "https://i.imgur.com/6LZxZZL.png"}
                alt={item?.title || "Product"}
                className="product-image"
              />
              <div className="product-info">
                <h3>{item?.title || "Product Name"}</h3>
                <p>{item?.variant || "Size/Color info"}</p>
                <p className="seller">
                  Seller: {item?.seller || "Your Seller"}
                </p>
                <p className="price">${item?.price || 0}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No items found in this order.</p>
        )}

        <div className="order-status">
          <div
            className={`status ${
              order.order_status === "Cancelled" ? "cancelled" : "confirmed"
            }`}
          >
            <span
              className={`dot ${
                order.order_status === "Cancelled" ? "red" : "green"
              }`}
            ></span>
            {order.order_status},{" "}
            {new Date(order.updated_at).toLocaleDateString()}
          </div>
          {/* <a href="#" className="see-updates">
            See All Updates ›
          </a> */}
          {order.order_status === "Cancelled" && (
            <p className="cancel-msg">
              Your order was cancelled as per your request.
            </p>
          )}
          <button className="chat-btn">💬 Chat with us</button>
          <button className="download-btn" onClick={generateInvoicePDF}>
            📄 Download Invoice
          </button>

          <div id="invoice-content" className="invoice-box">
            <h2 className="invoice-title">Invoice</h2>

            <div className="invoice-header">
              <div>
                <h3>From:</h3>
                <p>
                  <strong>Your Company Name</strong>
                </p>
                <p>123 Main Street</p>
                <p>City, Country</p>
                <p>Email: support@example.com</p>
              </div>
              <div>
                <h3>To:</h3>
                <p>
                  <strong>{order.user_name}</strong>
                </p>
                <p>{addressObj?.apartment}</p>
                <p>{addressObj?.street}</p>
                <p>City: {addressObj?.city} - {addressObj?.zip}
                </p>
                <p>Country: {addressObj.country}</p>
                <p>Phone number: {order.contact_number}</p>
              </div>
            </div>

            <div className="invoice-meta">
              <p>
                <strong>Order ID:</strong> {order.order_id}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.created_at).toLocaleDateString()}
              </p>
              <p>
                <strong>Payment Method:</strong> {order.payment_mode}
              </p>
            </div>

            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {items?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.quantity || 1}</td>
                    <td>${item.price}</td>
                    <td>${item.price * (item.quantity || 1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="invoice-summary">
              <p>
                <strong>Subtotal:</strong> ${order.total_price}
              </p>
              <p>
                <strong>Shipping:</strong> ${order.shipping_cost}
              </p>
              <p>
                <strong>Discount:</strong> -${order.discount}
              </p>
              <p className="total">
                <strong>Total:</strong> ${order.total_price}
              </p>
            </div>

            <p className="thanks">Thank you for shopping with us!</p>
            {/* Your left-section and right-section including price/address here */}
          </div>
        </div>

        <div className="experience">
          <p>🛍️ How was your {order.order_status?.toLowerCase()} experience?</p>
        </div>
      </div>

      <div className="right-section">
        <div className="shipping-details-box">
          <h4>Shipping details</h4>
          <p>
            <strong>{order.user_name}</strong>
          </p>
          <div className="address-block">
            {addressObj ? (
              <>
                {addressObj.apartment && <p>{addressObj.apartment}</p>}
                {addressObj.street && <p>{addressObj.street}</p>}
                {(addressObj.city || addressObj.zip) && (
                  <p>
                    {addressObj.city}
                    {addressObj.city && addressObj.zip ? ", " : ""}
                    {addressObj.zip}
                  </p>
                )}
                {addressObj.country && <p>{addressObj.country}</p>}
              </>
            ) : (
              <p>{order.address}</p> // fallback: just raw address string
            )}
          </div>
          <p>Phone number: {order.contact_number}</p>
        </div>

        <div className="price-details-box">
          <h4>Price Details</h4>

          {items.length > 0 ? (
            items.map((item, index) => (
              <div className="price-item" key={index}>
                <div className="price-row">
                  <span>Item {index + 1} - Selling Price</span>
                  <span>${item.price || 0}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No item pricing found.</p>
          )}

          <div className="price-row">
            <span>Shipping Cost</span>
            <span>${order.shipping_cost || 0}</span>
          </div>

          <div className="price-row">
            <span>Discount</span>
            <span>-${order.discount || 0}</span>
          </div>

          <div className="price-row total">
            <span>Total Amount</span>
            <span>${order.total_price || 0}</span>
          </div>

          <ul className="cod">
            <li>
              • {order.payment_mode || "N/A"}: ${order.total_price || 0}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
