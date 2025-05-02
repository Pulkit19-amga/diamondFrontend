import React from "react";
import "./FilterActions.css";

const FilterActions = () => {
  return (
    <div className="filter-container">
      <div className="left-buttons">
        <button className="wide-button">Show advanced</button>
        <button className="wide-button">Reset filters</button>
      </div>
      <div className="apply-wrapper">
        <button className="apply-button">
          <span>Apply</span>
          <br />
          <span>filters</span>
        </button>
      </div>
    </div>
  );
};

export default FilterActions;
