import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../cart/CartContext";
import "./checkout.css";

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("");
  const [errors, setErrors] = useState({});


  const location = useLocation();
  const { cartItems: contextCartItems, clearCart } = useCart();

  // Try to get from navigation state, fallback to context
  const cartItems = location.state?.cartItems || contextCartItems;

  // Calculate subtotal based on cartItems from either source
  const subtotal = cartItems.reduce(
    (total, item) => total + parseFloat(item.price || 0) * (item.quantity || 1),
    0
  );
  // const [selectedMethod, setSelectedMethod] = useState("pay-credit");

  const [formData, setFormData] = useState({
    email: "",
    country: "",
    first_name: "",
    last_name: "",
    address: "",
    apartment: "",
    city: "",
    zip_code: "",
    phone: "",
    smsOffers: false,
  });

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.id);
  };

  const isVisible = (id) => (selectedMethod === id ? "" : "d-none");

  const calculateTotal = (items) => {
    return items
      .reduce((total, item) => {
        const price = parseFloat(item.price || 0);
        const quantity = item.quantity || 1;
        return total + price * quantity;
      }, 0)
      .toFixed(2); // Return as string with 2 decimals
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!user && !formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!user && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    ["first_name", "last_name", "address", "city", "zip_code", "phone"].forEach(
      (field) => {
        if (!formData[field].trim()) {
          newErrors[field] = `${field.replace("_", " ")} is required`;
        }
      }
    );

    if (!selectedMethod) {
      newErrors.payment = "Please select a payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      // Form is valid — do your submit logic here
      // console.log("Submitting:", { formData, selectedMethod });
      // alert("Form submitted successfully!");
      if (!user) {
        // User not logged in — save form data and redirect to signin
        localStorage.setItem(
          "pendingAddress",
          JSON.stringify({ formData, selectedMethod, cartItems })
        );
        navigate("/signin", { state: { from: "/checkout" } });
      } else {
        localStorage.setItem(
          "pendingAddress",
          JSON.stringify({ formData, selectedMethod, cartItems })
        );
        // User is logged in — submit to address API
        const itemDetailsObject = cartItems.reduce((acc, item) => {
          acc[item.diamondid] = {
            type: item.type,
            price: item.price,
            quantity: item.quantity,
            weight: item.carat_weight,
          };
          return acc;
        }, {});

        const addressObject = {
          apartment: formData.apartment,
          street: formData.address,
          city: formData.city,
          zip: formData.zip_code,
          country: formData.country,
        };
        try {
          const response = await axiosClient.post("/api/store-addresses", {
            user_id: user.id,
            first_name: formData.first_name,
            last_name: formData.last_name,
            country: formData.country,
            address: {
              apartment: formData.apartment,
              street: formData.address,
              city: formData.city,
              zip: formData.zip_code,
            },
            phone_number: formData.phone,
            is_get_offer: formData.smsOffers ? 1 : 0,
          });

          console.log("Address saved:", response.data);
          // alert("Address saved successfully!");

          // If user selected PayPal, create PayPal order and redirect
          if (selectedMethod === "pay-paypal") {
            const paypalResponse = await axiosClient.post(
              "/api/paypal/create-order",
              {
                amount: calculateTotal(cartItems),
                currency: "USD",
                user_id: user.id,
              }
            );

            const { orderID, approve_url } = paypalResponse.data;

            // Redirect user to PayPal approval page
            window.location.href = approve_url;
            return; // Stop further processing here, user is redirected to PayPal
          }

          const orderResponse = await axiosClient.post("/api/store-order", {
            user_id: user.id,
            user_name: `${formData.first_name} ${formData.last_name}`,
            contact_number: formData.phone,
            items_id: cartItems.map((item) => item.diamondid),
            item_details: JSON.stringify(itemDetailsObject),
            total_price: calculateTotal(cartItems),
            address: JSON.stringify(addressObject),
            order_status: "pending",
            payment_mode: selectedMethod,
            payment_status: "pending",
            is_gift: formData.isGift || false,
            notes: formData.notes || "",
          });

          clearCart();
          console.log("Order created:", orderResponse.data);
          navigate("/thankyou", { state: { order: orderResponse.data } });
        } catch (error) {
          console.error("Error submitting order:", error);
          alert("Failed to process your order.");
        }
      }
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      if (user) {
        try {
          const res = await axiosClient.get(`/api/user-address/${user.id}`);
          const addr = res.data;

          if (addr) {
            setFormData((prev) => ({
              ...prev,
              first_name: addr.first_name,
              last_name: addr.last_name,
              country: addr.country,
              apartment: addr.address?.apartment || "",
              address: addr.address?.street || "",
              city: addr.address?.city || "",
              zip_code: addr.address?.zip || "",
              phone: addr.phone_number,
              smsOffers: addr.is_get_offer === 1,
            }));
          }
        } catch (err) {
          console.error("No existing address found.");
        }
      }
    };

    fetchAddress();

    const params = new URLSearchParams(location.search);
    const paypalStatus = params.get("paypal_status");

    const paypalOrderId = params.get("paypal_order_id");


    if (paypalStatus === "cancelled") {
      // 🟥 Handle PayPal cancellation
      alert("You cancelled the PayPal payment. Your order was not placed.");
      localStorage.removeItem("pendingAddress");
      // Optionally redirect or reset state
      navigate("/paymnet-failed", {
        state: {
          orderId: params.get("paypal_order_id"),

        },
      });
      return;
    }

    if (paypalStatus === "success" && user) {

      const saved = localStorage.getItem("pendingAddress");

      if (!saved) {
        console.warn("No pending address found after PayPal redirect.");
        return;
      }

      const {
        formData: savedFormData,
        selectedMethod: savedMethod,
        cartItems: savedCartItems,
      } = JSON.parse(savedData);
      console.log("Is cartItems an array?", Array.isArray(cartItems));
      console.log("Is cartItems empty?", cartItems?.length === 0);

      // Validate saved data exists
      if (
        !savedFormData.first_name ||
        !savedFormData.last_name ||
        !savedFormData.phone ||
        !Array.isArray(savedCartItems) ||
        savedCartItems.length === 0
      ) {
        alert("Incomplete order data. Please try ordering again.");
        navigate("/paymnet-failed", {
          state: {
            orderId: params.get("paypal_order_id"),
          },
        });
        return;
      }

      const itemDetailsObject = savedCartItems.reduce((acc, item) => {
        acc[item.diamondid] = {
          type: item.type,
          price: item.price,
          quantity: item.quantity,
          weight: item.carat_weight,
        };
        return acc;
      }, {});

      const addressObject = {
        apartment: savedFormData.apartment,
        street: savedFormData.address,
        city: savedFormData.city,
        zip: savedFormData.zip_code,
        country: savedFormData.country,
      };

      const finalizeOrder = async () => {
        try {
          const orderResponse = await axiosClient.post("/api/store-order", {
            user_id: user.id,
            user_name: `${savedFormData.first_name} ${savedFormData.last_name}`,
            contact_number: savedFormData.phone,
            items_id: savedCartItems.map((item) => item.diamondid),
            item_details: JSON.stringify(itemDetailsObject),
            total_price: calculateTotal(savedCartItems),
            address: JSON.stringify(addressObject),
            order_status: "confirmed",
            payment_mode: savedMethod,
            payment_status: "paid",
            is_gift: savedFormData.isGift || false,
            payment_id: paypalOrderId ?? null,
            notes: formData.notes || "",

          });

          clearCart();
          localStorage.removeItem("pendingOrderData");
          localStorage.removeItem("pendingAddress");

          navigate("/thankyou", { state: { order: orderResponse.data } });
        } catch (err) {
          console.error("Failed to finalize PayPal order:", err);
          alert("Payment was captured but we failed to place your order.");
        }
      };

      finalizeOrder();
    }
    // Restore form if coming back from /signin (no paypal status)
    const savedData = localStorage.getItem("pendingAddress");
    if (savedData && !paypalStatus) {
      const { formData, selectedMethod } = JSON.parse(savedData);
      setFormData(formData);
      setSelectedMethod(selectedMethod);
      // Don't remove it yet — only after successful final order
    }
  }, [user, navigate, location]);

 
  return (
    <>
      <section className="sign_up">
        <div className="container">
          <div className="row ">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              {/* Redeem Section */}
              <div className="container my-5">
                <div className="redeem-card mb-4">
                  <h6>Redeem your Points</h6>
                  {user ? (
                    <p className="mb-2">
                      Logged in as <strong>{user.email}</strong>
                    </p>
                  ) : (
                    <p className="mb-2">
                      <Link className="link align-items_center" to="/signin">
                        Log in
                      </Link>{" "}
                      to view your points balance and discover rewards available
                      for redemption.
                    </p>
                  )}
                  <select className="form-select mb-2" disabled>
                    <option>Select a discount</option>
                  </select>
                  <button className="btn btn-disabled w-100" disabled>
                    Redeem
                  </button>
                </div>

                <div className="text-center mb-3">
                  <small className="text-muted">Express checkout</small>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 mb-4">
                  <button className="express-btn btn-shop">
                    shop <strong>Pay</strong>
                  </button>
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
                  {user ? (
                    <span className="text-muted small">{user.email}</span>
                  ) : (
                    <Link
                      className="link text-primary align-items_center"
                      to="/signin"
                    >
                      Log in
                    </Link>
                  )}
                </div>

                {!user && (
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className={`form-control form-control-lg ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                )}

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="emailOffers"
                    checked={formData.emailOffers}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="emailOffers">
                    Email me with news and offers
                  </label>
                </div>

                <div className="section-title">Delivery</div>

                <div className="mb-3">
                  <select
                    className="form-select form-select-lg"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a country</option>
                    <option value="Canada">Canada</option>
                    <option value="United States">United States</option>
                  </select>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-md">
                    <input
                      type="text"
                      name="first_name"
                      className={`form-control form-control-lg ${
                        errors.first_name ? "is-invalid" : ""
                      }`}
                      placeholder="First name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                    />
                    {errors.first_name && (
                      <div className="invalid-feedback">
                        {errors.first_name}
                      </div>
                    )}
                  </div>
                  <div className="col-md">
                    <input
                      type="text"
                      name="last_name"
                      className={`form-control form-control-lg ${
                        errors.last_name ? "is-invalid" : ""
                      }`}
                      placeholder="Last name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                    />
                    {errors.last_name && (
                      <div className="invalid-feedback">{errors.last_name}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3 position-relative">
                  <input
                    type="text"
                    name="address"
                    className={`form-control form-control-lg ${
                      errors.address ? "is-invalid" : ""
                    }`}
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  <span className="input-icon">
                    <i className="bi bi-search"></i>
                  </span>
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="apartment"
                    className="form-control form-control-lg"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={formData.apartment}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="city"
                      className={`form-control form-control-lg ${
                        errors.city ? "is-invalid" : ""
                      }`}
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    {errors.city && (
                      <div className="invalid-feedback">{errors.city}</div>
                    )}
                  </div>
                  {/* <div className="col-md-4">
                    <select className="form-select form-select-lg">
                      <option>Alabama</option>
                    </select>
                  </div> */}
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="zip_code"
                      className={`form-control form-control-lg ${
                        errors.zip_code ? "is-invalid" : ""
                      }`}
                      placeholder="ZIP code"
                      value={formData.zip_code}
                      onChange={handleInputChange}
                    />
                    {errors.zip_code && (
                      <div className="invalid-feedback">{errors.zip_code}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3 position-relative">
                  <input
                    type="text"
                    name="phone"
                    className={`form-control form-control-lg ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <span className="input-icon">
                    <i className="bi bi-question-circle"></i>
                  </span>
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="smsOffers"
                    name="smsOffers"
                    checked={formData.smsOffers}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="smsOffers">
                    Text me with news and offers
                  </label>
                </div>
              </div>

              {/* Payment Section */}
              <div className="container my-5" style={{ maxWidth: "700px" }}>
                {/* Section Title */}
                <div className="section-title">Payment</div>
                <p className="text-muted mb-3">
                  All transactions are secure and encrypted.
                </p>

                <div className="payment-option">
                  <input
                    type="radio"
                    name="payment-method"
                    id="cod"
                    checked={selectedMethod === "cod"}
                    onChange={handleMethodChange}
                  />
                  <span className="input-span">COD</span>
                </div>

                {/* Credit Card Option */}
                <div className="payment-option">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <input
                        type="radio"
                        name="payment-method"
                        id="pay-credit"
                        checked={selectedMethod === "pay-credit"}
                        onChange={handleMethodChange}
                      />
                      <strong> Credit card </strong>
                    </div>
                    <div className="card-icons">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                        alt="Visa"
                      />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0c/MasterCard_logo.png"
                        alt="MasterCard"
                      />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg"
                        alt="Amex"
                      />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Discover_Card_logo.svg"
                        alt="Discover"
                      />
                      <span className="badge bg-secondary">+4</span>
                    </div>
                  </div>
                  <div className={`payment-box ${isVisible("pay-credit")}`}>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Card number"
                      />
                    </div>
                    <div className="row g-2 mb-2">
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Expiration date (MM / YY)"
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Security code"
                        />
                      </div>
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name on card"
                      />
                    </div>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="billingAddress"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="billingAddress"
                      >
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
                    checked={selectedMethod === "pay-paypal"}
                    onChange={handleMethodChange}
                  />
                  <span className="input-span">PayPal</span>

                  <div className={`payment-box ${isVisible("pay-paypal")}`}>
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
                      checked={selectedMethod === "pay-synchrony"}
                      onChange={handleMethodChange}
                    />
                    <span className="input-span">
                      Synchrony Financing – Pay Over Time
                    </span>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Synchrony_Financial_logo.svg"
                      alt="Synchrony"
                      style={{ height: "20px", float: "right" }}
                    />
                  </div>
                  <div className={`payment-box ${isVisible("pay-synchrony")}`}>
                    <p className="mt-2">
                      Apply with Synchrony for flexible financing.
                    </p>
                  </div>
                </div>

                {/* Affirm */}
                <div className="payment-option">
                  <input
                    type="radio"
                    name="payment-method"
                    id="pay-affirm"
                    checked={selectedMethod === "pay-affirm"}
                    onChange={handleMethodChange}
                  />
                  <span className="input-span">Affirm</span>
                  <div className={`payment-box ${isVisible("pay-affirm")}`}>
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
                      checked={selectedMethod === "pay-multiple"}
                      onChange={handleMethodChange}
                    />
                    <span className="input-span">Multiple Payments</span>
                  </div>
                  <div className={`payment-box ${isVisible("pay-multiple")}`}>
                    <p className="mt-2">
                      Split your total into multiple payment methods.
                    </p>
                  </div>
                </div>

                {/* Wire Transfer */}
                <div className="payment-option">
                  <div>
                    <input
                      type="radio"
                      name="payment-method"
                      id="pay-wire"
                      checked={selectedMethod === "pay-wire"}
                      onChange={handleMethodChange}
                    />
                    <span className="input-span">
                      Wire Transfer - Contact customer service to complete
                      payment.
                    </span>
                  </div>
                  <div className={`payment-box ${isVisible("pay-wire")}`}>
                    <p className="mt-2">
                      We'll contact you with bank transfer details after order
                      confirmation.
                    </p>
                  </div>
                </div>
                {errors.payment && (
                  <div className="text-danger mt-3 mb-3">{errors.payment}</div>
                )}
              </div>

              <div className="container my-5" style={{ maxWidth: "700px" }}>
                {/* Remember Me Section */}
                <div className="mb-3">
                  <h6>
                    <strong>Remember me</strong>
                  </h6>
                  <div className="remember-box">
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberCheck"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="rememberCheck"
                      >
                        Save my information for a faster checkout with a Shop
                        account
                      </label>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-phone"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                          <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
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
                  <div className="secure-text">🔒 Secure and encrypted</div>
                  <div className="shop-logo">shop</div>
                </div>

                {/* Pay Now Button */}
                <button
                  type="button"
                  className="btn pay-button"
                  onClick={handleSubmit}
                >
                  Pay now
                </button>

                {/* Terms Text */}
                <p className="terms-text">
                  Your info will be saved to a Shop account. By continuing, you
                  agree to Shop’s <a href="#">Terms of Service</a> and
                  acknowledge the <a href="#">Privacy Policy</a>.
                </p>
              </div>
            </div>

            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 co-sm-12 col-12">
              <div className="container my-5" style={{ maxWidth: "600px" }}>
                <div className="product-summary">
                  {/* Loop over cartItems */}
                  {cartItems.map((item, index) => {
                    const totalItemPrice = (item.price * item.quantity).toFixed(
                      2
                    );
                    return (
                      <div
                        className="d-flex align-items-start mb-3"
                        key={index}
                      >
                        <div className="me-3 position-relative">
                          <img
                            src={`/images/shapes/${
                              item.shape?.image || "placeholder.png"
                            }`}
                            alt={item.shape?.name || "Diamond"}
                            className="product-img"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/images/placeholder.png";
                            }}
                          />
                          <span
                            className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-dark"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {item.quantity}
                          </span>
                        </div>
                        <div className="product-info flex-grow-1">
                          <strong>
                            {item.carat_weight} Carat {item.shape?.name} Lab
                            Diamond
                          </strong>
                          <br />
                          <small>Color: {item.color?.name}</small>
                          <br />
                          <small>Clarity: {item.clarity?.name}</small>
                          <br />
                          <small>Cut: {item.cut?.full_name}</small>
                        </div>
                        <div className="text-end">
                          <strong>${totalItemPrice}</strong>
                        </div>
                      </div>
                    );
                  })}

                  {/* Discount Code */}
                  <div className="discount-box input-group mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Discount code or gift card"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      disabled
                    >
                      Apply
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="d-flex justify-content-between mb-2">
                    <div className="text-gray">Subtotal</div>
                    <div>${subtotal.toFixed(2)}</div>
                  </div>

                  {/* Shipping */}
                  <div className="d-flex justify-content-between mb-3">
                    <div className="text-gray">
                      Shipping{" "}
                      <span title="Shipping will be calculated after entering address">
                        ❔
                      </span>
                    </div>
                    <div className="text-gray">Enter shipping address</div>
                  </div>

                  {/* Total */}
                  <div className="d-flex justify-content-between align-items-center border-top pt-3">
                    <div>
                      <strong>Total</strong>
                    </div>
                    <div>
                      <span className="currency">USD</span>{" "}
                      <span className="total-price">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
