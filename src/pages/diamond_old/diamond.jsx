import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import axiosClient from "../../api/axios";
import debounce from "lodash.debounce";
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

const steps = [
  { id: 1, label: "CHOOSE A DIAMOND" },
  { id: 2, label: "CHOOSE A SETTING" },
  { id: 3, label: "COMPLETE YOUR RING" },
];

export default function Diamond() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedShapes, setSelectedShapes] = useState([]); // select single as well as mutltiple shape
  const [diamonds, setDiamonds] = useState([]); // insert api data
  const [activeTab, setActiveTab] = useState("lab");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [total, setTotal] = useState(0);

  // diamond filter 2nd component
  const [price, setPrice] = useState([0, 10000]);
  const [carat, setCarat] = useState([0, 20]);
  const [cut, setCut] = useState([1, 6]);

  // color filter
  const [color, setColor] = useState([1, 6]);

  // clearity
  const [clarity, setClarity] = useState([1, 7]);

  // advance filter
  const [polish, setPolish] = useState([0, 6]);
  const [symmetry, setSymmetry] = useState([0, 6]);
  const [fluorescence, setFluorescence] = useState([0, 5]);
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
    setCheckedDiamonds((prevChecked) =>
      prevChecked.includes(diamondId)
        ? prevChecked.filter((id) => id !== diamondId)
        : [...prevChecked, diamondId]
    );
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
    setPolish([0, 6]);
    setSymmetry([0, 6]);
    setFluorescence([0, 5]);
    setRatio([0.9, 2.75]);
    setTable([40, 90]);
    setDepth([40, 90]);
  };

  const handleStepClick = (stepId) => {
    setCurrentStep(stepId);
  };

  const typeMap = {
    natural: 1,
    lab: 2,
    color: 3,
  };

  const handleShapeChange = (shapes) => {
    setSelectedShapes(shapes);
  };

  const handleCertificateSearch = (query) => {
    setCertificateQuery(query);
  };

  const debouncedFilterRef = useRef(null);

  useEffect(() => {
    if (!debouncedFilterRef.current) {
      debouncedFilterRef.current = debounce((params) => {
        fetchFilteredDiamonds(params);
      }, 600);
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
      selectedShapes,
      certificateQuery,
      featuredDeal,
      activeTab,
      sortBy,
      page,
      per_page: 20,
    };

    debouncedFilterRef.current(params);
    console.log("Selected shapes updated:", selectedShapes);

    return () => {
      debouncedFilterRef.current.cancel();
    };
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
    activeTab,
    sortBy,
    page,
  ]);

  const fetchFilteredDiamonds = async (params) => {
    const {
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
      activeTab,
      sortBy,
      page,
      per_page,
    } = params;

    const requestParams = {
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
      active_tab: activeTab,
      sort_by: sortBy,
      page,
      per_page,
    };

    console.log("Request params:", requestParams);

    setLoading(true);
    try {
      const response = await axiosClient.get("/api/get-all-diamonds", {
        params: requestParams,
      });

      setDiamonds(response.data.data || []);
      setTotal(response.data.total || 0);
    } catch (error) {
      console.error("Failed to fetch diamonds:", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(diamonds);
  
  const totalPages = Math.ceil(total / perPage);

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

      <div className="diamond-ring-wrapper">
        <h2 className="title">Create Your Diamond Ring</h2>
        <div className="step-container">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`step ${currentStep === step.id ? "active" : ""}`}
              onClick={() => handleStepClick(step.id)}
            >
              <span className="step-number">{step.id}</span>
              <span className="step-label">{step.label}</span>
              {index < steps.length - 1 && <span className="divider">|</span>}
            </div>
          ))}
        </div>
      </div>

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
        totalCount={diamonds.length}
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
      <div className="pagination-controls">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
