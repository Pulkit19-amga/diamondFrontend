import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../../api/axios";
import debounce from "lodash/debounce";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../diamond/loader";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "./JewelryList.css";

const priceSlugMap = {
  "0-500": "$0 - $500",
  "500-1000": "$500 - $1,000",
  "1000-2000": "$1,000 - $2,000",
  "2000-3000": "$2,000 - $3,000",
  "3000-100000": "$3,000 - $100,000",
};

const priceSlugReverseMap = Object.entries(priceSlugMap).reduce(
  (acc, [slug, label]) => {
    acc[label] = slug;
    return acc;
  },
  {}
);

const priceRanges = Object.values(priceSlugMap);

const JewelryList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 20;
  const [appliedFilters, setAppliedFilters] = useState({});
  const [filtersInitialized, setFiltersInitialized] = useState(false);
  const [activeMetal, setActiveMetal] = useState({});
  const [selectedVariations, setSelectedVariations] = useState({});
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerVideo, setBannerVideo] = useState(null);
  const [styleData, setStyleData] = useState([]);
  const [styleNameToIdMap, setStyleNameToIdMap] = useState({});
  const [collectionData, setCollectionData] = useState([]);
  const [metalTypes, setMetalTypes] = useState([]);
  const [collectionNameToIdMap, setCollectionNameToIdMap] = useState({});
  const [activeFilterSection, setActiveFilterSection] = useState("style");
  const [readyToShip, setReadyToShip] = useState(false);
  const [metalNameToId, setMetalNameToId] = useState({});
  const [metalIdToName, setMetalIdToName] = useState({});

  const loaderRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();

  const toggleFilterSection = (section) => {
    setActiveFilterSection((prev) => (prev === section ? "" : section));
  };

  const updateURLFromFilters = (filters) => {
    const params = new URLSearchParams();
    if (filters.category)
      params.set("category", `category-${filters.category}`);
    if (filters.subcategory)
      params.set("subcategory", `subcategory-${filters.subcategory}`);
    if (filters.menucollection)
      params.set("menucollection", `menucollection-${filters.menucollection}`);
    if (filters.price && priceSlugReverseMap[filters.price]) {
      params.set("price", priceSlugReverseMap[filters.price]);
    }
    if (filters.collection)
      params.set("collection", `collection-${filters.collection}`);
    if (filters.style) params.set("style", `style-${filters.style}`);
    if (filters.ready_to_ship) {
      params.set("ready_to_ship", "true"); // keep it "true"
    }
    if (filters.metal) {
      params.set("metal", encodeURIComponent(filters.metal));
    }
    if (filters.sort) {
      params.set("sort", filters.sort);
    }
    navigate({ search: params.toString() });
  };

  const addFilter = (value) => {
    const updatedFilters = { ...appliedFilters };

    const isPriceValue = priceRanges.includes(value);

    if (isPriceValue) {
      if (updatedFilters.price === value) {
        delete updatedFilters.price; // Deselect price if clicked again
      } else {
        updatedFilters.price = value; // Select new price
      }
    } else if (value.startsWith("category-")) {
      updatedFilters.category = value.split("-")[1];
    } else if (value.startsWith("subcategory-")) {
      updatedFilters.subcategory = value.split("-")[1];
    } else if (value.startsWith("menucollection-")) {
      updatedFilters.menucollection = value.split("-")[1];
    } else if (styleNameToIdMap[value]) {
      if (updatedFilters.style === value) {
        delete updatedFilters.style; // Deselect style if clicked again
      } else {
        updatedFilters.style = value;
      }
    } else if (collectionNameToIdMap[value]) {
      if (appliedFilters.collection === value) {
        delete updatedFilters.collection; // Deselect collection if clicked again
      } else {
        updatedFilters.collection = value;
      }
    } else {
      updatedFilters[value] = true;
    }

    setAppliedFilters(updatedFilters);
    updateURLFromFilters(updatedFilters);
  };

  const handleMetalClick = (metalId) => {
    const metalName = metalIdToName[metalId];
    const updatedFilters = { ...appliedFilters };

    if (updatedFilters.metal === metalName) {
      delete updatedFilters.metal;
    } else {
      updatedFilters.metal = metalName;
    }

    setAppliedFilters(updatedFilters);
    updateURLFromFilters(updatedFilters);
  };

  const handleReadyToShipToggle = () => {
    const newState = !readyToShip;
    setReadyToShip(newState);

    const updated = { ...appliedFilters };
    if (newState) {
      updated.ready_to_ship = true;
    } else {
      delete updated.ready_to_ship;
    }

    setAppliedFilters(updated);
    updateURLFromFilters(updated);
  };

  const handleSortChange = (sortValue) => {
    const updatedFilters = { ...appliedFilters };

    if (sortValue) {
      updatedFilters.sort = sortValue;
    } else {
      delete updatedFilters.sort;
    }

    setAppliedFilters(updatedFilters);
    updateURLFromFilters(updatedFilters);
  };

  const clearAllFilters = () => {
    // Preserve category and subcategory if they exist
    const { category, subcategory, menucollection } = appliedFilters;

    const preservedFilters = {};
    if (category) preservedFilters.category = category;
    if (subcategory) preservedFilters.subcategory = subcategory;
    if (menucollection) preservedFilters.menucollection = menucollection;

    setAppliedFilters(preservedFilters); // Reset others, keep category/subcategory
    setReadyToShip(false);
    // Update URL with preserved filters
    const params = new URLSearchParams();
    if (category) params.set("category", `category-${category}`);
    if (subcategory) params.set("subcategory", `subcategory-${subcategory}`);
    if (menucollection) {
      params.set("menucollection", `menucollection-${menucollection}`);
    }

    navigate({ search: params.toString() });
  };

  const removeFilterByKey = (key) => {
    const updated = { ...appliedFilters };
    delete updated[key];

    if (key === "ready_to_ship") {
      setReadyToShip(false);
    }
    setAppliedFilters(updated);
    updateURLFromFilters(updated);
  };

  const fetchProducts = async ({ page, filters = {} }) => {
    const isInitialLoad = page === 1;
    if (isInitialLoad) setLoading(true);

    const apiFilters = { ...filters };

    // Convert style name to ID
    if (filters.style && styleNameToIdMap[filters.style]) {
      apiFilters.style = styleNameToIdMap[filters.style];
    }

    // Convert collection name to ID
    if (filters.collection && collectionNameToIdMap[filters.collection]) {
      apiFilters.collection = collectionNameToIdMap[filters.collection];
    }

    // Convert price label to slug
    if (filters.price && priceSlugReverseMap[filters.price]) {
      apiFilters.price = priceSlugReverseMap[filters.price];
    }
    // Convert metal name to metal_color_id
    if (filters.metal && metalNameToId[filters.metal]) {
      apiFilters.metal_color_id = metalNameToId[filters.metal];
    }

    try {
      const response = await axiosClient.get(
        `/api/get-all-products/${slug || ""}`,
        {
          params: { page, perPage, ...apiFilters },
        }
      );

      const fetchedProducts = response.data.data || [];
      const totalProducts = parseInt(response.data.totalProducts) || 0;
      const pages = Math.ceil(totalProducts / perPage);

      setBannerImage(response.data.banner_image || null);
      setBannerVideo(response.data.banner_video || null);
      setStyleData(response.data.style_data || []);
      setCollectionData(response.data.collection_data || []);
      setMetalTypes(response.data.metal_types || []);

      const nameToId = {};
      const idToName = {};
      (response.data.metal_types || []).forEach((metal) => {
        nameToId[metal.dmt_name] = metal.dmt_id;
        idToName[metal.dmt_id] = metal.dmt_name;
      });
      setMetalNameToId(nameToId);
      setMetalIdToName(idToName);

      // Build style and collection maps for name-to-ID conversion
      const styleMap = {};
      response.data.style_data?.forEach((style) => {
        styleMap[style.psc_name] = style.psc_id;
      });
      setStyleNameToIdMap(styleMap);

      const collectionMap = {};
      response.data.collection_data?.forEach((collection) => {
        collectionMap[collection.name] = collection.id;
      });
      setCollectionNameToIdMap(collectionMap);

      // Manage metal selection and default variation
      const newSelections = { ...(isInitialLoad ? {} : selectedVariations) };
      const newActiveMetals = { ...(isInitialLoad ? {} : activeMetal) };

      fetchedProducts.forEach((group) => {
        const variationsByMetal = group.metal_variations || {};
        const metalKeys = Object.keys(variationsByMetal);

        if (metalKeys.length === 0) return;

        let selectedMetalId = metalKeys[0];
        let selectedVariationIndex = 0;

        if (filters.sort === "price_asc" || filters.sort === "price_desc") {
          let bestPrice = filters.sort === "price_asc" ? Infinity : -Infinity;

          metalKeys.forEach((metalId) => {
            const variations = variationsByMetal[metalId];

            variations.forEach((variation, index) => {
              if (variation.price != null) {
                const price = parseFloat(variation.price);
                const better =
                  (filters.sort === "price_asc" && price < bestPrice) ||
                  (filters.sort === "price_desc" && price > bestPrice);

                if (better) {
                  bestPrice = price;
                  selectedMetalId = metalId;
                  selectedVariationIndex = index;
                }
              }
            });
          });
        }

        newActiveMetals[group.id] = parseInt(selectedMetalId);
        newSelections[group.id] = selectedVariationIndex;
      });

      // Set state
      setSelectedVariations(newSelections);
      setActiveMetal(newActiveMetals);

      if (isInitialLoad) {
        setProducts(fetchedProducts);
      } else {
        setProducts((prev) => [...prev, ...fetchedProducts]);
      }

      setTotalPages(pages);
      setTotal(totalProducts);
    } catch (error) {
      console.error("Product fetch failed", error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  //  Read filters from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    const subcategoryParam = params.get("subcategory");
    const collectionParam = params.get("collection");
    const styleParam = params.get("style");
    const priceParam = params.get("price");
    const sortParam = params.get("sort");
    const metalParam = params.get("metal");
    const menucollectionParam = params.get("menucollection");

    const filters = {};

    if (categoryParam) {
      const id = parseInt(categoryParam.split("-").pop());
      if (!isNaN(id)) filters.category = id;
    }

    if (subcategoryParam) {
      const id = parseInt(subcategoryParam.split("-").pop());
      if (!isNaN(id)) filters.subcategory = id;
    }

    if (menucollectionParam) {
      const id = parseInt(menucollectionParam.split("-").pop());
      if (!isNaN(id)) filters.menucollection = id;
    }

    if (priceParam && priceSlugMap[priceParam]) {
      filters.price = priceSlugMap[priceParam]; // Reverse lookup: "0-500" → "$0 - $500"
    }

    if (collectionParam) {
      const collectionName = collectionParam.split("-").slice(1).join("-");
      filters.collection = collectionName;
    }

    if (styleParam) {
      const styleName = styleParam.split("-").slice(1).join("-");
      filters.style = styleName;
    }

    if (params.get("ready_to_ship") === "true") {
      filters.ready_to_ship = true;
      setReadyToShip(true);
    }

    if (metalParam) {
      filters.metal = decodeURIComponent(metalParam);
    }
    if (sortParam) filters.sort = sortParam;

    setAppliedFilters(filters);
    setFiltersInitialized(true); //  Mark filters ready
  }, [location.search, slug]);

  useEffect(() => {
    setReadyToShip(!!appliedFilters.ready_to_ship);
  }, [appliedFilters.ready_to_ship]);

  //  Fetch products when filters are ready
  useEffect(() => {
    if (!filtersInitialized) return;
    setPage(1);
    fetchProducts({ page: 1, filters: appliedFilters });
  }, [appliedFilters, filtersInitialized]);

  //  Infinite scroll fetch
  useEffect(() => {
    if (page > 1) fetchProducts({ page, filters: appliedFilters });
  }, [page]);

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
    ([key]) =>
      key !== "category" && key !== "subcategory" && key !== "menucollection"
  );

  return (
    <>
      <section className="hero_section_wrapper">
        <div className="container-fluid p-0 position-relative">
          {bannerVideo ? (
            <video
              className="w-100"
              autoPlay
              muted
              loop
              playsInline
              src={`${import.meta.env.VITE_BACKEND_URL}/storage/${bannerVideo}`}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={
                bannerImage
                  ? `${import.meta.env.VITE_BACKEND_URL}/storage/${bannerImage}`
                  : "https://www.withclarity.com/cdn/shop/files/Women_s_Diamond_Gemstone_Jewelry_1366x.jpg?v=1729163233"
              }
              alt="banner"
              className="img-fluid w-100"
            />
          )}

          {/* <img
            src={
              bannerImage
                ? `${import.meta.env.VITE_BACKEND_URL}/storage/${bannerImage}`
                : "https://www.withclarity.com/cdn/shop/files/Women_s_Diamond_Gemstone_Jewelry_1366x.jpg?v=1729163233"
            }
            alt="banner"
            className="img-fluid w-100"
          /> */}
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
            <div
              onClick={() => toggleFilterSection("collection")}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span>Collection</span>
              <span className="material-symbols-outlined">
                {activeFilterSection === "collection"
                  ? "expand_less"
                  : "expand_more"}
              </span>
            </div>

            <span className="filter-divider">|</span>

            {/* Style */}
            <div
              onClick={() => toggleFilterSection("style")}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span>Style</span>
              <span className="material-symbols-outlined">
                {activeFilterSection === "style"
                  ? "expand_less"
                  : "expand_more"}
              </span>
            </div>

            <span className="filter-divider">|</span>

            {/* Metal */}
            <div
              onClick={() => toggleFilterSection("metal")}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span>Metal</span>
              <span className="material-symbols-outlined">
                {activeFilterSection === "metal"
                  ? "expand_less"
                  : "expand_more"}
              </span>
            </div>

            <span className="filter-divider">|</span>

            {/* Price */}
            <div
              onClick={() => toggleFilterSection("price")}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span>Price</span>
              <span className="material-symbols-outlined">
                {activeFilterSection === "price"
                  ? "expand_less"
                  : "expand_more"}
              </span>
            </div>

            <span className="filter-divider">|</span>

            <div
              className="d-flex align-items-center gap-2"
              style={{ cursor: "pointer" }}
              onClick={handleReadyToShipToggle}
            >
              <span
                className={`ready-to-ship-label ${readyToShip ? "active" : ""}`}
              >
                Ready to Ship
              </span>
              <div
                className="ready-checkbox"
                style={{
                  width: "20px",
                  height: "20px",
                  border: "1px solid #999",
                  backgroundColor: readyToShip ? "#000" : "#fff",
                }}
              ></div>
            </div>
          </div>

          <div className="sort-by-wrapper">
            <label htmlFor="sort-select" className="sort-label">
              <strong>SORT BY</strong>
            </label>
            <span className="filter-divider">|</span>
            <select
              id="sort-select"
              className="sort-dropdown"
              value={appliedFilters.sort || ""}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="">Best Selling</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="date_desc">Date: New to Old</option>
              <option value="date_asc">Date: Old to New</option>
            </select>
          </div>
        </div>

        {activeFilterSection === "collection" && collectionData.length > 0 && (
          <div className="style-scroll-wrapper">
            <div className="collection-icon-bar">
              {collectionData.map((collection) => (
                <div
                  key={collection.id}
                  className={`collection-item ${
                    appliedFilters.collection === collection.name
                      ? "active-style"
                      : ""
                  }`}
                  onClick={() => addFilter(collection.name)}
                >
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/storage/${
                      collection.collection_image
                    }`}
                    alt={collection.name}
                    className="style-img"
                  />
                  <div className="style-name">{collection.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeFilterSection === "style" && styleData.length > 0 && (
          <div className="style-scroll-wrapper">
            <div className="style-icon-bar">
              {styleData.map((style) => (
                <div
                  key={style.psc_id}
                  className={`style-item ${
                    appliedFilters.style === style.psc_name
                      ? "active-style"
                      : ""
                  }`}
                  onClick={() => addFilter(style.psc_name)}
                >
                  <img
                    src={style.image_url}
                    alt={style.psc_name}
                    className="style-img"
                  />
                  <div className="style-name">{style.psc_name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeFilterSection === "metal" && metalTypes.length > 0 && (
          <div className="metal-selector">
            {metalTypes.map((metal) => (
              <div
                key={metal.dmt_id}
                className={`metal-item ${
                  appliedFilters.metal === metal.dmt_name ? "active" : ""
                }`}
                onClick={() => handleMetalClick(metal.dmt_id)}
              >
                <span
                  className="metal-circle"
                  style={{ background: metal.color_code }}
                ></span>
                <span className="metal-label">
                  {metal.dmt_name.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeFilterSection === "price" && (
          <div className="price-scroll-wrapper mt-3">
            <div className="price-filter-bar d-flex gap-3 flex-wrap">
              {priceRanges.map((price) => (
                <div
                  key={price}
                  className={`price-box d-flex align-items-center gap-2 ${
                    appliedFilters.price === price ? "active" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => addFilter(price)}
                >
                  <div
                    className="price-checkbox"
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "1px solid #999",
                      backgroundColor:
                        appliedFilters.price === price ? "#000" : "#fff",
                    }}
                  ></div>
                  <span
                    className={`price-label-jewelry-page ${
                      appliedFilters.price === price ? "active" : ""
                    }`}
                  >
                    {price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <hr />

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
                  {key === "ready_to_ship"
                    ? "Ready to Ship"
                    : `${key}: ${value}`}
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
          {loading && <Loader />}

          {products.map((group) => {
            const metalKeys = Object.keys(group.metal_variations).sort(
              (a, b) => {
                const qualityA =
                  group.metal_variations[a][0]?.metal_color?.quality || "";
                const qualityB =
                  group.metal_variations[b][0]?.metal_color?.quality || "";
                const numA = parseInt(qualityA);
                const numB = parseInt(qualityB);

                if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
                if (!isNaN(numA)) return -1;
                if (!isNaN(numB)) return 1;
                return qualityA.localeCompare(qualityB);
              }
            );

            const currentMetalId = String(
              activeMetal[group.id] ?? metalKeys[0]
            );
            const metalOptions = group.metal_variations[currentMetalId] || [];
            const selectedIndex = selectedVariations[group.id] || 0;
            const selectedVariation = metalOptions[selectedIndex];

            const weights = selectedVariation?.weight || [];
            const image =
              Array.isArray(selectedVariation?.images) &&
              selectedVariation.images.length > 0
                ? `${
                    import.meta.env.VITE_BACKEND_URL
                  }/storage/variation_images${selectedVariation.images[0]}`
                : `${
                    import.meta.env.VITE_BACKEND_URL
                  }/storage/variation_images/No_Image_Available.jpg`;

            const price = selectedVariation?.price || "NA";
            const originalPrice = selectedVariation?.original_price || "";
            const sku = selectedVariation?.sku || "NA";
            const discount = selectedVariation?.discount || "";

            return (
              <div className="col" key={group.id}>
                <div
                  className="h-100 d-flex flex-column"
                  style={{ width: "95%" }}
                >
                  <Link
                    to={`/jewellary-details/${group.product?.id}`}
                    className="text-decoration-none text-dark mt-2"
                  >
                    <div className="product-image-container position-relative shadow">
                      <img
                        src={image}
                        alt="Product"
                        className="product-image-full"
                      />
                      <div className="overlay-text d-flex justify-content-between px-2">
                        <span className="ready-to-ship">
                          {group.product?.ready_to_ship ? "READY TO SHIP" : ""}
                        </span>
                        <span className="discount">{discount}</span>
                      </div>
                    </div>
                    <p className="fw-semibold mb-1 product-variation__title">
                      {group.product?.name || "NA"}
                    </p>
                  </Link>

                  <p className="mb-2">{sku}</p>

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

                  <div className="product-variation__carat-group">
                    <small className="product-variation__carat-title">
                      Total Carat Weight
                    </small>

                    {metalOptions.map((variation, index) => (
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
                        {variation.weight || "NA"}
                      </button>
                    ))}
                  </div>

                  <p className="mt-1">
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

        <div ref={loaderRef}>{isFetchingMore && <Loader />}</div>
      </div>
    </>
  );
};

export default JewelryList;
