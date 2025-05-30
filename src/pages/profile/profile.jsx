import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MyOrders from '../order/myOrders'
import "./profile.css";

const Profile = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout(); 
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLogoutLoading(false);
    }
  };
  return (
    <>
      <section
        className="profile_tab page-my-account"
        style={{ marginTop: "40px", marginBottom: "40px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="account-sidebar p-2">
                <div className="sidebar-top flex-sm align-items_center">
                  <h1 className="text-uppercase" role="heading" aria-level="2">
                    My Account
                  </h1>
                </div>
                <div
                  className="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link active"
                    id="v-pills-order_history"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-order"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-order"
                    aria-selected="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.047"
                      height="17.912"
                      viewBox="0 0 16.047 17.912"
                    >
                      <path
                        d="M701.541,1035.732h-.912a2.239,2.239,0,0,0-2.223,1.977l-1.141,9.7a2.238,2.238,0,0,0,2.223,2.5h11.57a2.238,2.238,0,0,0,2.223-2.5l-1.141-9.7a2.239,2.239,0,0,0-2.224-1.977H709a3.732,3.732,0,1,0-7.463,0Zm5.971,1.493v.746a.746.746,0,0,0,1.493,0v-.746h.911a.747.747,0,0,1,.742.659l1.141,9.7a.746.746,0,0,1-.741.833h-11.57a.746.746,0,0,1-.741-.833l1.141-9.7a.747.747,0,0,1,.741-.659h.912v.746a.746.746,0,0,0,1.493,0v-.746Zm-2.239-3.731a2.239,2.239,0,0,0-2.239,2.239h4.478A2.239,2.239,0,0,0,705.273,1033.493Z"
                        transform="translate(-697.249 -1032)"
                        fill="#1d1b1d"
                        fillRule="evenodd"
                      />
                    </svg>
                    Order History
                  </button>

                  <button
                    className="nav-link"
                    id="v-pills-account_details"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-account"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-account"
                    aria-selected="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17.578"
                      height="17.578"
                      viewBox="0 0 17.578 17.578"
                    >
                      <path
                        d="M1537.039,845.112a2.431,2.431,0,1,0,2.445,2.431A2.438,2.438,0,0,0,1537.039,845.112Zm-8.789,3.927a8.789,8.789,0,1,1,2.609,6.25A8.789,8.789,0,0,1,1528.25,849.039Zm13.934,5.685a5.462,5.462,0,0,0-10.29,0,7.668,7.668,0,0,0,10.29,0Zm-5.145-13.352a7.668,7.668,0,0,0-5.991,12.453,6.583,6.583,0,0,1,3.8-3.478,3.566,3.566,0,1,1,4.382,0,6.582,6.582,0,0,1,3.8,3.478,7.668,7.668,0,0,0-5.991-12.453Z"
                        transform="translate(-1528.25 -840.25)"
                        fill="#1d1b1d"
                        fillRule="evenodd"
                      />
                    </svg>
                    Account Details
                  </button>

                  <button
                    className="nav-link"
                    id="v-pills-view_address"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-address"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-address"
                    aria-selected="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="17.694"
                      viewBox="0 0 13.434 17.694"
                    >
                      <path
                        d="M126.732,1038.717a2.985,2.985,0,1,1,2.985,2.985A2.985,2.985,0,0,1,126.732,1038.717Zm2.985-1.493a1.493,1.493,0,1,0,1.493,1.493A1.492,1.492,0,0,0,129.717,1037.224ZM123,1038.717a6.717,6.717,0,0,1,13.434,0,12.252,12.252,0,0,1-2.364,6.715,22.582,22.582,0,0,1-3.4,3.89,1.413,1.413,0,0,1-1.911,0,22.582,22.582,0,0,1-3.4-3.89A12.252,12.252,0,0,1,123,1038.717Zm6.717-5.224a5.224,5.224,0,0,0-5.224,5.224,10.779,10.779,0,0,0,2.107,5.877,21.142,21.142,0,0,0,3.117,3.58,21.142,21.142,0,0,0,3.117-3.58,10.779,10.779,0,0,0,2.107-5.877A5.224,5.224,0,0,0,129.717,1033.493Z"
                        transform="translate(-123 -1032)"
                        fill="#1d1b1d"
                        fillRule="evenodd"
                      />
                    </svg>
                    View Addresses
                  </button>

                  <button
                    className="nav-link"
                    id="v-pills-financing"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-financing_tab"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-financing_tab"
                    aria-selected="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.047"
                      height="17.912"
                      viewBox="0 0 16.047 17.912"
                    >
                      <path
                        d="M701.541,1035.732h-.912a2.239,2.239,0,0,0-2.223,1.977l-1.141,9.7a2.238,2.238,0,0,0,2.223,2.5h11.57a2.238,2.238,0,0,0,2.223-2.5l-1.141-9.7a2.239,2.239,0,0,0-2.224-1.977H709a3.732,3.732,0,1,0-7.463,0Zm5.971,1.493v.746a.746.746,0,0,0,1.493,0v-.746h.911a.747.747,0,0,1,.742.659l1.141,9.7a.746.746,0,0,1-.741.833h-11.57a.746.746,0,0,1-.741-.833l1.141-9.7a.747.747,0,0,1,.741-.659h.912v.746a.746.746,0,0,0,1.493,0v-.746Zm-2.239-3.731a2.239,2.239,0,0,0-2.239,2.239h4.478A2.239,2.239,0,0,0,705.273,1033.493Z"
                        transform="translate(-697.249 -1032)"
                        fill="#1d1b1d"
                        fillRule="evenodd"
                      />
                    </svg>
                    Financing
                  </button>
                </div>

                <div className="btn-wrapper small--hide">
                  <button className="btn btn-wide" onClick={handleLogout} disabled={logoutLoading}>
                    {logoutLoading ? "Logging out..." : "Log out"}
                  </button>
                </div>
              </div>
            </div>

            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
              <div
                className="tab-content"
                id="v-pills-tabContent"
                style={{ alignItems: "start !important" }}
              >
                <div
                  className="tab-pane fade show active"
                  id="v-pills-order"
                  role="tabpanel"
                  aria-labelledby="v-pills-order_history"
                >
                  <MyOrders />
                </div>

                <div
                  className="tab-pane fade"
                  id="v-pills-account"
                  role="tabpanel"
                  aria-labelledby="v-pills-account_details"
                >
                  <div className="grid__item grid__account-details">
                    <div className="details-header">
                      <h2 className="text-uppercase">Account Details</h2>
                      <p>
                        Here you can view and edit your personal information
                      </p>
                    </div>
                    <div className="customer-info">
                      <ul className="p-0">
                        <li>
                          <span>First Name</span>
                          {user.name}
                        </li>
                        <li>
                          <span>Email</span>
                          {user.email}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="v-pills-address"
                  role="tabpanel"
                  aria-labelledby="v-pills-view_address"
                >
                  <div className="grid__item grid__account-details account-addresses">
                    <div className="details-header">
                      <h2 className="text-uppercase">Your Addresses</h2>
                      <p>Here you can view and add address</p>
                    </div>
                    <div className="customer-addresses">
                      <ul className="grid grid--no-gutters-sm flex flex-wrap addresses-list p-0">
                        <li className="grid__item medium-up--one-third col-default-address">
                          <div className="individual-address-list">
                            <div className="address">
                              <h3 className="default-address">Default</h3>
                              <div className="customer-address">
                                <p>
                                  {user.name}
                                  <br />
                                  United States
                                </p>
                              </div>
                              <div className="btn-wrapper flex">
                                <button
                                  id="EditFormButton_11317482520859"
                                  type="button"
                                  className="btn address-edit-toggle"
                                  data-form-id="11317482520859"
                                  aria-owns="EditAddress_11317482520859"
                                  aria-expanded="false"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add_address"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="btn btn--border address-delete"
                                  data-target="/account/addresses/11317482520859"
                                  data-confirm-message="Are you sure you wish to delete this address?"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>

                        <li className="grid__item medium-up--one-third">
                          <div className="individual-address-list last">
                            <button
                              type="button"
                              className="address-new-toggle text-uppercase"
                              id="AddressNewButton"
                              aria-expanded="false"
                              aria-owns="AddressNewForm"
                              data-bs-toggle="modal"
                              data-bs-target="#add_address"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="9"
                                height="9"
                                viewBox="0 0 9 9"
                              >
                                <g transform="translate(0.5 0.5)">
                                  <line
                                    y2="8"
                                    transform="translate(4)"
                                    stroke="#181a1d"
                                    strokeLinecap="round"
                                    strokeWidth="1"
                                  />
                                  <line
                                    x2="8"
                                    transform="translate(0 4)"
                                    stroke="#181a1d"
                                    strokeLinecap="round"
                                    strokeWidth="1"
                                  />
                                </g>
                              </svg>
                              Add a New Address
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="v-pills-financing_tab"
                  role="tabpanel"
                  aria-labelledby="v-pills-financing"
                >
                  <div className="grid__item grid__account-details">
                    <div className="details-header">
                      <h2 className="text-uppercase">Credit Card</h2>
                    </div>
                    <div className="my-account-financing">
                      <h3>Financing Program</h3>
                      <p>
                        We offers customers a credit card through Synchrony Bank
                        with a revolving credit line to use again and again at
                        withclarity.com.
                      </p>
                      <p>
                        You can apply for a We Store Credit Card{" "}
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="here - open in a new tab"
                        >
                          <b>here</b>
                        </a>
                        . Get a decision instantly.
                      </p>
                      <h3>No interest for 12 Months**</h3>
                      <p>
                        No interest on purchases of $199 or more with your
                        Synchrony Financial credit card. Interest will be
                        charged to your account dated from time of purchase if
                        the full amount is not paid within 12 months. Set
                        minimum monthly payments are required.
                      </p>
                      <h3>How it works</h3>
                      <div className="finance-cart flex-md text-center d-flex">
                        {[
                          {
                            img: "https://cdn.shopify.com/s/files/1/0411/6437/4183/files/small-add.png?v=1683125508",
                            title: "Add to Cart",
                            desc: "Browse jewelry and add to your shopping cart.",
                          },
                          {
                            img: "https://cdn.shopify.com/s/files/1/0411/6437/4183/files/small-secure.png?v=1683125508",
                            title: "Secure Checkout",
                            desc: "At checkout, select We Credit Card as your payment option.",
                          },
                          {
                            img: "https://cdn.shopify.com/s/files/1/0411/6437/4183/files/small-pay.png?v=1683125508",
                            title: "Apply for financing",
                            desc: "Apply for We Credit Card",
                          },
                          {
                            img: "https://cdn.shopify.com/s/files/1/0411/6437/4183/files/small-done.png?v=1683125508",
                            title: "Order Complete",
                            desc: "If approved, use your issued card number to complete your purchase.",
                          },
                        ].map((item, index) => (
                          <div
                            className="col medium-up--one-quarter"
                            key={index}
                          >
                            <img src={item.img} alt={item.title} />
                            <div className="text">
                              <h4>{item.title}</h4>
                              <span>{item.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-center">
                        <a
                          className="btn btn-wide px-5 py-3 text-uppercase"
                          title="Apply Now"
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Apply now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id="add_address"
        tabIndex="-1"
        aria-labelledby="add_addressLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title text-center" id="add_addressLabel">
                Add a New Address
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                {[
                  { placeholder: "First Name" },
                  { placeholder: "Last Name" },
                  { placeholder: "Company" },
                  { placeholder: "Address" },
                  { placeholder: "Apartment, suite, etc." },
                  { placeholder: "City" },
                ].map((field, index) => (
                  <div
                    className="col-lg-6 col-md-6 col-sm-12 col-12"
                    key={index}
                  >
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={field.placeholder}
                      />
                    </div>
                  </div>
                ))}

                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="mb-3">
                    <select className="form-select" aria-label="Select state">
                      <option defaultValue>Alabama</option>
                      <option value="1">Alabama</option>
                      <option value="2">Alabama</option>
                      <option value="3">Alabama</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="mb-3">
                    <select className="form-select" aria-label="Select country">
                      <option defaultValue>United States</option>
                      <option value="1">United States</option>
                      <option value="2">United States</option>
                      <option value="3">United States</option>
                    </select>
                  </div>
                </div>

                {[
                  { placeholder: "Postal/Zip Code" },
                  { placeholder: "Phone" },
                ].map((field, index) => (
                  <div
                    className="col-lg-6 col-md-6 col-sm-12 col-12"
                    key={`extra-${index}`}
                  >
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={field.placeholder}
                      />
                    </div>
                  </div>
                ))}

                <div className="col-12">
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Set as default address
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary btn-wide">
                Add Address
              </button>
              <button type="button" className="btn btn-primary btn-wide">
                Edit Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
