import React, { useState } from "react";
import "./DiamondHeader.css";

const DiamondHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Price (Low to High)");

  const handleSortClick = () => {
    setShowDropdown(!showDropdown);
  };

  const sortOptions = [
    "Price (Low to High)",
    "Price (High to Low)",
    "Carat (Low to High)",
    "Carat (High to Low)",
    "Color (Low to High)",
    "Color (High to Low)",
    "Clarity (Low to High)",
    "Clarity (High to Low)",
    "Cut (Low to High)",
    "Cut (High to Low)",
  ];

  const handleOptionSelect = (option) => {
    setSelectedSort(option);
    setShowDropdown(false);
  };

  return (
    <>
      <div className="diamond-header-wrapper">
        <hr className="top-line" />
        <h2 className="main-heading">
          Showing Natural Diamonds
          <span className="sub-count"> (44,777 of 56,166)</span>
        </h2>
        <div className="search-container">
          <label className="search-label">Search by Certificate Number</label>
          <input type="text" placeholder="#########" className="search-input" />
          <button className="search-btn">Search</button>
        </div>
      </div>

      {/*  filter bar  */}

      <div className="filter-bar">
        <div className="filter-left">
          <label className="checkbox-group">
            <input type="checkbox" />
            <span>
              <strong>Featured Deal Diamonds</strong>
            </span>
          </label>

          <label className="checkbox-group">
            <input type="checkbox" />
            <span>Compare (0)</span>
          </label>
        </div>

        <div className="filter-right">
          <span>
            <strong>FILTER BY</strong>
          </span>
          <span className="divider">|</span>
          <span className="filter-text">REPORT</span>

          <span className="sort-label sort-text" onClick={handleSortClick}>
            <strong>SORT BY</strong>
          </span>

          <span className="divider">|</span>

          <span className="sort-text" onClick={handleSortClick}>
            {selectedSort}
            <span className="arrow">{showDropdown ? "▲" : "▼"}</span>
          </span>

          {/* Dropdown */}
          <div className={`dropdown-box ${showDropdown ? "show" : ""}`}>
            {sortOptions.map((option, index) => (
              <div
                key={index}
                className={`dropdown-item ${
                  selectedSort === option ? "selected" : ""
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DiamondHeader;
