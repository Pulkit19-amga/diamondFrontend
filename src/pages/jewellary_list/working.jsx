import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../../api/axios";
import debounce from "lodash/debounce";
import { Link, useLocation } from "react-router-dom";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "./JewelryList.css";

const JewelryList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const perPage = 20;
  const loaderRef = useRef(null);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [activeMetal, setActiveMetal] = useState({});
  const [selectedVariations, setSelectedVariations] = useState({});
  const location = useLocation();

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
    // CASE 1: Main Category
    if (categories.includes(value)) {
      setActiveCategory(value);
      setSelectedSubcategory("");

      // Simulate mapping category name to ID if you have it
      const categoryId = categoryMapIds[value] || null;

      setAppliedFilters((prev) => ({
        ...prev,
        category: categoryId,
        subcategory: undefined, // Clear old subcategory
      }));
    }

    // CASE 2: Subcategory
    else if (activeCategory && categoryMap[activeCategory]?.includes(value)) {
      const subId = categoryMapIds[value] || null;

      setSelectedSubcategory(value);
      setAppliedFilters((prev) => ({
        ...prev,
        subcategory: subId,
      }));
    }

    // CASE 3: Price Filter
    else if (value === "Under $1000") {
      setAppliedFilters((prev) => ({
        ...prev,
        price: "under-1000",
      }));
    }

    // CASE 4: Other (extend as needed)
    else {
      setAppliedFilters((prev) => ({
        ...prev,
        [value]: true,
      }));
    }
  };

  const clearAllFilters = () => {
    setAppliedFilters({});
    setActiveCategory("");
    setSelectedSubcategory("");
  };

  const removeFilterByKey = (key) => {
    setAppliedFilters((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const handleMetalClick = (metal) => {
    setActiveMetal(metal);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    const subcategoryParam = params.get("subcategory");

    const filters = {};

    // Parse category param (e.g., "rings-22")
    if (categoryParam) {
      const id = parseInt(categoryParam.split("-").pop());
      if (!isNaN(id)) {
        filters.category = id;
      }
    }

    // Parse subcategory param (e.g., "halo-5")
    if (subcategoryParam) {
      const id = parseInt(subcategoryParam.split("-").pop());
      if (!isNaN(id)) {
        filters.subcategory = id;
      }
    }
    console.log("Parsed filters from URL:", filters);
    setAppliedFilters(filters);
  }, [location.search]);
  
  const fetchProducts = async ({ page, filters = [] }) => {
    const isInitialLoad = page === 1;

    if (isInitialLoad) {
      setLoading(true);
    }

    try {
      const response = await axiosClient.get("/api/get-all-products", {
        params: { page, perPage, filters },
      });

      const fetchedProducts = response.data.data || [];

      if (isInitialLoad) {
        setProducts(fetchedProducts);

        const defaultSelections = {};
        const defaultActiveMetals = {};

        fetchedProducts.forEach((group) => {
          const variationKeys = Object.keys(group.metal_variations);
          if (variationKeys.length > 0) {
            const randomMetalId =
              variationKeys[Math.floor(Math.random() * variationKeys.length)];
            defaultActiveMetals[group.id] = parseInt(randomMetalId);
            defaultSelections[group.id] = 0; // Always select 1st variation by default
          }
        });

        setSelectedVariations(defaultSelections);
        setActiveMetal(defaultActiveMetals);
      } else {
        console.log("second load products:", fetchedProducts);
        setProducts((prev) => [...prev, ...fetchedProducts]);

        const newSelections = {};
        const newActiveMetals = {};

        fetchedProducts.forEach((group) => {
          const variationKeys = Object.keys(group.metal_variations);
          if (variationKeys.length > 0) {
            const randomMetalId =
              variationKeys[Math.floor(Math.random() * variationKeys.length)];
            newActiveMetals[group.id] = parseInt(randomMetalId);
            newSelections[group.id] = 0;
          }
        });

        setSelectedVariations((prev) => ({
          ...prev,
          ...newSelections,
        }));

        setActiveMetal((prev) => ({
          ...prev,
          ...newActiveMetals,
        }));
      }

      const totalProducts = parseInt(response.data.totalProducts) || 0;
      const pages = Math.ceil(totalProducts / perPage);
      setTotalPages(pages);
      setTotal(totalProducts);
    } catch (error) {
      console.error("Product fetch failed", error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false); // allow next scroll
    }
  };
  // const fetchProducts = async ({ page, filters = [] }) => {
  //   // console.log("Fetching products with filters:", filters);
  //   const isInitialLoad = page === 1;

  //   if (isInitialLoad) {
  //     setLoading(true);
  //   }

  //   try {
  //     const response = await axiosClient.get("/api/get-all-products", {
  //       params: { page, perPage, filters },
  //     });

  //     const fetchedProducts = response.data.data || [];

  //     if (isInitialLoad) {
  //       // console.log("Initial load products:", fetchedProducts);
  //       setProducts(fetchedProducts);

  //       const defaultSelections = {};
  //       fetchedProducts.forEach((group) => {
  //         if (group.variations?.length > 0) {
  //           defaultSelections[group.id] = 0;
  //         }
  //       });
  //       setSelectedVariations(defaultSelections);
  //     } else {
  //       console.log("second load products:", fetchedProducts);
  //       setProducts((prev) => [...prev, ...fetchedProducts]);
  //       const newSelections = {};
  //       fetchedProducts.forEach((group) => {
  //         if (group.variations?.length > 0) {
  //           newSelections[group.id] = 0;
  //         }
  //       });
  //       setSelectedVariations((prev) => ({
  //         ...prev,
  //         ...newSelections,
  //       }));
  //     }

  //     const totalProducts = parseInt(response.data.totalProducts) || 0;
  //     const pages = Math.ceil(totalProducts / perPage);
  //     setTotalPages(pages);
  //     setTotal(totalProducts);
  //   } catch (error) {
  //     console.error("Product fetch failed", error);
  //   } finally {
  //     setLoading(false);
  //     setIsFetchingMore(false); // allow next scroll
  //   }
  // };

  // Apply filter - reset to page 1
  useEffect(() => {
    setPage(1);
    fetchProducts({ page: 1, filters: appliedFilters });
  }, [appliedFilters]);

  // Page change - load more
  useEffect(() => {
    if (page > 1) {
      fetchProducts({ page, filters: appliedFilters });
    }
  }, [page]);

  // Intersection Observer
  useEffect(() => {
    const handleIntersection = debounce(() => {
      setIsFetchingMore(true);
      setPage((prev) => prev + 1);
    }, 300);
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (
          first.isIntersecting &&
          !isFetchingMore &&
          page < totalPages &&
          !loading
        ) {
          handleIntersection();
        }
      },
      { threshold: 1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [isFetchingMore, totalPages, page, loading]);

  const visibleFilters = Object.entries(appliedFilters).filter(
    ([key]) => key !== "category" && key !== "subcategory"
  );

  return (
    <>
      <section className="hero_section_wrapper">
        <div className="container-fluid p-0 position-relative">
          <img
            src="https://www.withclarity.com/cdn/shop/files/Women_s_Diamond_Gemstone_Jewelry_1366x.jpg?v=1729163233"
            alt=""
            className="img-fluid w-100"
          />
          <div className="wrapper position-absolute text-center w-100 mb-5">
            <h2 className="fs-1 slide-title text-white">
              ENGAGEMENT RING EDUCATION
            </h2>
            <div className="content">
              <p className="text-white">
                Learn about engagement ring setting styles, metal options, ring
                sizing and more.
              </p>
            </div>
            <div className="slide-btn-wrapper justify-content-center align-items-center gap-5">
              <a
                title="SHOP ENGAGEMENT RINGS"
                href="#"
                className="text-white btn border-button border my-2 p-2 rounded-0 fw-bold border-white"
              >
                SHOP ENGAGEMENT RINGS
              </a>
            </div>
          </div>
        </div>
      </section>

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
        {visibleFilters.length > 0 && (
          <div className="applied-filters-bar mt-3">
            <strong>APPLIED FILTERS</strong>
            <div className="d-flex gap-2 flex-wrap">
              {visibleFilters.map(([key, value], idx) => (
                <div
                  className="filter-tag d-flex align-items-center px-2 py-1"
                  key={idx}
                >
                  {key}: {value}
                  <span
                    className="ms-2 text-danger fw-bold"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeFilterByKey(key)}
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

          {products.map((group) => {
            const metalKeys = Object.keys(group.metal_variations);
            const currentMetalId = String(
              activeMetal[group.id] ?? metalKeys[0]
            );
            const metalOptions = group.metal_variations[currentMetalId] || [];
            const selectedIndex = selectedVariations[group.id] || 0;
            const selectedVariation = metalOptions[selectedIndex];

            const weights = selectedVariation?.weight || [];
            const image =
              selectedVariation?.images?.length > 0
                ? `${import.meta.env.VITE_BACKEND_URL}/storage/${
                    selectedVariation.images[0]
                  }`
                : `${
                    import.meta.env.VITE_BACKEND_URL
                  }/storage/variation_images/No_Image_Available.jpg`;
            const price = selectedVariation?.price || "NA";
            const originalPrice = selectedVariation?.original_price || "";
            const sku = selectedVariation?.sku || "NA";
            const discount = selectedVariation?.discount || "";

            return (
              <div className="col" key={group.id}>
                <div className="h-100 d-flex flex-column">
                  {/* IMAGE WITH OVERLAY TEXT */}
                  <div className="product-image-container position-relative shadow">
                    <img
                      src={image}
                      alt="Product"
                      className="product-image-full"
                    />

                    {/* Overlay Text */}
                    <div className="overlay-text d-flex justify-content-between px-2">
                      <span className="ready-to-ship">
                        {group.product?.ready_to_ship ? "READY TO SHIP" : ""}
                      </span>
                      <span className="discount">{discount}</span>
                    </div>
                  </div>

                  {/* PRODUCT NAME */}
                  <Link
                    to={`/jewellary-details/${group.product?.master_sku}`}
                    className="text-decoration-none text-dark mt-2"
                  >
                    <p className="fw-semibold mb-1 product-variation__title">
                      {group.product?.name || "NA"}
                    </p>
                  </Link>

                  <p className="mb-2">{sku}</p>

                  {/* Metal Variation Buttons */}

                  <div className="product-metal__buttons mb-2 d-flex gap-1 flex-wrap">
                    {metalKeys.map((metalId) => {
                      const metal =
                        group.metal_variations[metalId][0]?.metal_color;
                      return (
                        <button
                          key={metalId}
                          className="product-variation__btn"
                          style={{
                            background: metal?.hex,
                            border: `1px solid ${
                              String(activeMetal[group.id]) === String(metalId)
                                ? "#000"
                                : "#ccc"
                            }`,
                            color: "#000",
                          }}
                          // title={metal?.quality}
                          onClick={() => {
                            setActiveMetal((prev) => ({
                              ...prev,
                              [group.id]: metalId,
                            }));
                            setSelectedVariations((prev) => ({
                              ...prev,
                              [group.id]: 0,
                            }));
                          }}
                        >
                          {metal?.quality}
                        </button>
                      );
                    })}
                  </div>

                  {/* Carat Weights */}
                  <div className="product-variation__carat-group">
                    <small className="product-variation__carat-title">
                      Total Carat Weight
                    </small>

                    {metalOptions.length > 1 &&
                      metalOptions.map((variation, index) => (
                        <button
                          key={index}
                          className={`product-variation__carat-pill ${
                            selectedIndex === index ? "active" : ""
                          }`}
                          onClick={() =>
                            setSelectedVariations((prev) => ({
                              ...prev,
                              [group.id]: index,
                            }))
                          }
                        >
                          {variation.carat || "NA"}
                        </button>
                      ))}
                  </div>

                  {/* Price Section */}
                  <p className="mt-auto">
                    <span className="fw-bold">${price}</span>
                    {originalPrice && (
                      <span className="original-price text-muted text-decoration-line-through ms-2">
                        ${originalPrice}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div ref={loaderRef}>
          {isFetchingMore && <p>Loading more products...</p>}
        </div>
      </div>
    </>
  );
};

export default JewelryList;
