import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ExclusiveOffers = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const offers = [
    { img: 'images/natural.webp', label: 'natural diamonds' },
    { img: 'images/BRACELETS.webp', label: 'bracelets' },
    { img: 'images/STUDS.webp', label: 'studs earrings' },
    { img: 'images/ETERNITY.webp', label: 'eternity rings' },
    { img: 'images/annivarsary.webp', label: 'anniversary band' },
    { img: 'images/lab.webp', label: 'lab diamonds' }
  ];

  return (
    <section className="Exclusive_Offers_wrapper my-5 bg-secondary py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12">
            <h2 className="section-header-lg small--text-center  mb-4">
              Exclusive Offers
            </h2>
            <Slider {...settings} className="Exclusive_Offers">
              {offers.map((item, index) => (
                <div key={index}>
                  <div className="img-block text-center">
                    <img src={item.img} alt={item.label} className="img-fluid mb-2" />
                    <p className="offer text-uppercase text-white m-0">up to 30% off</p>
                  </div>
                  <p className="text-center text-uppercase  mt-2">{item.label}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveOffers;
