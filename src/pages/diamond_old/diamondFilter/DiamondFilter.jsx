import React, { useState } from "react";
import "./DiamondFilter.css";

const DiamondFilter = ({ price, setPrice, carat, setCarat, cut, setCut }) => {
  const minPrice = 0;
  const maxPrice = 10000;
  const minPriceDifference = 100;

  const minCarat = 0;
  const maxCarat = 20;
  const minCaratDifference = 1;

  const cutLabels = ["Excellent", "Very Good", "Good", "Ideal", "8X"];
  const minCutIndex = 1;
  const maxCutIndex = cutLabels.length + 1;

  const handlePriceChange = (index, value) => {
    const newPrice = [...price];
    newPrice[index] = Number(value);
    // Ensure min is always at least 10 less than max
    if (index === 0 && newPrice[0] > newPrice[1] - minPriceDifference) {
      newPrice[0] = newPrice[1] - minPriceDifference;
    } else if (index === 1 && newPrice[1] < newPrice[0] + minPriceDifference) {
      newPrice[1] = newPrice[0] + minPriceDifference;
    }

    setPrice(newPrice);
  };

  const getPriceTrackStyle = () => {
    const left = ((price[0] - minPrice) / (maxPrice - minPrice)) * 100;
    const right = ((price[1] - minPrice) / (maxPrice - minPrice)) * 100;
    return {
      left: `${left}%`,
      width: `${right - left}%`,
    };
  };

  const handleCaratChange = (index, value) => {
    const newCarat = [...carat];
    newCarat[index] = Number(value);
    // Ensure min is always at least 10 less than max
    if (index === 0 && newCarat[0] > newCarat[1] - minCaratDifference) {
      newCarat[0] = newCarat[1] - minCaratDifference;
    } else if (index === 1 && newCarat[1] < newCarat[0] + minCaratDifference) {
      newCarat[1] = newCarat[0] + minCaratDifference;
    }

    setCarat(newCarat);
  };

  const getCaratTrackStyle = () => {
    const left = ((carat[0] - minCarat) / (maxCarat - minCarat)) * 100;
    const right = ((carat[1] - minCarat) / (maxCarat - minCarat)) * 100;
    return {
      left: `${left}%`,
      width: `${right - left}%`,
    };
  };

  return (
    <div className="filter-section">
      <div className="price-slider-container">
        <label className="price-label">BY PRICE</label>
        <div className="slider-wrapper">
          <div className="slider-track"></div>
          <div className="slider-active" style={getPriceTrackStyle()}></div>

          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={price[0]}
            onChange={(e) => handlePriceChange(0, e.target.value)}
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={price[1]}
            onChange={(e) => handlePriceChange(1, e.target.value)}
          />
        </div>

        <div className="price-inputs">
          <input type="text" value={`$${price[0]}`} readOnly />
          <span>to</span>
          <input type="text" value={`$${price[1]}`} readOnly />
        </div>
      </div>

      {/* carat */}

      <div className="price-slider-container">
        <label className="price-label">BY CARAT</label>
        <div className="slider-wrapper">
          <div className="slider-track"></div>
          <div className="slider-active" style={getCaratTrackStyle()}></div>

          <input
            type="range"
            min={minCarat}
            max={maxCarat}
            value={carat[0]}
            onChange={(e) => handleCaratChange(0, e.target.value)}
          />
          <input
            type="range"
            min={minCarat}
            max={maxCarat}
            value={carat[1]}
            onChange={(e) => handleCaratChange(1, e.target.value)}
          />
        </div>

        <div className="price-inputs">
          <input type="text" value={`${carat[0]} Ct.`} readOnly />
          <span>to</span>
          <input type="text" value={`${carat[1]} Ct.`} readOnly />
        </div>
      </div>

      {/* cut */}

      <div className="price-slider-container">
        <label className="price-label">BY CUT</label>
        <div className="slider-wrapper">
          <div className="slider-track"></div>
          <div
            className="slider-active"
            style={{
              left: `${
                ((cut[0] - minCutIndex) / (maxCutIndex - minCutIndex)) * 100
              }%`,
              width: `${
                ((cut[1] - cut[0]) / (maxCutIndex - minCutIndex)) * 100
              }%`,
            }}
          ></div>

          <input
            type="range"
            min={minCutIndex}
            max={maxCutIndex}
            step={1}
            value={cut[0]}
            onChange={(e) =>
              setCut([Math.min(Number(e.target.value), cut[1] - 1), cut[1]])
            }
          />
          <input
            type="range"
            min={minCutIndex}
            max={maxCutIndex}
            step={1}
            value={cut[1]}
            onChange={(e) =>
              setCut([cut[0], Math.max(Number(e.target.value), cut[0] + 1)])
            }
          />
        </div>

        <div className="price-inputs">
          {cutLabels.map((label, index) => (
            <span key={index} className="cut-label-item">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiamondFilter;
