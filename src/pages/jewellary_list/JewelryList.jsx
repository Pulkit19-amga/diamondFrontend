import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../../api/axios";
import debounce from "lodash/debounce";
import { Link } from "react-router-dom";
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
  // const totalPages = Math.ceil(total / perPage);
  const loaderRef = useRef(null);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [activeMetal, setActiveMetal] = useState("");
  const [selectedVariations, setSelectedVariations] = useState({});
  const [categories, setCategories] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});

  // const categories = ["EARRINGS", "BRACELETS", "RINGS", "NECKLACES"];

  // const categoryMap = {
  //   EARRINGS: [
  //     "Studs",
  //     "Hoops",
  //     "Halo",
  //     "Fashion",
  //     "Ear Cuffs",
  //     "Stackable",
  //     "Gemstone",
  //     "Luxe",
  //     "Ready to Ship",
  //     "Create Your Own",
  //     "SHOP ALL",
  //   ],
  //   BRACELETS: [
  //     "Tennis",
  //     "Mixed Shape",
  //     "Bangle",
  //     "Bolo",
  //     "Fashion",
  //     "Luxe",
  //     "Ready to Ship",
  //     "SHOP ALL",
  //   ],
  //   RINGS: [
  //     "Anniversary",
  //     "Eternity",
  //     "Stackable",
  //     "Fashion",
  //     "Gemstone",
  //     "Luxe",
  //     "Ready to Ship",
  //     "Create Your Own",
  //     "SHOP ALL",
  //   ],
  //   NECKLACES: [
  //     "Halo",
  //     "Solitaire",
  //     "Tennis",
  //     "Fashion",
  //     "Gemstone",
  //     "Luxe",
  //     "Ready to Ship",
  //     "Create Your Own",
  //     "SHOP ALL",
  //   ],
  // };

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

  useEffect(() => {
    fetch("/api/categories-map")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories); // [{id, name}, ...]
        setCategoryMap(data.categoryMap); // { "EARRINGS": [ {id, name}, ... ] }
      });
  }, []);

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
        console.log("Initial load products:", fetchedProducts);
        setProducts(fetchedProducts);
        const defaultSelections = {};
        fetchedProducts.forEach((group) => {
          if (group.variations?.length > 0) {
            defaultSelections[group.id] = 0;
          }
        });
        setSelectedVariations(defaultSelections);
      } else {
        console.log("second load products:", fetchedProducts);
        setProducts((prev) => [...prev, ...fetchedProducts]);
        const newSelections = {};
        fetchedProducts.forEach((group) => {
          if (group.variations?.length > 0) {
            newSelections[group.id] = 0;
          }
        });
        setSelectedVariations((prev) => ({
          ...prev,
          ...newSelections,
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

  return (
    <>
      <section className="hero_section_wrapper">
        <div classNamee="container-fluid p-0 position-relative">
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

          {products.map((group) => {
            const selectedIndex = selectedVariations[group.id] || 0;
            const selectedVariation = group.variations[selectedIndex];
            const weights = selectedVariation?.weight || [];
            // const image = selectedVariation?.image || "STUDS.webp";
            const image =
              selectedVariation?.images?.length > 0
                ? `${
                    import.meta.env.VITE_BACKEND_URL
                  }/storage/variation_images/${selectedVariation.images[0]}`
                : `${
                    import.meta.env.VITE_BACKEND_URL
                  }/storage/variation_images/No_Image_Available.jpg`;
            const price = selectedVariation?.price || "NA";
            const originalPrice = selectedVariation?.original_price || "";
            const discount = selectedVariation?.discount || "NA";
            const sku = selectedVariation?.sku || "NA";

            return (
              <div className="col" key={group.id}>
                <div className="product-card h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between">
                      <span>
                        {group.product?.ready_to_ship ? "READY TO SHIP" : "NA"}
                      </span>
                      <div className="discount">{discount}</div>
                    </div>

                    <Link
                      to={`/jewellary-details/${group.product?.master_sku}`}
                      className="text-decoration-none text-dark"
                    >
                      <img
                        src={image}
                        alt="Product"
                        className="img-fluid my-3"
                        style={{
                          maxWidth: "250px",
                          maxHeight: "250px",
                          objectFit: "contain",
                          display: "block",
                          margin: "0 auto",
                        }}
                      />
                      <p className="fw-semibold">
                        {group.product?.name || "NA"}
                      </p>
                    </Link>

                    <p>{sku}</p>

                    {/* Metal Variation Buttons */}
                    <div
                      className="product-variation__buttons mb-2"
                      style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                    >
                      {group.variations.map((variation, index) => (
                        <button
                          key={index}
                          className={`product-variation__btn product-variation__btn--color-${
                            index % 4
                          } ${
                            selectedIndex === index
                              ? "product-variation__btn--active"
                              : ""
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
                  </div>

                  {/* Carat Weights */}
                  <div className="product-variation__carat-group">
                    <small className="product-variation__carat-title">
                      Total Carat Weight
                    </small>
                    {weights.length > 0 && (
                      <div className="product-variation__carat-wrap">
                        {weights.map((w, idx) => (
                          <div
                            key={idx}
                            className="product-variation__carat-pill"
                          >
                            {{
                              0.5: "1/2",
                              0.75: "3/4",
                              1.5: "1 1/2",
                            }[w] || w}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price Section */}
                  <p className="mt-auto">
                    <span className="fw-bold">${price}</span>
                    <span className="original-price">{originalPrice}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ✅ Image */}
      <div className="product-image-wrapper">
        <img
          src={`/images/${
            group.variations[selectedVariations[group.id] || 0]?.image ||
            "STUDS.webp"
          }`}
          alt="Product"
          className="product-image"
        />
      </div>

      {/* ✅ Title and SKU Block */}
      <div className="product-text-area">
        <Link
          to={`/jewellary-details/${group.product?.master_sku}`}
          className="text-decoration-none text-dark"
        >
          <p className="product-title">{group.product?.name || "NA"}</p>
        </Link>
        <p className="sku-text">
          {group.variations[selectedVariations[group.id] || 0]?.sku || "NA"}
        </p>
      </div>

      {/* ✅ Variation Buttons */}
      <div className="variation-buttons mb-2">
        {group.variations.map((variation, index) => (
          <button
            key={index}
            onClick={() =>
              setSelectedVariations((prev) => ({
                ...prev,
                [group.id]: index,
              }))
            }
            style={{
              width: "32px",
              height: "32px",
              fontSize: "11px",
              fontWeight: "600",
              borderRadius: "50%",
              backgroundColor: ["#dcdcdc", "#fceebb", "#f9d0cc", "#f2f2f2"][
                index % 4
              ],
              border:
                selectedVariations[group.id] === index
                  ? "2px solid black"
                  : "none",
              color: "#222",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {variation.metal || "14K"}
          </button>
        ))}
      </div>

      <div>
        {/* ✅ Price Section */}
        <p className="mt-auto">
          <span className="fw-bold">
            $
            {group.variations[selectedVariations[group.id] || 0]?.price || "NA"}
          </span>
          <span className="original-price">
            {group.variations[selectedVariations[group.id] || 0]
              ?.original_price || ""}
          </span>
        </p>
      </div>
      <div ref={loaderRef}>
        {isFetchingMore && <p>Loading more products...</p>}
      </div>
    </>
  );
};

export default JewelryList;
