import React, { useState } from "react";
import "./ClaritySlider.css";

const clarityLabels = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1"];

const ClaritySlider = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(clarityLabels.length - 1);
  const [showMaxLabel, setShowMaxLabel] = useState(false);

  const handleChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (type === "min" && value <= max) setMin(value);
    if (type === "max" && value >= min) setMax(value);
  };

  const trackStyle = {
    left: `${(min / (clarityLabels.length - 1)) * 100}%`,
    width: `${((max - min) / (clarityLabels.length - 1)) * 100}%`,
  };

  return (
    <div className="clarity-slider">
      <h3>Clarity</h3>
      <div className="slider-wrapper">
        {/* Full base track */}
        <div className="track-base" />

        {/* Filled track between min and max */}
        <div className="track-filled" style={trackStyle} />

        {/* Range inputs */}
        <input
          type="range"
          min="0"
          max={clarityLabels.length - 1}
          value={min}
          onChange={(e) => handleChange(e, "min")}
          className="range-input hide-thumb"
        />
        <input
          type="range"
          min="0"
          max={clarityLabels.length - 1}
          value={max}
          onChange={(e) => handleChange(e, "max")}
          onMouseDown={() => setShowMaxLabel(true)}
          onMouseUp={() => setShowMaxLabel(false)}
          className="range-input"
        />

        {/* Label and dot only at max */}
        {showMaxLabel && (
          <div
            className="thumb-label"
            style={{
              left: `calc(${(max / (clarityLabels.length - 1)) * 100}% - 12px)`,
            }}
          >
            {clarityLabels[max]}
          </div>
        )}
        <div
          className="thumb-dot"
          style={{
            left: `calc(${(max / (clarityLabels.length - 1)) * 100}% - 8px)`,
          }}
        />
      </div>

      {/* Labels below */}
      <div className="clarity-labels">
        {clarityLabels.map((label, index) => (
          <div key={index}>{label}</div>
        ))}
      </div>
    </div>
  );
};

export default ClaritySlider;
