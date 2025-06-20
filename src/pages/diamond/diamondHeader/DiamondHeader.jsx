import React, { useEffect, useState } from "react";
import "./DiamondHeader.css";

const DiamondHeader = ({
  activeTab,
  checkedCount,
  filteredCount,
  totalCount,
  selectedSort,
  setSelectedSort,
  selectedFilter,
  setSelectedFilter,
  onCertificateSearch,
  certificateQuery,
  setCertificateQuery,
  featuredDealChecked,
  setFeaturedDealChecked,
  showOnlyChecked,
  setShowOnlyChecked,
}) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [certificateInput, setCertificateInput] = useState("");

  const filterOptions = ["IGI", "GIA"];
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

  useEffect(() => {
    setCertificateInput(certificateQuery);
  }, [certificateQuery]);

  const handleFilterClick = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const handleSortClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleFilterOptionSelect = (option) => {
    setSelectedFilter(option);
    setShowFilterDropdown(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedSort(option);
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCertificateInput(value);

    // Auto-reset when input is cleared
    if (value.trim() === "") {
      setCertificateQuery("");
      onCertificateSearch("");
    }
  };

  const handleSearchClick = () => {
    const trimmed = certificateInput.trim();
    setCertificateQuery(trimmed);
    onCertificateSearch(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <>
      <div className="diamond-header-wrapper">
        <hr className="top-line" />
        <h2 className="main-heading">
        {activeTab === "lab"
          ? "Showing Lab Diamonds"
          : activeTab === "natural"
          ? "Showing Natural Diamonds"
          : "Showing Color Diamonds"}

          {/* Showing Natural Diamonds */}
          <span className="sub-count">
            ({filteredCount} of {totalCount})
          </span>
        </h2>

        <div className="search-container">
          <label className="search-label">Search by Certificate Number</label>
          <input
            type="text"
            placeholder="#########"
            value={certificateInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="search-input"
          />
          <button className="search-btn" onClick={handleSearchClick}>
            Search
          </button>
        </div>
      </div>

      {/*  filter bar  */}
      <div className="filter-bar">
        <div className="filter-left">
          <label className="checkbox-group">
            <input
              type="checkbox"
              checked={featuredDealChecked}
              onChange={(e) => setFeaturedDealChecked(e.target.checked)}
            />
            <span>
              <strong>Featured Deal Diamonds</strong>
            </span>
          </label>

          <label className="checkbox-group">
            <input
              type="checkbox"
              checked={showOnlyChecked}
              onChange={() => setShowOnlyChecked(!showOnlyChecked)}
            />
            <span>Compare ({checkedCount})</span>
          </label>
        </div>

        <div className="filter-right">
          <span className="filter-label" onClick={handleFilterClick}>
            <strong>FILTER BY</strong>
          </span>
          <span>|</span>
          <span className="filter-text" onClick={handleFilterClick}>
            {selectedFilter || "REPORT"}
            <span className="arrow">{showFilterDropdown ? "▲" : "▼"}</span>
          </span>

          <span className="sort-label sort-text" onClick={handleSortClick}>
            <strong>SORT BY</strong>
          </span>

          <span>|</span>

          <span className="sort-text" onClick={handleSortClick}>
            {selectedSort}
            <span className="arrow">{showDropdown ? "▲" : "▼"}</span>
          </span>

          {/* Filter Dropdown */}
          <div className={`filterDropdown ${showFilterDropdown ? "show" : ""}`}>
            <div
              className={`dropdown-item ${!selectedFilter ? "selected" : ""}`}
              onClick={() => handleFilterOptionSelect(null)}
            >
              All
            </div>
            {filterOptions.map((option, index) => (
              <div
                key={index}
                className={`dropdown-item ${
                  selectedFilter === option ? "selected" : ""
                }`}
                onClick={() => handleFilterOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>

          {/* short Dropdown */}
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
