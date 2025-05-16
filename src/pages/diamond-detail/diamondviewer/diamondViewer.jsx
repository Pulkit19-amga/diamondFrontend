import React, { useState } from 'react';
import './DiamondViewer.css';

const DiamondViewer = () => {
  const [selectedView, setSelectedView] = useState('image');

  return (
    <div className="diamond-viewer">
      {/* Main Display */}
      <div className="diamond-main-display">
        {selectedView === 'image' && (
          <img
            src="https://dnadiamond.net/diaImages/Images/896797.jpg"
            alt="Diamond"
            className="diamond-main-img"
          />
        )}
        {selectedView === 'video' && (
          <iframe
            title="Diamond Video"
            className="diamond-main-img"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            allowFullScreen
          ></iframe>
        )}
        {selectedView === 'hand' && (
          <img
            src="https://cdn.shopify.com/s/files/1/0411/6437/4183/files/loose-diamond-hand-large.jpg?v=1681822779"
            alt="On Hand"
            className="diamond-main-img"
          />
        )}
        {selectedView === 'certificate' && (
          <img
            src="https://cdn.shopify.com/s/files/1/0757/8851/7659/files/gia_cert.png?v=123456789"
            alt="Certificate"
            className="diamond-main-img"
          />
        )}
      </div>

      {/* Thumbnail Slider */}
      <div className="diamond-thumbnails">
        <button onClick={() => setSelectedView('image')}>
          <img
            src="https://dnadiamond.net/diaImages/Images/896797.jpg"
            alt="Thumbnail"
            className={`thumb-img ${selectedView === 'image' ? 'active' : ''}`}
          />
        </button>
        <button onClick={() => setSelectedView('video')}>
          <img
            src="https://cdn.shopify.com/s/files/1/0411/6437/4183/files/video_play.png?v=1680007360"
            alt="Video Icon"
            className={`thumb-img ${selectedView === 'video' ? 'active' : ''}`}
          />
        </button>
        <button onClick={() => setSelectedView('hand')}>
          <img
            src="https://cdn.shopify.com/s/files/1/0411/6437/4183/files/loose-diamond-hand-large.jpg?v=1681822779"
            alt="Hand View"
            className={`thumb-img ${selectedView === 'hand' ? 'active' : ''}`}
          />
        </button>
        <button onClick={() => setSelectedView('certificate')}>
          <img
            src="https://cdn.shopify.com/s/files/1/0757/8851/7659/files/GIA_Icon_60d07140-6c0d-4f9d-8321-89b0bd69240a.png?v=1684576576"
            alt="GIA"
            className={`thumb-img ${selectedView === 'certificate' ? 'active' : ''}`}
          />
        </button>
      </div>
    </div>
  );
};

export default DiamondViewer;
