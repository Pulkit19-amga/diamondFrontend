import React from "react";
import "./ColorSelect.css";

export default function ColorSlider({ color, setColor }) {
  const colorLabels = ["D", "E", "F", "G", "H"];
  const minColorIndex = 1;
  const maxColorIndex = colorLabels.length+1;

  return (
    <div className="color-section">
      <div className="color-slider-container">
        <label className="color-label">BY COLOR</label>
        <div className="color-subTitle">
          <span>Near Colorless</span>
          <span>Colorless</span>
        </div>
        <div className="slider-wrapper">
          <div className="slider-track"></div>
          <div
            className="slider-active"
            style={{
              left: `${((color[0] - minColorIndex) / (maxColorIndex - minColorIndex)) * 100}%`,
              width: `${((color[1] - color[0]) / (maxColorIndex - minColorIndex)) * 100}%`,
            }}
          ></div>

          <input
            type="range"
            min={minColorIndex}
            max={maxColorIndex}
            step={1}
            value={color[0]}
            onChange={(e) =>
              setColor([
                Math.min(Number(e.target.value), color[1] - 1),
                color[1],
              ])
            }
          />
          <input
            type="range"
            min={minColorIndex}
            max={maxColorIndex}
            step={1}
            value={color[1]}
            onChange={(e) =>
              setColor([
                color[0],
                Math.max(Number(e.target.value), color[0] + 1),
              ])
            }
          />
        </div>

        <div className="color-inputs">
          {colorLabels.map((label, index) => (
            <span key={index} className="color-label-item">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
