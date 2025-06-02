
import React, { useState } from "react";

import "./JewelryList.css"; 

const JewelryList = () => {
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [activeMetal, setActiveMetal] = useState("");
  const [mainImage, setMainImage] = useState("assets/images/product.jpg");

  const addFilter = (value) => {
    if (!appliedFilters.includes(value)) {
      setAppliedFilters([...appliedFilters, value]);
    }
  };

  const removeFilter = (value) => {
    setAppliedFilters(appliedFilters.filter((item) => item !== value));
  };

  const clearAllFilters = () => {
    setAppliedFilters([]);
  };

  const handleMetalClick = (metal) => {
    setActiveMetal(metal);
  };


const products = [
  {
    id: 1,
    name: "Classic Round Diamond Four Prong Studs Earrings (F/G SI+)",
    price: "$749",
    originalPrice: "$1,070",
    images: ["product.jpg", "product_model.jpg"],
    discount: "30% OFF",
    readyToShip: true,
  },
  {
    id: 2,
    name: "Elegant Necklace with Rose Gold Finish",
    price: "$899",
    originalPrice: "$1,250",
    images: ["product.jpg", "product_model.jpg"],
    discount: "25% OFF",
    readyToShip: false,
  },
  {
    id: 3,
    name: "18K Gold Hoop Earrings ",
    price: "$1,299",
    originalPrice: "$1,599",
    images: ["product.jpg", "product_model.jpg"],
    discount: "18% OFF",
    readyToShip: true,
  },
  {
    id: 4,
    name: "Men’s Diamond Bracelet",
    price: "$2,099",
    originalPrice: "$2,899",
    images: ["product.jpg", "product_model.jpg"],
    discount: "28% OFF",
    readyToShip: false,
  },
];




  return (
    <div className="container my-4">
      {/* Filters Top Bar */}
      <div className="d-flex justify-content-between filters-bar">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <strong>FILTERS</strong>
          <span className="filter-divider">|</span>

          {/* Collection */}
          <div className="dropdown">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">
              Collection
            </span>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" onClick={() => addFilter("All Earrings")}>All Earrings</button></li>
              <li><button className="dropdown-item" onClick={() => addFilter("All Necklaces")}>All Necklaces</button></li>
            </ul>
          </div>

          <span className="filter-divider">|</span>

          {/* Style */}
          <div className="dropdown">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">Style</span>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" onClick={() => addFilter("Studs")}>Studs</button></li>
              <li><button className="dropdown-item" onClick={() => addFilter("Hoops")}>Hoops</button></li>
            </ul>
          </div>

          <span className="filter-divider">|</span>

          {/* Metal */}
          <div className="dropdown">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">Metal</span>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" onClick={() => addFilter("Gold")}>Gold</button></li>
            </ul>
          </div>

          <span className="filter-divider">|</span>

          {/* Price */}
          <div className="dropdown">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">Price</span>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" onClick={() => addFilter("Under $1000")}>Under $1000</button></li>
            </ul>
          </div>

          <span className="filter-divider">|</span>

          <div className="form-check d-inline-block">
            <input className="form-check-input" type="checkbox" id="readyToShip" />
            <label className="form-check-label" htmlFor="readyToShip">Ready to Ship</label>
          </div>
        </div>

        <div>
          <strong>SORT BY</strong> | <span className="dropdown-toggle" data-bs-toggle="dropdown">Featured</span>
        </div>
      </div>

      {/* Category Icons Bar */}
      <div className="categories-bar mt-3">
        {["earrings", "necklaces", "rings", "bracelets", "earrings", "mens", "studs", "hoops"].map((cat, index) => (
          <div className={`cat-item ${index === 0 ? "active" : ""}`} key={cat + index}>
            <img src={`/images/product.webp`} alt={cat} />
            <div>{cat.toUpperCase().replace("'S", "'S")}</div>
          </div>
        ))}
      </div>

      {/* Applied Filters */}
      {appliedFilters.length > 0 && (
        <div className="applied-filters-bar mt-3">
          <strong>APPLIED FILTERS</strong>
          <div className="d-flex gap-2 flex-wrap">
            {appliedFilters.map((filter, idx) => (
              <div className="filter-tag d-flex align-items-center px-2 py-1" key={idx}>
                {filter}
                <span className="ms-2 text-danger fw-bold" style={{ cursor: "pointer" }} onClick={() => removeFilter(filter)}>&times;</span>
              </div>
            ))}
          </div>
          <div className="clear-all ms-3" onClick={clearAllFilters}>CLEAR ALL</div>
        </div>
      )}

      {/* Product Listing */}
      <h5 className="mt-4">Showing 1931 products.</h5>
<div className="row row-cols-1 row-cols-md-4 g-4">
  {products.map((product, idx) => (
    <div className="col" key={product.id}>
      <div className="product-card h-100 d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between">
            {product.readyToShip && (
              <div className="ready-to-ship">READY TO SHIP</div>
            )}
            <div className="discount">{product.discount}</div>
          </div>

          <img
            src={`/images/STUDS.webp`}
            alt="Product"
            className="img-fluid my-3"
          />

          <div className="hover-thumbnails">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={`/images/product.webp`}
                alt="thumb"
                onClick={() => setMainImage(`/images/${img}`)}
              />
            ))}
          </div>

          <p className="fw-semibold">{product.name}</p>

          <div className="metal-options mb-2">
            {["14K", "14K", "14K", "PT"].map((metal, idx) => (
              <span
                key={idx}
                className={activeMetal === metal ? "active" : ""}
                onClick={() => handleMetalClick(metal)}
              >
                {metal}
              </span>
            ))}
          </div>

          <div className="weight-options mb-2">
            {["1/2", "3/4", "1", "1 1/2", "2", "3", "4"].map((w, idx) => (
              <button
                key={idx}
                className={w === "2" ? "bg-dark text-white" : ""}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-auto">
          <span className="fw-bold">{product.price}</span>
          <span className="original-price">{product.originalPrice}</span>
        </p>
      </div>
    </div>
  ))}
</div>


    </div>
  );
};

export default JewelryList;
