import React, { useState } from "react";
import "./DiamondFilter.css";

const DiamondFilter = () => {
  const [price, setPrice] = useState([0, 60]);
  const [carat, setCarat] = useState([100, 500]);
  const [cut, setCut] = useState([0, 75]);

  const handleRangeChange = (e, index, state, setState) => {
    const value = Number(e.target.value);
    let newValue = [...state];
    newValue[index] = value;
    newValue.sort((a, b) => a - b); // Ensure correct order
    setState(newValue);
  };

  const createTrackStyle = (min, max, values) => {
    const percent1 = ((values[0] - min) / (max - min)) * 100;
    const percent2 = ((values[1] - min) / (max - min)) * 100;
    return {
      left: `${percent1}%`,
      width: `${percent2 - percent1}%`,
    };
  };

  const colorLabels = ["FDY", "FLBY", "FBEY", "LY", "FLFY", "FY", "FVY"];
  const cutLabels = ["Good", "Very Good", "Ideal", "True Hearts"];

  // Add z-index logic for overlapping thumbs
  const getZIndex = (val, min, max) => (val === min ? 5 : 4);

  return (
    <div className="filter-container">
      {/* Price */}
      <div className="filter-section">
        <label className="filter-label">By Price</label>
        <div className="slider-wrapper">
          <div className="slider-track"></div>
          <div
            className="slider-active"
            style={createTrackStyle(0, 60, price)}
          ></div>
          <input
            type="range"
            min="0"
            max="60"
            step="10"
            value={price[0]}
            onChange={(e) => handleRangeChange(e, 0, price, setPrice)}
            style={{ zIndex: getZIndex(price[0], 0, 60) }}
          />
          <input
            type="range"
            min="0"
            max="60"
            step="10"
            value={price[1]}
            onChange={(e) => handleRangeChange(e, 1, price, setPrice)}
            style={{ zIndex: getZIndex(price[1], 0, 60) }}
          />
        </div>
        {/* <div className="slider-wrapper">
          <div className="slider-track"></div>
            <div
              className="slider-active"
              style={{
                left: `${(price[0] / 60) * 100}%`,
                width: `${((price[1] - price[0]) / 60) * 100}%`,
              }}
            ></div>

            <input
              type="range"
              min="0"
              max="60"
              step="1"
              value={price[0]}
              onChange={(e) => handleRangeChange(e, 0)}
              className="thumb thumb-left"
              style={{ zIndex: price[0] > 50 ? '5' : '3' }}
            />
            <input
              type="range"
              min="0"
              max="60"
              step="1"
              value={price[1]}
              onChange={(e) => handleRangeChange(e, 1)}
              className="thumb thumb-right"
            />
        </div> */}
        
        <div className="slider-labels">
          {colorLabels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>
        <div className="range-inputs">
          <input type="text" readOnly value={colorLabels[price[0] / 10]} />
          <span className="to-label">to</span>
          <input type="text" readOnly value={colorLabels[price[1] / 10]} />
        </div>
      </div>

      {/* Carat */}
      <div className="filter-section">
        <label className="filter-label">Carat</label>
        <div className="slider-wrapper">
          <div className="slider-track"></div>
          <div
            className="slider-active"
            style={createTrackStyle(100, 500, carat)}
          ></div>
          <input
            type="range"
            min="100"
            max="500"
            step="100"
            value={carat[0]}
            onChange={(e) => handleRangeChange(e, 0, carat, setCarat)}
            style={{ zIndex: getZIndex(carat[0], 100, 500) }}
          />
          <input
            type="range"
            min="100"
            max="500"
            step="100"
            value={carat[1]}
            onChange={(e) => handleRangeChange(e, 1, carat, setCarat)}
            style={{ zIndex: getZIndex(carat[1], 100, 500) }}
          />
        </div>
        <div className="slider-labels">
          {[100, 200, 300, 400, 500].map((val, i) => (
            <span key={i}>{val}</span>
          ))}
        </div>
        <div className="range-inputs">
          <input type="text" readOnly value={carat[0]} />
          <span className="to-label">to</span>
          <input type="text" readOnly value={carat[1]} />
        </div>
      </div>

      {/* Cut */}
      <div className="filter-section">
        <label className="filter-label">Cut</label>
        <div className="slider-wrapper">
          <div className="slider-track"></div>
          <div
            className="slider-active"
            style={createTrackStyle(0, 75, cut)}
          ></div>
          <input
            type="range"
            min="0"
            max="75"
            step="25"
            value={cut[0]}
            onChange={(e) => handleRangeChange(e, 0, cut, setCut)}
            style={{ zIndex: getZIndex(cut[0], 0, 75) }}
          />
          <input
            type="range"
            min="0"
            max="75"
            step="25"
            value={cut[1]}
            onChange={(e) => handleRangeChange(e, 1, cut, setCut)}
            style={{ zIndex: getZIndex(cut[1], 0, 75) }}
          />
        </div>
        <div className="slider-labels">
          {cutLabels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>
        <div className="range-inputs">
          <input type="text" readOnly value={cutLabels[cut[0] / 25]} />
          <span className="to-label">to</span>
          <input type="text" readOnly value={cutLabels[cut[1] / 25]} />
        </div>
      </div>
    </div>
  );
};

export default DiamondFilter;
