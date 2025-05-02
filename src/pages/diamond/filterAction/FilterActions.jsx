import React from "react";
import "./FilterActions.css";

const FilterActions = ({ onReset }) => {
  return (
    <div className="filter-btn">
      <div className="left-buttons">
        <button className="custom-btn outlined">SHOW ADVANCED</button>
        <button className="custom-btn outlined" onClick={onReset}>RESET FILTERS</button>
      </div>
    </div>
  );
};

export default FilterActions;
