import React from 'react';
import './DiamondTable.css';

const diamonds = [
  {
    shape: 'Round',
    carat: '0.33',
    color: 'J',
    clarity: 'SI1',
    cut: 'Very Good',
    report: 'GIA',
    price: '$199',
    image: '/images/shapes/round.jpg',
  },
  {
    shape: 'Round',
    carat: '0.31',
    color: 'K',
    clarity: 'VVS1',
    cut: 'Excellent',
    report: 'GIA',
    price: '$208',
    image: '/images/shapes/round.jpg',
  },
  {
    shape: 'Emerald',
    carat: '0.44',
    color: 'K',
    clarity: 'IF',
    cut: 'Excellent',
    report: 'GIA',
    price: '$215',
    image: '/images/shapes/emerald.jpg',
  },
  {
    shape: 'Round',
    carat: '0.3',
    color: 'K',
    clarity: 'VVS1',
    cut: 'Excellent',
    report: 'GIA',
    price: '$234',
    image: '/images/shapes/round.jpg',
  },
  {
    shape: 'Round',
    carat: '0.31',
    color: 'j',
    clarity: 'SI1',
    cut: 'Excellent',
    report: 'GIA',
    price: '$238',
    image: '/images/shapes/round.jpg',
  },
  {
    shape: 'Round',
    carat: '0.3',
    color: 'j',
    clarity: 'VVS1',
    cut: 'Excellent',
    report: 'GIA',
    price: '$238',
    image: '/images/shapes/round.jpg',
  },
  {
    shape: 'Round',
    carat: '0.3',
    color: 'j',
    clarity: 'VVS1',
    cut: 'Excellent',
    report: 'GIA',
    price: '$251',
    image: '/images/shapes/round.jpg',
  },
  {
    shape: 'Round',
    carat: '0.3',
    color: 'j',
    clarity: 'VVS2',
    cut: 'Excellent',
    report: 'GIA',
    price: '$252',
    image: '/images/shapes/round.jpg',
  },
  {
    shape: 'Emerald',
    carat: '0.31',
    color: 'J',
    clarity: 'VS1',
    cut: 'Excellent',
    report: 'GIA',
    price: '$258',
    image: '/images/shapes/emerald.jpg',
  },
];

const DiamondTable = () => {
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

      {diamonds.map((diamond, index) => (
        <div className="table-row" key={index}>
          <div><input type="checkbox" /></div>
          <div><img src={diamond.image} alt="diamond" className="diamond-img" /></div>
          <div><a href="#">{diamond.shape}</a></div>
          <div><a href="#">{diamond.carat}</a></div>
          <div><a href="#">{diamond.color}</a></div>
          <div><a href="#">{diamond.clarity}</a></div>
          <div><a href="#">{diamond.cut}</a></div>
          <div><a href="#">{diamond.report}</a></div>
          <div className="price">{diamond.price}</div>
          <div><a href="#" className="select-link">SELECT</a></div>
        </div>
      ))}
    </div>
  );
};

export default DiamondTable;
