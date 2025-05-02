import React from "react";
import "./ColorSelect.css";

const ColorSelect = ({ value, onChange }) => {
  return (
    <div className="color-select-container">
      <label htmlFor="color" className="color-label">Color</label>
      <select
        id="color"
        value={value}
        onChange={onChange}
        className="color-select"
      >
        <option value="">Select a color</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
        <option value="G">G</option>
        <option value="H">H</option>
        <option value="I">I</option>
      </select>
    </div>
  );
};

export default ColorSelect;
