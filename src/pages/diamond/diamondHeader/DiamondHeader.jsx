import React from 'react';
import './DiamondHeader.css';

const DiamondHeader = () => {
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
        <input
          type="text"
          placeholder="#########"
          className="search-input"
        />
        <button className="search-btn">Search</button>
      </div>
    </div>

{/*  filter bar  */}

<div className="filter-bar">
<div className="filter-left">
  <label className="checkbox-group">
    <input type="checkbox" />
    <span><strong>Featured Deal Diamonds</strong></span>
  </label>

  <label className="checkbox-group">
    <input type="checkbox" />
    <span>Compare (0)</span>
  </label>
</div>

<div className="filter-right">
  <span><strong>FILTER BY</strong></span>
  <span className="divider">|</span>
  <span className="filter-text">REPORT</span>

  <span className="sort-label"><strong>SORT BY</strong></span>
  <span className="divider">|</span>
  <span className="sort-text">Price (Low to High)</span>
</div>
</div>

</>
  );
};

export default DiamondHeader;
