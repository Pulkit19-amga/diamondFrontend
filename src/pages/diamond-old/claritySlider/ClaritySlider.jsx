import React, { useState } from "react";
import "./ClaritySlider.css";

const clarityLabels = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I!"];

const ClaritySlider = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(clarityLabels.length - 1);

  const handleMinChange = (e) => {
    const val = parseInt(e.target.value);
    if (val < maxValue) setMinValue(val);
  };

  const handleMaxChange = (e) => {
    const val = parseInt(e.target.value);
    if (val > minValue) setMaxValue(val);
  };

  const getPercent = (val) => (val / (clarityLabels.length - 1)) * 100;
  const getLabel = (val) => clarityLabels[val];

  return (
    <div className="clarity-slider">
      <h3>Clarity</h3>
      <div className="clarity-scroll-wrapper">
        <div className="clarity-slider-inner">
          <div className="track-base" />
          <div
            className="track-filled"
            style={{
              left: `${getPercent(minValue)}%`,
              width: `${getPercent(maxValue - minValue)}%`,
            }}
          />
          {/* Thumbs */}
          <div
            className="thumb-dot"
            style={{ left: `calc(${getPercent(minValue)}% - 8px)` }}
          />
          <div
            className="thumb-label"
            style={{ left: `calc(${getPercent(minValue)}% - 12px)` }}
          >
            {getLabel(minValue)}
          </div>
          <div
            className="thumb-dot"
            style={{ left: `calc(${getPercent(maxValue)}% - 8px)` }}
          />
          <div
            className="thumb-label"
            style={{ left: `calc(${getPercent(maxValue)}% - 12px)` }}
          >
            {getLabel(maxValue)}
          </div>

          {/* Range Inputs */}
          <input
            type="range"
            min="0"
            max={clarityLabels.length - 1}
            value={minValue}
            onChange={handleMinChange}
            className="range-input range-min"
          />
          <input
            type="range"
            min="0"
            max={clarityLabels.length - 1}
            value={maxValue}
            onChange={handleMaxChange}
            className="range-input range-max"
          />
        </div>

        <div className="clarity-labels">
          {clarityLabels.map((label, i) => (
            <div key={i}>{label}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClaritySlider;
