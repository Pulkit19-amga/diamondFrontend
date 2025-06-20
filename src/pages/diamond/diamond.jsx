import React, { useEffect, useRef, useState, useCallback } from "react";
import "./index.css";
import axiosClient from "../../api/axios";
import debounce from "lodash.debounce";
import Loader from "./loader/index";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import DiamondFilter from "./diamondFilter/DiamondFilter";
import ColorSelect from "./colorSelect/ColorSelect";
import ClaritySlider from "./claritySlider/ClaritySlider";
import FilterActions from "./filterAction/FilterActions";
import AdvanceFilter from "./advanceFilter/AdvanceFilter";
import DiamondHeader from "./diamondHeader/DiamondHeader";
import DiamondTable from "./diamondTable/DiamondTable";
import DiamondTabFilter from "./diamondTabFilter/DiamondTabFilter";
import RingWrapper from "./ringWrapper/ringWrapper";



export default function Diamond() {

  const [selectedShapes, setSelectedShapes] = useState([]); // select single as well as mutltiple shape
  const [diamonds, setDiamonds] = useState([]); // insert api data
  const [activeTab, setActiveTab] = useState("lab");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [total, setTotal] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // diamond filter 2nd component
  const [price, setPrice] = useState([0, 10000]);
  const [carat, setCarat] = useState([0, 20]);
  const [cut, setCut] = useState([1, 6]);

  // color filter
  const [color, setColor] = useState([1, 6]);

  // clearity
  const [clarity, setClarity] = useState([1, 7]);

  // advance filter
  const [polish, setPolish] = useState([1, 7]);
  const [symmetry, setSymmetry] = useState([1, 7]);
  const [fluorescence, setFluorescence] = useState([1, 6]);
  const [ratio, setRatio] = useState([0.9, 2.75]);
  const [table, setTable] = useState([40, 90]);
  const [depth, setDepth] = useState([40, 90]);

  // show advance filter
  const [showAdvanced, setShowAdvanced] = useState(false);

  // diamond Table headers
  const [sortBy, setSortBy] = useState("Price (Low to High)");
  const [certificateQuery, setCertificateQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [featuredDeal, setFeaturedDeal] = useState(false);
  const [checkedDiamonds, setCheckedDiamonds] = useState([]);
  const [showOnlyChecked, setShowOnlyChecked] = useState(false);

  const toggleDiamondCheck = (diamondId) => {
    setCheckedDiamonds((prevChecked) => {
      let updatedChecked;
      if (prevChecked.includes(diamondId)) {
        updatedChecked = prevChecked.filter((id) => id !== diamondId);
      } else {
        updatedChecked = [...prevChecked, diamondId];
      }

      // Trigger API only if showOnlyChecked is true
      if (showOnlyChecked) {
        fetchFilteredDiamonds({
          price,
          carat,
          cut,
          color,
          clarity,
          polish,
          symmetry,
          fluorescence,
          ratio,
          table,
          depth,
          selectedShapes,
          certificateQuery,
          featuredDeal,
          checkedDiamonds: updatedChecked, // send updated list
          showOnlyChecked,
          activeTab,
          selectedReport,
          page,
          per_page: 20,
        });
      }

      return updatedChecked;
    });
  };

  const toggleAdvanced = () => {
    setShowAdvanced((prev) => !prev);
  };

  const resetFilters = () => {
    setSelectedShapes([]);
    setPrice([0, 10000]);
    setCarat([0, 20]);
    setCut([1, 6]);
    setColor([1, 6]);
    setClarity([1, 7]);

    // reset advance
    setPolish([1, 7]);
    setSymmetry([1, 7]);
    setFluorescence([1, 6]);
    setRatio([0.9, 2.75]);
    setTable([40, 90]);
    setDepth([40, 90]);

    setCheckedDiamonds([]);
    setShowOnlyChecked(false);
  };

 

  const typeMap = {
    natural: 1,
    lab: 2,
    color: 3,
  };
  const reportMap = {
    all: 0,
    gia: 1,
    igi: 2,
  };
  const normalizedReport = selectedReport?.toLowerCase() || "all";

  const handleShapeChange = (shapes) => {
    setSelectedShapes(shapes);
  };

  const handleCertificateSearch = (query) => {
    setCertificateQuery(query);
  };

  const totalPages = Math.ceil(total / perPage);

  const loaderRef = useRef(null);
  const debouncedFilterRef = useRef(null);

  const fetchFilteredDiamonds = async (params) => {
    const isInitialLoad = params.page === 1;
    if (isInitialLoad) setLoading(true);
    else setIsFetchingMore(true);

    try {
      const response = await axiosClient.get("/api/get-all-diamonds", {
        params,
      });

      if (isInitialLoad) {
        setDiamonds(response.data.data || []);
      } else {
        setDiamonds((prev) => [...prev, ...(response.data.data || [])]);
      }

      setTotal(response.data.total || 0);
    } catch (error) {
      console.error("Fetch failed", error);
    } finally {
      if (isInitialLoad) setLoading(false);
      else setIsFetchingMore(false);
    }
  };

  // Debounced filter fetch on filter change
  useEffect(() => {
    if (!debouncedFilterRef.current) {
      debouncedFilterRef.current = debounce(fetchFilteredDiamonds, 600);
    }

    const params = {
      price,
      carat,
      cut,
      color,
      clarity,
      polish,
      symmetry,
      fluorescence,
      ratio,
      table,
      depth,
      shapes: selectedShapes.map((s) => s.id),
      certificate: certificateQuery,
      featured: featuredDeal,
      checkedDiamonds,
      showOnlyChecked,
      active_tab: typeMap[activeTab],
      selectedReport: reportMap[normalizedReport],
      page: 1,
      per_page: perPage,
    };

    setPage(1); // reset page for fresh filter
    debouncedFilterRef.current(params);

    return () => debouncedFilterRef.current.cancel();
  }, [
    price,
    carat,
    cut,
    color,
    clarity,
    polish,
    symmetry,
    fluorescence,
    ratio,
    table,
    depth,
    selectedShapes,
    certificateQuery,
    featuredDeal,
    showOnlyChecked,
    activeTab,
    selectedReport,
  ]);

  // Fetch next page when page increases
  useEffect(() => {
    if (page === 1) return; // already fetched in filter effect

    const params = {
      price,
      carat,
      cut,
      color,
      clarity,
      polish,
      symmetry,
      fluorescence,
      ratio,
      table,
      depth,
      shapes: selectedShapes.map((s) => s.id),
      certificate: certificateQuery,
      featured: featuredDeal,
      checkedDiamonds,
      showOnlyChecked,
      active_tab: typeMap[activeTab],
      selectedReport: reportMap[normalizedReport],
      page,
      per_page: perPage,
    };

    fetchFilteredDiamonds(params);
  }, [page]);

  // Infinite scroll observer
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

  const sortedDiamonds = [...diamonds].sort((a, b) => {
    switch (sortBy) {
      case "Price (Low to High)":
        return a.price - b.price;
      case "Price (High to Low)":
        return b.price - a.price;
      case "Carat (Low to High)":
        return a.carat_weight - b.carat_weight;
      case "Carat (High to Low)":
        return b.carat_weight - a.carat_weight;
      case "Color (Low to High)":
        return a.color?.id - b.color?.id;
      case "Color (High to Low)":
        return b.color?.id - a.color?.id;
      case "Clarity (Low to High)":
        return a.clarity?.id - b.clarity?.id;
      case "Clarity (High to Low)":
        return b.clarity?.id - a.clarity?.id;
      case "Cut (Low to High)":
        return b.cut?.id - a.cut?.id;
      case "Cut (High to Low)":
        return a.cut?.id - b.cut?.id;
      default:
        return 0;
    }
  });

  return (
    <>
      <section className="hero_section_wrapper">
        <div className="container-fluid p-0 position-relative">
          <img
            src="images/Header_Banner.jpg"
            alt=""
            className="img-fluid w-100"
          />
        </div>
      </section>

      <RingWrapper />

      <DiamondTabFilter
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onShapeChange={handleShapeChange}
      />

      <DiamondFilter
        price={price}
        setPrice={setPrice}
        carat={carat}
        setCarat={setCarat}
        cut={cut}
        setCut={setCut}
      />

      <div className="second-filter">
        <ColorSelect color={color} setColor={setColor} />
        <ClaritySlider clarity={clarity} setClarity={setClarity} />
      </div>

      <div className={`advanced-container ${showAdvanced ? "open" : ""}`}>
        <AdvanceFilter
          polish={polish}
          setPolish={setPolish}
          symmetry={symmetry}
          setSymmetry={setSymmetry}
          fluorescence={fluorescence}
          setFluorescence={setFluorescence}
          ratio={ratio}
          setRatio={setRatio}
          table={table}
          setTable={setTable}
          depth={depth}
          setDepth={setDepth}
        />
      </div>

      <FilterActions
        onReset={resetFilters}
        showAdvanced={showAdvanced}
        toggleAdvanced={toggleAdvanced}
      />

      <DiamondHeader
        activeTab={activeTab}
        checkedCount={checkedDiamonds.length}
        filteredCount={sortedDiamonds.length}
        totalCount={total}
        selectedSort={sortBy}
        setSelectedSort={setSortBy}
        selectedFilter={selectedReport}
        setSelectedFilter={setSelectedReport}
        onCertificateSearch={handleCertificateSearch}
        certificateQuery={certificateQuery}
        setCertificateQuery={setCertificateQuery}
        featuredDealChecked={featuredDeal}
        setFeaturedDealChecked={setFeaturedDeal}
        showOnlyChecked={showOnlyChecked}
        setShowOnlyChecked={setShowOnlyChecked}
      />

      <DiamondTable
        loading={loading}
        diamonds={sortedDiamonds}
        showAdvanced={showAdvanced}
        checkedDiamonds={checkedDiamonds}
        onToggleCheck={toggleDiamondCheck}
      />

      {/* Pagination Controls */}

      {isFetchingMore && <Loader />}
      <div ref={loaderRef} style={{ height: 50 }} />
    </>
  );
}
