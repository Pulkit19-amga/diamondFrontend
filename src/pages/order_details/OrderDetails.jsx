// Enhanced OrderDetails UI with Download Invoice button
import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return <div className="order-container">Loading...</div>;
  }

  let items = [];
  let addressObj = null;
  try {
    const parsed = JSON.parse(order.item_details || "{}");
    items = Object.values(parsed);
    addressObj = typeof order.address === "string" ? JSON.parse(order.address) : order.address;
  } catch (e) {
    console.warn("Item or address parsing failed", e);
  }

  const generateInvoicePDF = async () => {
    const input = document.getElementById("invoice-content");
    if (!input) return;
    try {
      const canvas = await html2canvas(input, { scale: 2, useCORS: true, allowTaint: true });
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
    <div className="order-page-grid">
      <div className="order-main-box">
        <div className="order-product-box">
          <div className="order-product-head">
            <div className="product-details">
              <h4>{items[0]?.title || "Product Title"}</h4>
              <p>{items[0]?.variant || "Variant Info"}</p>
              <p className="seller">Seller: {items[0]?.seller || "Seller Name"}</p>
              <p className="price">₹{items[0]?.price || 0}</p>
            </div>
            <img
              src={items[0]?.image || "https://i.imgur.com/6LZxZZL.png"}
              alt="Product"
              className="order-image-thumb"
            />
          </div>

          <div className="order-timeline-box">
            <div className="timeline-item">
              <span className="dot green"></span>
              Order Confirmed, {new Date(order.created_at).toLocaleDateString()}
            </div>
            {order.order_status === "Cancelled" && (
              <div className="timeline-item">
                <span className="dot red"></span>
                Cancelled, {new Date(order.updated_at).toLocaleDateString()}
              </div>
            )}
            <div className="see-all-updates">See All Updates →</div>
      
          </div>

          <div className="chat-with-us">💬 Chat with us</div>
          <div className="download-invoice" onClick={generateInvoicePDF}>📄 Download Invoice</div>
        </div>

        <div className="order-other-items">
          <div className="section-title">Other Items In This Order</div>
          {items.slice(1).map((item, i) => (
            <div className="other-item-row" key={i}>
              <div className="left">
                <span className="status-dot red"></span> {item.title}
                <div className="cancelled-label">Cancelled</div>
              </div>
              <img
                src={item.image || "https://i.imgur.com/6LZxZZL.png"}
                alt="Product"
                className="thumb-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="order-side-box">
        <div className="shipping-details">
          <h4>Shipping details</h4>
          <p><strong>{order.user_name}</strong></p>
          <p>{addressObj?.apartment}</p>
          <p>{addressObj?.street}</p>
          <p>{addressObj?.city}, {addressObj?.zip}</p>
          <p><strong>Phone number:</strong> {order.contact_number}</p>
        </div>

        <div className="price-summary" id="invoice-content">
          <h4>Price Details</h4>
          <div className="price-row"><span>List price</span><span>₹{order.original_price || 0}</span></div>
          <div className="price-row"><span>Selling price</span><span>₹{items[0]?.price || 0}</span></div>
          <div className="price-row"><span>Handling Fee</span><span>₹{order.shipping_cost || 0}</span></div>
          <div className="price-row"><span>Platform fee</span><span>₹{order.discount || 0}</span></div>
          <div className="price-row total"><span>Total Amount</span><span>₹{order.total_price || 0}</span></div>
          <div className="payment-mode">• Cash On Delivery: ₹{order.total_price || 0}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;