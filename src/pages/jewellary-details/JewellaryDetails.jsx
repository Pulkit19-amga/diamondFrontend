import React, { useState, useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../api/axios';
import './JewellaryDetails.css';
import { useCart } from '../../cart/CartContext';

const protectionPlans = [
  { id: '1-year', label: '1 Year - $79' },
  { id: '2-year', label: '2 Year - $99' },
  {
    id: '3-year',
    label: (
      <>
        3 Year - $159 <br />
        <small className="text-muted">MOST POPULAR</small>
      </>
    )
  }
];



const getImageUrl = (img) => {
  const fallback = `${import.meta.env.VITE_BACKEND_URL}/storage/variation_images/No_Image_Available.jpg`;
  if (!img) return fallback;
  return `${import.meta.env.VITE_BACKEND_URL}/storage/variation_images/${img}`;
};

const JewelryDetailsPage = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedMetalId, setSelectedMetalId] = useState(null);
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('1-year');
  const [activeFeature, setActiveFeature] = useState(null);
const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosClient.get(`/api/product-by-id/${id}`);
        const data = res.data;

        const metalVariationKeys = Object.keys(data.metal_variations);
        const defaultMetalId = metalVariationKeys[0];

        setProduct(data);
        setSelectedMetalId(defaultMetalId);
        setSelectedVariationIndex(0);

        const defaultVariation = data.metal_variations[defaultMetalId][0];

        setMainImage(getImageUrl(defaultVariation?.images?.[0]));

        const allImages = metalVariationKeys.flatMap(metalId =>
          data.metal_variations[metalId].flatMap(variation =>
            variation.images?.map(img => getImageUrl(img))
          )
        );

        const uniqueImages = [...new Set(allImages)];
        setThumbnails(uniqueImages);
      } catch (err) {
        console.error('Failed to fetch product', err);
      }
    };

    fetchProduct();
  }, [id]);

  const toggleFeature = index => {
    setActiveFeature(activeFeature === index ? null : index);
  };

  const handleMetalChange = metalId => {
    setSelectedMetalId(metalId);
    setSelectedVariationIndex(0);
    const variation = product.metal_variations[metalId][0];
    setMainImage(getImageUrl(variation?.images?.[0]));
  };

  const handleCaratChange = index => {
    setSelectedVariationIndex(index);
    const variation = product.metal_variations[selectedMetalId][index];
    setMainImage(getImageUrl(variation?.images?.[0]));
  };

  if (!product) return <div className="container py-5">Loading...</div>;

  const selectedVariation = product.metal_variations[selectedMetalId][selectedVariationIndex];
  const { name, description } = product.product;
  const { price, metal_color, weight, sku: variationSku } = selectedVariation;

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-1 d-flex flex-column align-items-center gap-2 thumbs">
          {thumbnails.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Thumb ${i + 1}`}
              onClick={() => setMainImage(src)}
              style={{
                cursor: 'pointer',
                border: mainImage === src ? '2px solid #000' : '1px solid #ccc',
                padding: '2px',
                width: '60px',
                height: '60px',
                objectFit: 'cover',
                borderRadius: '4px'
              }}
            />
          ))}
        </div>

        <div className="col-md-6 main-image">
          <div className="zoom-container">
            <Zoom>
              <img src={mainImage} alt="Main Product" className="img-fluid w-100 zoomable-image" />
            </Zoom>
          </div>
          <button className="btn btn-outline-dark mt-2">📷 VIRTUAL TRY ON</button>
        </div>

        <div className="col-md-5">
          <h5 className="text-muted">{name}</h5>
          <p>
            <strong>₹{price}</strong> <span className="text-muted">• SKU: {variationSku}</span>
          </p>

          <p className="mb-1">METAL COLOR</p>
          <div className="d-flex mb-3">
            {Object.entries(product.metal_variations).map(([metalId, variations]) => {
              const metal = variations[0].metal_color;
              return (
                <div
                  key={metalId}
                  className={`option-circle ${selectedMetalId === metalId ? 'active' : ''}`}
                  onClick={() => handleMetalChange(metalId)}
                  title={metal.name}
                  style={{ background: metal.hex }}
                >
                  {metal.quality}
                </div>
              );
            })}
          </div>

          <p><strong>Weight:</strong> {weight}g</p>

          <div className="product-variation__carat-group mb-3">
            <small className="product-variation__carat-title">
              Total Carat Weight
            </small>
            <div className="d-flex flex-wrap gap-2 mt-1">
              {product.metal_variations[selectedMetalId].map((variation, index) => (
                <button
                  key={index}
                  className={`product-variation__carat-pill ${
                    selectedVariationIndex === index ? 'active' : ''
                  }`}
                  onClick={() => handleCaratChange(index)}
                >
                  {variation.weight || 'NA'}
                </button>
              ))}
            </div>
          </div>

          <p><strong>Description:</strong></p>
          <div className="bg-light p-2" style={{ whiteSpace: 'pre-wrap' }}>
            {description}
          </div>

          <div className="section-title">ADD CLARITY COMMITMENT PROTECTION PLAN</div>
          <p className="protection-plan">
            Ensure your jewelry lasts a lifetime. <span title="More Info">ℹ️</span>
          </p>
          <div className="d-flex gap-2">
            {protectionPlans.map(plan => (
              <div
                key={plan.id}
                className={`option-btn ${selectedPlan === plan.id ? 'active' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.label}
              </div>
            ))}
          </div>

          <div className="container py-4">
            <div className="mb-4">
<button
  className="btn btn-dark w-100"
  onClick={() => {
    const cartItem = {
      sku: variationSku,               
      name: name,                       
      price: price,                      
      image: mainImage,                 
      weight: weight,                    
      type: 'jewelry',                   
      selectedMetal: selectedMetalId,    
      selectedPlan: selectedPlan         
    };
    addToCart(cartItem);
     navigate("/cart");
  }}
  
>
  ADD TO CART
</button>


              <button className="btn btn-outline-dark w-100 mt-2">VIRTUAL / SHOWROOM APPOINTMENT</button>
              <p className="mt-2 mb-0">
                Ships by <strong>Thurs, June 12</strong> | Track in real time before it ships
              </p>
              <p className="mb-1">
                <span className="text-primary">0% APR</span> or as low as $53/mo with <strong>affirm</strong>. <a href="#">See if you qualify</a>
              </p>
              <p className="mb-2">
                Free Insured Shipping. <a href="#">30 Day Returns.</a>
              </p>
              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-light"><i className="bi bi-envelope"></i> DROP A HINT</button>
                <button className="btn btn-light"><i className="bi bi-telephone"></i> CONTACT US</button>
                <button className="btn btn-light"><i className="bi bi-heart"></i> ADD TO WISHLIST</button>
                <button className="btn btn-light"><i className="bi bi-calendar-event"></i> SCHEDULE APPOINTMENT</button>
              </div>
              <div className="mt-2">
                <span className="me-2">SHARE</span>
                <i className="bi bi-pinterest"></i>
                <i className="bi bi-facebook"></i>
                <i className="bi bi-x"></i>
              </div>
              <div className="bg-light p-2 mt-3">
                <i className="bi bi-gift"></i> Earn 847 Points when you buy this item.
              </div>
            </div>
          </div>
        </div>

        <div className="reviews">
          <h4>Customer Reviews</h4>
          <div className="mb-3">
            <h5 className="mb-0">4.9 <span className="rating-stars">★★★★★</span></h5>
            <small>Based on 17 Reviews</small>
          </div>
          {[90, 8, 2, 0, 0].map((percent, i) => (
            <div className="d-flex align-items-center" key={i}>
              <span className="me-2">{5 - i} Star</span>
              <div className="progress flex-grow-1">
                <div className="progress-bar" style={{ width: `${percent}%` }}></div>
              </div>
            </div>
          ))}

          {["James R.", "Chloe T.", "Daniel S."].map((name, i) => (
            <div className="review-item" key={i}>
              <strong>{name}</strong> <span className="text-success">Verified Buyer</span>
              <br />★★★★★<br />
              {[
                "Love these earrings! The studs are absolutely stunning and catch the light perfectly.",
                "Great sparkle and fit. My second purchase from this site. Love it!",
                "Amazing quality and craftsmanship. Highly recommended."
              ][i]}
            </div>
          ))}
          <div className="text-center mt-3">
            <button className="btn btn-outline-dark">Load More Reviews</button>
          </div>
        </div>

        <div className="features-section row align-items-center mt-5">
          <div className="col-md-6">
            {[
              {
                title: "Gemologist Consultation",
                content: "Our dedicated gemologists offer comprehensive support throughout your diamond selection process..."
              },
              {
                title: "Conflict Free Diamonds",
                content: "We are committed to sourcing diamonds from conflict-free regions..."
              },
              {
                title: "Home Preview",
                content: "Try your favorite designs from the comfort of your home..."
              }
            ].map((feature, i) => (
              <div className="feature-item" key={i}>
                <h5 onClick={() => toggleFeature(i)}>
                  {feature.title} <i className="bi bi-chevron-down"></i>
                </h5>
                <div className={`feature-content ${activeFeature === i ? 'active' : ''}`}>
                  <p>{feature.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-6">
            <div className="ratio ratio-4x3">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Feature Video"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="container py-4">
          <div className="related-products">
            <h4>Related Products</h4>
            <div className="d-flex flex-wrap">
              {[...Array(4)].map((_, i) => (
                <img key={i} src="/assets/images/main.png" className="product-thumb" alt="Related Product" />
              ))}
            </div>
          </div>

          <div className="custom-slider-section">
            <h4>Inspired By Your Browsing History</h4>
            <div className="d-flex flex-wrap">
              {[...Array(4)].map((_, i) => (
                <img key={i} src="/assets/images/main.png" className="product-thumb" alt="Browsing History Product" />
              ))}
            </div>
          </div>

          <div className="custom-slider-section">
            <h4>Top Selling Products</h4>
            <div className="d-flex flex-wrap">
              {[...Array(4)].map((_, i) => (
                <img key={i} src="/assets/images/main.png" className="product-thumb" alt="Top Selling Product" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JewelryDetailsPage;
