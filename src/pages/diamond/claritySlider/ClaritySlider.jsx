import React, { useState } from "react";
import "./ClaritySlider.css";

const clarityLabels = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1"];

const ClaritySlider = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(clarityLabels.length - 1);

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value <= max) setMin(value);
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= min) setMax(value);
  };

  const trackStyle = {
    left: `${(min / (clarityLabels.length - 1)) * 100}%`,
    width: `${((max - min) / (clarityLabels.length - 1)) * 100}%`,
  };

  const getPosition = (value) =>
    `calc(${(value / (clarityLabels.length - 1)) * 100}% - 8px)`;

  const getLabelPosition = (value) =>
    `calc(${(value / (clarityLabels.length - 1)) * 100}% - 12px)`;

  return (
    <div className="clarity-slider">
      <h3>Clarity</h3>
      <div className="slider-wrapper">
        <div className="track-base" />
        <div className="track-filled" style={trackStyle} />

        {/* Range inputs */}
        <input
          type="range"
          min="0"
          max={clarityLabels.length - 1}
          value={min}
          onChange={handleMinChange}
          className="range-input"
        />
        <input
          type="range"
          min="0"
          max={clarityLabels.length - 1}
          value={max}
          onChange={handleMaxChange}
          className="range-input"
        />

        {/* Min thumb dot & label */}
        <div className="thumb-dot" style={{ left: getPosition(min) }} />
        <div className="thumb-label" style={{ left: getLabelPosition(min) }}>
          {clarityLabels[min]}
        </div>

        {/* Max thumb dot & label */}
        <div className="thumb-dot" style={{ left: getPosition(max) }} />
        <div className="thumb-label" style={{ left: getLabelPosition(max) }}>
          {clarityLabels[max]}
        </div>
      </div>

      <div className="clarity-labels">
        {clarityLabels.map((label, index) => (
          <div key={index}>{label}</div>
        ))}
      </div>
    </div>
  );
};

export default ClaritySlider;
