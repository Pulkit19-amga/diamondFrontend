import React, { useEffect, useState } from "react";
import "./index.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import DiamondFilter from "./diamondFilter/DiamondFilter";
import ColorSelect from "./colorSelect/ColorSelect";
import ClaritySlider from "./claritySlider/ClaritySlider";
import FilterActions from "./filterAction/FilterActions";
import DiamondHeader from "./diamondHeader/DiamondHeader";
import DiamondTable from "./diamondTable/DiamondTable";
import DiamondTabFilter from "./diamondTabFilter/DiamondTabFilter";
import axiosClient from "../../api/axios"; // Ensure path is correct

const { Range } = Slider;
const steps = [
  { id: 1, label: "CHOOSE A DIAMOND" },
  { id: 2, label: "CHOOSE A SETTING" },
  { id: 3, label: "COMPLETE YOUR RING" },
];

export default function Diamond() {
  const [color, setColor] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedShapes, setSelectedShapes] = useState([]); // select single as well as mutltiple shape
  const [diamonds, setDiamonds] = useState([]); // insert api data
  const [activeTab, setActiveTab] = useState("lab-diamonds"); // not working this is for tabs
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // diamond filter 2nd component
  const [price, setPrice] = useState([0, 60]);
  const [carat, setCarat] = useState([100, 500]);
  const [cut, setCut] = useState([0, 75]);

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

  // Filter diamonds based on the selected tab and shapes
  /* const filteredDiamonds = (Array.isArray(diamonds) ? diamonds : []).filter(
    (diamond) => {
      if (!diamond || !diamond.shape) return false;
      return (
        selectedShapes.length === 0 ||
        selectedShapes.some((shape) => shape.name === diamond.shape.name)
      );
    }
  ); */

  const filteredDiamonds = (Array.isArray(diamonds) ? diamonds : []).filter(
    (diamond) => {
      // 1. Basic validation
      if (
        !diamond ||
        !diamond.shape ||
        !diamond.price ||
        !diamond.carat_weight ||
        !diamond.cut
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
      const [minPrice, maxPrice] = price.map((p) => p * 1000);
      const priceMatch = diamond.price >= minPrice && diamond.price <= maxPrice;

      // 4. Carat filter (assuming carat is stored as points, convert to carats)
      const [minCarat, maxCarat] = carat.map((c) => c / 1);
      const caratMatch =
        diamond.carat_weight >= minCarat && diamond.carat_weight <= maxCarat;

      // 5. Cut filter (convert slider values to cut indices)
      const cutMatch =
        diamond.cut >= Math.floor(cut[0] / 25) &&
        diamond.cut <= Math.floor(cut[1] / 25);

      // 6. Color filter
      // const colorMatch = !color ||
      //                  (diamond.color && diamond.color.toLowerCase() === color.toLowerCase());

      // Debug logging for excluded diamonds
      if (
        !shapeMatch ||
        !priceMatch ||
        !caratMatch ||
        !cutMatch /* || !colorMatch */
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
              `Carat ${diamond.carat} not in range ${minCarat}-${maxCarat}`,
            cut: !cutMatch && `Cut ${diamond.cut} not in range`,
            // color: !colorMatch && `Color ${diamond.color} doesn't match ${color}`
          },
        });
        return false;
      }

      return true;
    }
  );

  // testing perpose
  // useEffect(() => {
  //   console.log("Current filter values:", {
  //     selectedShapes,
  //     price,
  //     carat,
  //     cut,
  //     color
  //   });

  //   console.log("Filtered diamonds count:", filteredDiamonds.length);
  //   console.log("First few filtered diamonds:", filteredDiamonds.slice(0, 3));
  // }, [selectedShapes, price, carat, cut, color, filteredDiamonds]);

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

      <div style={{ padding: "20px" }}>
        <ColorSelect value={color} onChange={(e) => setColor(e.target.value)} />
      </div>

      <ClaritySlider />

      <FilterActions />

      <DiamondHeader />

      <DiamondTable diamonds={filteredDiamonds} />
    </>
  );
}
