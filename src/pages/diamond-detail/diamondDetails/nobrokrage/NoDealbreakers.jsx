import React from 'react';
import { FaCreditCard, FaShieldAlt, FaExchangeAlt, FaRing, FaGem } from 'react-icons/fa';
import './NoDealbreakers.css';

const features = [
  { icon: <FaCreditCard />, label: 'EASY FINANCING OPTIONS' },
  { icon: <FaShieldAlt />, label: 'LIFETIME WARRANTY' },
  { icon: <FaExchangeAlt />, label: 'HASSLE FREE RETURNS' },
  { icon: <FaRing />, label: 'FREE RESIZING' },
  { icon: <FaGem />, label: 'CONFLICT FREE DIAMONDS' },
];

const NoDealbreakers = () => {
  return (
    <>
    <img src='/images/discount_banner.jpg' alt='discount- banner' className='discount-banner' />
    <div className="dealbreakers-section">
      <h3 className="dealbreakers-title">NO DEALBREAKERS</h3>
      <div className="dealbreakers-list">
        {features.map((item, index) => (
          <React.Fragment key={index}>
            <div className="dealbreaker-item">
              <div className="dealbreaker-icon">{item.icon}</div>
              <div className="dealbreaker-label">{item.label}</div>
            </div>
            {index < features.length - 1 && <div className="divider" />}
          </React.Fragment>
        ))}
      </div>
    </div>
    </>
  );
};

export default NoDealbreakers;
