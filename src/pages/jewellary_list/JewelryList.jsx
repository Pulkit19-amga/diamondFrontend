import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../../api/axios";
import "./JewelryList.css";

const JewelryList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [activeCategory, setActiveCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const perPage = 20;
  const totalPages = Math.ceil(total / perPage);
  const loaderRef = useRef(null);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [activeMetal, setActiveMetal] = useState("");
  const [mainImage, setMainImage] = useState("assets/images/product.jpg");

  const categories = ["EARRINGS", "BRACELETS", "RINGS", "NECKLACES"];

  const categoryMap = {
    EARRINGS: [
      "Studs",
      "Hoops",
      "Halo",
      "Fashion",
      "Ear Cuffs",
      "Stackable",
      "Gemstone",
      "Luxe",
      "Ready to Ship",
      "Create Your Own",
      "SHOP ALL",
    ],
    BRACELETS: [
      "Tennis",
      "Mixed Shape",
      "Bangle",
      "Bolo",
      "Fashion",
      "Luxe",
      "Ready to Ship",
      "SHOP ALL",
    ],
    RINGS: [
      "Anniversary",
      "Eternity",
      "Stackable",
      "Fashion",
      "Gemstone",
      "Luxe",
      "Ready to Ship",
      "Create Your Own",
      "SHOP ALL",
    ],
    NECKLACES: [
      "Halo",
      "Solitaire",
      "Tennis",
      "Fashion",
      "Gemstone",
      "Luxe",
      "Ready to Ship",
      "Create Your Own",
      "SHOP ALL",
    ],
  };

  const addFilter = (value) => {
    // CASE 1: Main Category Clicked 
    if (categories.includes(value)) {
      // Set the new main category
      setActiveCategory(value);
      setSelectedSubcategory(""); // Clear old subcategory

      // Remove previous main category & its subcategory, then add the new one
      setAppliedFilters((prev) => {
        return prev
          .filter(
            (f) =>
              !categories.includes(f) && // remove old main category
              !Object.values(categoryMap).flat().includes(f) // remove any subcategory
          )
          .concat(value); // add new main category
      });
    }

    // CASE 2: change subcategory only one sub category at a time
    else if (activeCategory && categoryMap[activeCategory]?.includes(value)) {
      setSelectedSubcategory(value);

      // Remove any previous subcategory under the same category
      setAppliedFilters((prev) => {
        return prev
          .filter((f) => !categoryMap[activeCategory].includes(f))
          .concat(value);
      });
    }

    // CASE 3: Other filters
    else {
      setAppliedFilters((prev) => {
        if (!prev.includes(value)) {
          return [...prev, value];
        }
        return prev;
      });
    }
  };


  const removeFilter = (value) => {
    if (categories.includes(value)) {
      // Remove main category and its subcategory
      const subToRemove = selectedSubcategory;
      setActiveCategory("");
      setSelectedSubcategory("");

      setAppliedFilters((prev) =>
        prev.filter((item) => item !== value && item !== subToRemove)
      );
    } else {
      // Remove only the selected subcategory or independent filter
      if (value === selectedSubcategory) {
        setSelectedSubcategory("");
      }

      setAppliedFilters((prev) => prev.filter((item) => item !== value));
    }
  };

  const clearAllFilters = () => {
    setAppliedFilters([]);
    setActiveCategory("");
    setSelectedSubcategory("");
  };

  const handleMetalClick = (metal) => {
    setActiveMetal(metal);
  };

  const productssss = [
    {
      id: 1,
      name: "Classic Round Diamond Four Prong Studs Earrings (F/G SI+)",
      price: "$749",
      originalPrice: "$1,070",
      images: ["product.jpg", "product_model.jpg"],
      discount: "30% OFF",
      readyToShip: true,
    },
    {
      id: 2,
      name: "Elegant Necklace with Rose Gold Finish",
      price: "$899",
      originalPrice: "$1,250",
      images: ["product.jpg", "product_model.jpg"],
      discount: "25% OFF",
      readyToShip: false,
    },
    {
      id: 3,
      name: "18K Gold Hoop Earrings ",
      price: "$1,299",
      originalPrice: "$1,599",
      images: ["product.jpg", "product_model.jpg"],
      discount: "18% OFF",
      readyToShip: true,
    },
    {
      id: 4,
      name: "Men’s Diamond Bracelet",
      price: "$2,099",
      originalPrice: "$2,899",
      images: ["product.jpg", "product_model.jpg"],
      discount: "28% OFF",
      readyToShip: false,
    },
  ];

  const fetchProducts = async ({ page, filters = [] }) => {
    const isInitialLoad = page === 1;
    if (isInitialLoad) setLoading(true);
    else setIsFetchingMore(true);

    try {
      const response = await axiosClient.get("/api/get-all-products", {
        params: { page, perPage, filters: appliedFilters },
      });

      const fetchedProducts = response.data.data || [];
      if (isInitialLoad) {
        setProducts(fetchedProducts);
      } else {
        setProducts((prev) => [...prev, ...fetchedProducts]);
      }

      setTotal(response.data.total || 0);
    } catch (error) {
      console.error("Product fetch failed", error);
    } finally {
      if (isInitialLoad) setLoading(false);
      else setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    setPage(1); // reset page to 1 when filters change
    fetchProducts({ page: 1, filters: appliedFilters });
  }, [appliedFilters]);

  useEffect(() => {
    fetchProducts({ page, filters: appliedFilters });
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isFetchingMore && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [isFetchingMore, totalPages]);

  return (
    <div className="container my-4">
      {/* Filters Top Bar */}
      <div className="d-flex justify-content-between filters-bar">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <strong>FILTERS</strong>
          <span className="filter-divider">|</span>

          {/* Collection */}
          <div className="dropdown">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">
              Collection
            </span>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => addFilter("All Earrings")}
                >
                  All Earrings
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => addFilter("All Necklaces")}
                >
                  All Necklaces
                </button>
              </li>
            </ul>
          </div>

          <span className="filter-divider">|</span>

          {/* Style */}
          <div className="dropdown">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">
              Style
            </span>
            <ul className="dropdown-menu">
              {(categoryMap[activeCategory] || []).map((sub, idx) => (
                <li key={sub + idx}>
                  <button
                    className="dropdown-item"
                    onClick={() => addFilter(sub)}
                  >
                    {sub}
                  </button>
                </li>
              ))}

              <li>
                <button
                  className="dropdown-item"
                  onClick={() => addFilter("Hoops")}
                >
                  Hoops
                </button>
              </li>
            </ul>
          </div>

          <span className="filter-divider">|</span>

          {/* Metal */}
          <div className="dropdown">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">
              Metal
            </span>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => addFilter("Gold")}
                >
                  Gold
                </button>
              </li>
            </ul>
          </div>

          <span className="filter-divider">|</span>

          {/* Price */}
          <div className="dropdown">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">
              Price
            </span>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => addFilter("Under $1000")}
                >
                  Under $1000
                </button>
              </li>
            </ul>
          </div>

          <span className="filter-divider">|</span>

          <div className="form-check d-inline-block">
            <input
              className="form-check-input"
              type="checkbox"
              id="readyToShip"
            />
            <label className="form-check-label" htmlFor="readyToShip">
              Ready to Ship
            </label>
          </div>
        </div>

        <div>
          <strong>SORT BY</strong> |{" "}
          <span className="dropdown-toggle" data-bs-toggle="dropdown">
            Featured
          </span>
        </div>
      </div>

      {/* Category Icons Bar */}
      <div className="categories-bar mt-3">
        {categories.map((cat, index) => (
          <div
            className={`cat-item ${activeCategory === cat ? "active" : ""}`}
            key={cat + index}
            onClick={() => addFilter(cat)}
            style={{ cursor: "pointer" }}
          >
            <img src={`/images/product.webp`} alt={cat} />
            <div>{cat.toUpperCase()}</div>
          </div>
        ))}
      </div>

      {/* Applied Filters */}
      {appliedFilters.length > 0 && (
        <div className="applied-filters-bar mt-3">
          <strong>APPLIED FILTERS</strong>
          <div className="d-flex gap-2 flex-wrap">
            {appliedFilters.map((filter, idx) => (
              <div
                className="filter-tag d-flex align-items-center px-2 py-1"
                key={idx}
              >
                {filter}
                <span
                  className="ms-2 text-danger fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => removeFilter(filter)}
                >
                  &times;
                </span>
              </div>
            ))}
          </div>
          <div className="clear-all ms-3" onClick={clearAllFilters}>
            CLEAR ALL
          </div>
        </div>
      )}

      {/* Product Listing */}
      <h5 className="mt-4">Showing {total} products.</h5>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {loading && <p>Loading products...</p>}
        {products.map((product) => (
          <div className="col" key={product.products_id}>
            <div className="product-card h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex justify-content-between">
                  {product.readyToShip && (
                    <div className="ready-to-ship">READY TO SHIP</div>
                  )}
                  <div className="discount">{product.discount}</div>
                </div>

                <img
                  src={`/images/STUDS.webp`}
                  alt="Product"
                  className="img-fluid my-3"
                />

                {productssss.map((productiii) => (
                  <div className="hover-thumbnails">
                    {productiii.images.map((img, i) => (
                      <img
                        key={i}
                        src={`/images/product.webp`}
                        alt="thumb"
                        onClick={() => setMainImage(`/images/${img}`)}
                      />
                    ))}
                  </div>
                ))}

                <p className="fw-semibold">{product.products_name}</p>

                <div className="metal-options mb-2">
                  {["14K", "14K", "14K", "PT"].map((metal, idx) => (
                    <span
                      key={idx}
                      className={activeMetal === metal ? "active" : ""}
                      onClick={() => handleMetalClick(metal)}
                    >
                      {metal}
                    </span>
                  ))}
                </div>

                <div className="weight-options mb-2">
                  {["1/2", "3/4", "1", "1 1/2", "2", "3", "4"].map((w, idx) => (
                    <button
                      key={idx}
                      className={w === "2" ? "bg-dark text-white" : ""}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              <p className="mt-auto">
                <span className="fw-bold">{product.products_price}</span>
                <span className="original-price">{product.products_price}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div ref={loaderRef}>
        {isFetchingMore && <p>Loading more products...</p>}
      </div>
    </div>
  );
};

export default JewelryList;
