import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DiamondTable.css';


const DiamondTable = ({ diamonds }) => {
  const navigate = useNavigate();
  
  const handleSelect = (diamond) => {
    navigate(`/diamond-details/${diamond.diamondid}`, { state: { diamond } });
  };  
  

  const imageBaseUrl = 'images/shapes/';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) return <div>Loading diamonds...</div>;
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
        <div>PRICE ▾</div>
        <div></div>
      </div>

      {diamonds.length === 0 ? (
        <div>No diamonds match your filter criteria.</div>
      ) : (diamonds.map((diamond, index) => (
        <div className="table-row" key={index}>
          <div><input type="checkbox" /></div>
          <div>

            <img
              src={`${imageBaseUrl}${diamond.shape.image}`}  // Constructing the full image URL
              alt={diamond.shape.name}
              className="diamond-img"
            />
            </div>
          <div><a href="#">{diamond.shape.name}</a></div>
          <div><a href="#">{diamond.carat_weight}</a></div>
          <div><a href="#">{diamond.color.name}</a></div>
          <div><a href="#">{diamond.clarity.name}</a></div>
          <div><a href="#">{diamond.cut}</a></div>
          <div><a href="#">{diamond.certificate_company.dl_name}</a></div>
          <div className="price">{diamond.price}</div>
          <div>
          <button 
  className="select-link" 
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
