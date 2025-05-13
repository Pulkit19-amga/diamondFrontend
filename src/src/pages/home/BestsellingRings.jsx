import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BestsellingRings.css'; // custom styles

const ringData = {
  'ENGAGEMENT RINGS': [
    { image: 'images/product.webp', title: 'Arc Hidden Halo Engagement Ring' },
    { image: 'images/product.webp', title: 'Arc Hidden Halo Engagement Ring' },
    { image: 'images/product.webp', title: 'Arc Hidden Halo Engagement Ring' },
    { image: 'images/product.webp', title: 'Arc Hidden Halo Engagement Ring' },
    { image: 'images/product.webp', title: 'Arc Hidden Halo Engagement Ring' },
    { image: 'images/product.webp', title: 'Arc Hidden Halo Engagement Ring' },
    { image: 'images/product.webp', title: 'Arc Hidden Halo Engagement Ring' },
    { image: 'images/product.webp', title: 'Arc Hidden Halo Engagement Ring' }
  ],
  'ANNIVERSARY RINGS': [
    { image: 'images/product.webp', title: 'Anniversary Diamond Ring' },
    { image: 'images/product.webp', title: 'Anniversary Diamond Ring' },
    { image: 'images/product.webp', title: 'Gold Anniversary Band' },
    { image: 'images/product.webp', title: 'Gold Anniversary Band' },
    { image: 'images/product.webp', title: 'Classic Anniversary Ring' },
    { image: 'images/product.webp', title: 'Classic Anniversary Ring' },
    { image: 'images/product.webp', title: 'Classic Anniversary Ring' },
    { image: 'images/product.webp', title: 'Classic Anniversary Ring' },
  ],
  'ETERNITY RINGS': [
    { image: 'images/product.webp', title: 'Infinity Eternity Ring' },
    { image: 'images/product.webp', title: 'Diamond Eternity Band' },
    { image: 'images/product.webp', title: 'Diamond Eternity Band' },
    { image: 'images/product.webp', title: 'Diamond Eternity Band' },
    { image: 'images/product.webp', title: 'Diamond Eternity Band' },
    { image: 'images/product.webp', title: 'Diamond Eternity Band' },
    { image: 'images/product.webp', title: 'Diamond Eternity Band' },
    { image: 'images/product.webp', title: 'Diamond Eternity Band' }
  ]
};

const BestsellingRings = () => {
  const [activeTab, setActiveTab] = useState('ENGAGEMENT RINGS');

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 600,
    slidesToShow: 6, // ✅ Show 6 items per row
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 },
      },
    ],
  };


  return (
    <section className="exclusive-wrapper">
      <div className="container">
        <h2 className="section-title">Explore Our Bestselling Rings</h2>

        <div className="tab-buttons">
          {Object.keys(ringData).map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${tab === activeTab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <Slider {...settings} className="ring-slider">
          {ringData[activeTab].map((item, index) => (
            <div key={index} className="ring-card">
              <img src={item.image} alt={item.title} className="ring-img" />
              <p className="ring-title">{item.title}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default BestsellingRings;









