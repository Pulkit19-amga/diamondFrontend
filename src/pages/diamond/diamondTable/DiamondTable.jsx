import React, { useState } from "react";

import "./DiamondTable.css";

const DiamondTable = ({ diamonds, showAdvanced }) => {
  const imageBaseUrl = "images/shapes/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  if (loading) return <div>Loading diamonds...</div>;
  if (error) return <div>{error}</div>;

  const toggleSelect = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="diamond-table">
      <div className="table-header">
        <div>COMPARE</div>
        <div>VIEW</div>
        <div>SHAPE ▾</div>
        <div>CARAT ▾</div>
        <div>COLOR ▾</div>
        <div>CLARITY ▾</div>
        <div>CUT ▾</div>
        <div>REPORT</div>

        {showAdvanced && (
          <>
            <div>POLISH</div>
            <div>SYM.</div>
            <div>FLUOR.</div>
            <div>L/W</div>
            <div>TABLE</div>
            <div> DEPTH</div>
          </>
        )}
        <div>PRICE ▾</div>
        <div></div>
      </div>

      {diamonds.length === 0 ? (
        <div>No diamonds match your filter criteria.</div>
      ) : (
        diamonds.map((diamond, index) => (
          <div
            className={`table-row ${
              selectedRows.includes(index) ? "selected-row" : ""
            }`}
            key={index}
          >
            <div>
              <input
                type="checkbox"
                checked={selectedRows.includes(index)}
                onChange={() => toggleSelect(index)}
              />
            </div>
            <div>
              <img
                src={`${imageBaseUrl}${diamond.shape.image}`} // Constructing the full image URL
                alt={diamond.shape.name}
                className="diamond-img"
              />
            </div>
            <div>{diamond.shape.name}</div>
            <div>{diamond.carat_weight}</div>
            <div>{diamond.color.name}</div>
            <div>{diamond.clarity.name}</div>
            <div>{diamond.cut.full_name}</div>
            <div>{diamond.certificate_company.dl_name}</div>

            {showAdvanced && (
              <>
                <div>{diamond.polish.full_name}</div>
                <div>{diamond.symmetry.full_name}</div>
                <div>{diamond.fluorescence.full_name}</div>
                <div>{diamond.price}</div>
                <div>{diamond.table_diamond}</div>
                <div>{diamond.depth}</div>
              </>
            )}
            <div className="price">{diamond.price}</div>

            <div>
              <button
                className="select-btn"
                
              >
                SELECT
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DiamondTable;
