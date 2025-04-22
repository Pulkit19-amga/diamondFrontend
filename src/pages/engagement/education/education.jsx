import React ,{ useState,useEffect }  from 'react'

export default function Education() {

    const [activeRing, setActiveRing] = useState("Solitaire");
    const [animateImage, setAnimateImage] = useState(false);
  
    const handleRingClick = (type) => {
      if (type !== activeRing) {
        setActiveRing(type);
        setAnimateImage(true);
      }
    };
  
    useEffect(() => {
      if (animateImage) {
        const timeout = setTimeout(() => setAnimateImage(false), 600);
        return () => clearTimeout(timeout);
      }
    }, [animateImage]);
  
  const [activeTab, setActiveTab] = useState("natural");
 
  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setAnimateImage(true);
    }
  };

  // Remove animation class after 600ms
  useEffect(() => {
    if (animateImage) {
      const timeout = setTimeout(() => setAnimateImage(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [animateImage]);

  const imageClass = `img-fluid transition-image ${animateImage ? 'image-hover' : ''}`;



  return (
    <section className="creste-your-own py-5">
      <div className="container px-5">
        <div className="text-center mb-4">
          <h2 className="section-header">DIAMOND EDUCATION</h2>
          <div className="d-flex justify-content-center gap-4 mt-3">
            <button
              className={`text-uppercase border-0 bg-transparent fw-bold ${
                activeTab === "natural" ? "text-dark" : "text-muted"
              }`}
              onClick={() => handleTabChange("natural")}
            >
              NATURAL DIAMOND
            </button>
            <span className="text-muted">|</span>
            <button
              className={`text-uppercase border-0 bg-transparent fw-bold ${
                activeTab === "lab" ? "text-dark" : "text-muted"
              }`}
              onClick={() => handleTabChange("lab")}
            >
              LAB DIAMOND
            </button>
          </div>
        </div>

        {activeTab === "natural" && (
          <div className="row align-items-center">
            <div className="col-md-6">
              <h3 className="fw-bold mb-3 fst-italic">Natural Diamond</h3>
              <p>
                Natural Diamonds are exquisite gemstones that form deep within the Earth’s mantle under immense pressure and heat over millions of years. These mined diamonds possess unparalleled beauty, durability and rarity. Their unique geological origin and natural formation process make them highly coveted in the world of luxury jewelry. Explore our collection of natural diamonds and adorn yourself with a timeless testament of nature’s brilliance.
              </p>
              <a
                href="#"
                className="btn border border-dark rounded-0 fw-bold mt-3 px-3 py-2"
              >
                Shop Now
              </a>
            </div>
            <div className="col-md-6">
              <img
                src="images/solitaire_540x.webp"
                alt="Natural Diamond"
                className={imageClass}
              />
            </div>
          </div>
        )}

        {activeTab === "lab" && (
          <div className="row align-items-center">
            <div className="col-md-6">
              <h3 className="fw-bold mb-3 fst-italic">Lab Grown Diamond</h3>
              <p>
                Lab-grown diamonds possess the same physical and chemical properties as natural diamonds except they are created through advanced technology that replicate the conditions found in the Earth. Lab-created diamonds offer a sustainable and ethical alternative to mined diamonds. With their exceptional brilliance, durability and affordability, lab diamonds are a popular choice for conscious consumers seeking exquisite jewelry without compromising on quality or environmental impact.
              </p>
              <a
                href="#"
                className="btn border border-dark rounded-0 fw-bold mt-3 px-3 py-2"
              >
                Shop Now
              </a>
            </div>
            <div className="col-md-6">
              <img
                src="images/solitaire_540x.webp"
                alt="Lab Diamond"
                className={imageClass}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

 
