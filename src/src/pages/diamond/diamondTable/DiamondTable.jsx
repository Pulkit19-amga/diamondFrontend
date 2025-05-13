import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";
import "./DiamondTable.css";

const DiamondTable = ({
  loading,
  diamonds,
  showAdvanced,
  checkedDiamonds,
  onToggleCheck,
}) => {
  const navigate = useNavigate();

  const handleSelect = (diamond) => {
    navigate(`/diamond-details/${diamond.diamondid}`, { state: { diamond } });
  };

  const imageBaseUrl = "images/shapes/";

  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  if (error) return <div>{error}</div>;

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

      {loading ? (
        <Loader />
      ) : diamonds.length === 0 ? (
        <div className="no-diamonds-message">
          No diamonds match your filter criteria.
        </div>
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
                checked={checkedDiamonds.includes(diamond.diamondid)}
                onChange={() => onToggleCheck(diamond.diamondid)}
              />
            </div>
            <div className="diamond-card">
              {diamond.is_superdeal === 1 && (
                <div className="featured-banner">FEATURED DEAL</div>
              )}
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
                
                {diamond.measurement_l != null && diamond.measurement_w > 0
                  ? (diamond.measurement_l / diamond.measurement_w).toFixed(2)
                  : "N/A"}
                <div>{diamond.table_diamond}</div>
                <div>{diamond.depth}</div>
              </>
            )}
            <div className="price">{diamond.price}</div>
            <div>
              <button
                className="select-btn"
                onClick={() => handleSelect(diamond)}
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
