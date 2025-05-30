import React, { useState } from "react";
import "./ClaritySlider.css";

const ClaritySlider = ({clarity, setClarity }) => {
  const clarityLabels = [
    "I3",
    "VVS1",
    "VVS2",
    "VS1",
    "VS2",
    "SI1",

  ];
  const minClarityIndex = 1;
  const maxClarityIndex = clarityLabels.length+1;

  return (
    <div className="clarity-section">
      <div className="clarity-slider-container">
        <label className="clarity-label">BY CLARITY</label>
        <div className="clarity-subTitle">
          <span>Inclusion Visible Under 10x Magnification</span>
          <span>Flawless</span>
        </div>
        <div className="slider-wrapper">
          <div className="slider-track"></div>
          <div
            className="slider-active"
            style={{
              left: `${((clarity[0] - minClarityIndex) / (maxClarityIndex - minClarityIndex)) * 100}%`,
              width: `${((clarity[1] - clarity[0]) / (maxClarityIndex - minClarityIndex)) * 100}%`,
            }}
          ></div>

          <input
            type="range"
            min={minClarityIndex}
            max={maxClarityIndex}
            step={1}
            value={clarity[0]}
            onChange={(e) =>
              setClarity([
                Math.min(Number(e.target.value), clarity[1] - 1),
                clarity[1],
              ])
            }
          />
          <input
            type="range"
            min={minClarityIndex}
            max={maxClarityIndex}
            step={1}
            value={clarity[1]}
            onChange={(e) =>
              setClarity([
                clarity[0],
                Math.max(Number(e.target.value), clarity[0] + 1),
              ])
            }
          />
        </div>

        <div className="clarity-inputs">
          {clarityLabels.map((label, index) => (
            <span key={index} className="clarity-label-item">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClaritySlider;
