import React, { useEffect, useState } from "react";
import "./index.css";
import axiosClient from "../../api/axios"; // Ensure path is correct
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

const { Range } = Slider;
const steps = [
  { id: 1, label: "CHOOSE A DIAMOND" },
  { id: 2, label: "CHOOSE A SETTING" },
  { id: 3, label: "COMPLETE YOUR RING" },
];

export default function Diamond() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedShapes, setSelectedShapes] = useState([]); // select single as well as mutltiple shape
  const [diamonds, setDiamonds] = useState([]); // insert api data
  const [activeTab, setActiveTab] = useState("lab-diamonds"); // not working this is for tabs
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // diamond filter 2nd component
  const [price, setPrice] = useState([0, 10000]);
  const [carat, setCarat] = useState([0, 20]);
  const [cut, setCut] = useState([0, 5]);

  // color filter
  const [color, setColor] = useState([0, 5]);

  // clearity
  const [clarity, setClarity] = useState([0, 6]);

  // advance filter
  const [polish, setPolish] = useState([0, 4]);
  const [symmetry, setSymmetry] = useState([0, 4]);
  const [fluorescence, setFluorescence] = useState([0, 4]);
  const [ratio, setRatio] = useState([0.9, 2.75]);
  const [table, setTable] = useState([40, 90]);
  const [depth, setDepth] = useState([40, 90]);

  // show advance filter
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleAdvanced = () => {
    setShowAdvanced((prev) => !prev);
  };

  const resetFilters = () => {
    setSelectedShapes([]);
    setPrice([0, 10000]);
    setCarat([0, 20]);
    setCut([0, 5]);
    setColor([0, 5]);
    setClarity([0, 6]);

    // reset advance
    setPolish([0, 4]);
    setSymmetry([0, 4]);
    setFluorescence([0, 4]);
    setRatio([0.9, 2.75]);
    setTable([40, 90]);
    setDepth([40, 90]);
  };

  const handleStepClick = (stepId) => {
    setCurrentStep(stepId);
  };

  const handleShapeChange = (shapes) => {
    setSelectedShapes(shapes);
  };

  useEffect(() => {
    const fetchDiamonds = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axiosClient.get("/api/get-all-diamonds");

        // Handle different possible response structures
        const responseData = response.data?.data || response.data || [];
        setDiamonds(Array.isArray(responseData) ? responseData : []);
      } catch (err) {
        setError("Failed to fetch diamonds. Please try again later.");
        console.error("Fetch error:", err);
        setDiamonds([]); // Ensure diamonds is always an array
      } finally {
        setLoading(false);
      }
    };

    fetchDiamonds();
  }, []);

  const filteredDiamonds = (Array.isArray(diamonds) ? diamonds : []).filter(
    (diamond) => {
      // 1. Basic validation
      if (
        !diamond ||
        !diamond.shape ||
        !diamond.price ||
        !diamond.carat_weight ||
        !diamond.cut ||
        !diamond.color ||
        !diamond.clarity
      ) {
        console.log("Invalid diamond skipped:", diamond?.id);
        return false;
      }

      // 2. Shape filter
      const shapeMatch =
        selectedShapes.length === 0 ||
        selectedShapes.some(
          (shape) =>
            shape.name.toLowerCase() === diamond.shape.name.toLowerCase()
        );

      // 3. Price filter (convert from thousands to actual price)
      const [minPrice, maxPrice] = price.map(Number);
      const priceMatch = diamond.price >= minPrice && diamond.price <= maxPrice;

      // 4. Carat filter (assuming carat is stored as points, convert to carats)
      const [minCarat, maxCarat] = carat.map(Number);
      const caratMatch =
        diamond.carat_weight >= minCarat && diamond.carat_weight <= maxCarat;

      // 5. Cut filter (convert slider values to cut indices)
      const cutMatch =
        diamond.cut > cut[0] && (cut[1] < 4 ? diamond.cut <= cut[1] : true);

      // 6. Color filter
      const colorMatch =
        diamond.color.id > color[0] &&
        (color[1] < 5 ? diamond.color.id < color[1] : true);

      // 6. Color filter
      const clarityMatch =
        diamond.clarity.id > clarity[0] &&
        (clarity[1] < 6 ? diamond.clarity.id <= clarity[1] : true);

      // Debug logging for excluded diamonds
      if (
        !shapeMatch ||
        !priceMatch ||
        !caratMatch ||
        !cutMatch ||
        !colorMatch ||
        !clarityMatch
      ) {
        console.log("Diamond excluded:", {
          id: diamond?.id,
          reasons: {
            shape:
              !shapeMatch &&
              `Not in selected shapes (${selectedShapes
                .map((s) => s.name)
                .join(", ")})`,
            price:
              !priceMatch &&
              `Price $${diamond.price} not in range $${minPrice}-$${maxPrice}`,
            carat:
              !caratMatch &&
              `Carat ${diamond.carat_weight} not in range ${minCarat}-${maxCarat}`,
            cut: !cutMatch && `Cut ${diamond.cut} not in range`,
            color:
              !colorMatch && `Color ${diamond.color.id} doesn't match ${color}`,
            clarity:
              !clarityMatch &&
              `Clarity ${diamond.clarity.id} doesn't match ${clarity}`,
          },
        });
        return false;
      }

      return true;
    }
  );

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

        {/* <div className="step-content">
          {currentStep === 1 && <p>🔹 Showing diamond options...</p>}
          {currentStep === 2 && <p>🔸 Showing setting options...</p>}
          {currentStep === 3 && <p>💍 Complete your ring!</p>}
        </div> */}
      </div>

      <DiamondTabFilter onShapeChange={handleShapeChange} />

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

      <DiamondHeader />

      <DiamondTable diamonds={filteredDiamonds} showAdvanced={showAdvanced} />
    </>
  );
}
