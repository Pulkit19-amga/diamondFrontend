import React,{useState} from 'react'
import "./index.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import DiamondFilter from './diamondFilter/DiamondFilter';
import ColorSelect from "./colorSelect/ColorSelect";
import ClaritySlider from './claritySlider/ClaritySlider';
import FilterActions from './filterAction/FilterActions';
import DiamondHeader from './diamondHeader/DiamondHeader';
import DiamondTable from  './diamondTable/DiamondTable';

const { Range } = Slider;
const steps = [
    { id: 1, label: "CHOOSE A DIAMOND" },
    { id: 2, label: "CHOOSE A SETTING" },
    { id: 3, label: "COMPLETE YOUR RING" },
  ];

  const diamondShapes = [
    { name: 'Round', image: 'round.png' },
    { name: 'Princess', image: 'princess.png' },
    { name: 'Radiant', image: 'radiant.png' },
    { name: 'Pear', image: 'pear.png' },
    { name: 'Cushion', image: 'cushion.png' },
    { name: 'Asscher', image: 'asscher.png' },
    { name: 'Emerald', image: 'emerald.png' },
    { name: 'Marquise', image: 'marquise.png' },
    { name: 'Oval', image: 'oval.png' },
    { name: 'Heart', image: 'heart.png' },
  ];


export default function Diamond() {
  const [color, setColor] = useState("");
    const [activeTab, setActiveTab] = useState("natural-diamonds");
    const [currentStep, setCurrentStep] = useState(1);
    const [selected, setSelected] = useState(null);

    const handleStepClick = (stepId) => {
      setCurrentStep(stepId);
    };

    const tabs = [
        { key: "lab-diamonds", label: "Lab Diamonds" },
        { key: "natural-diamonds", label: "Natural Diamonds" },
        { key: "color-diamonds", label: "Color Diamonds" },
      ];

  return (
    <>
    <section className="hero_section_wrapper">
    <div className="container-fluid p-0 position-relative">
      <img src="images/Header_Banner.jpg" alt="" className="img-fluid w-100"/>
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

    <div className="diamond-tab-container page-width">
      <div className="tab-wrapper">
        {tabs.map((tab) => (
          <p
            key={tab.key}
            className={`diamond-tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
            data-diamond={tab.key}
          >
            {tab.label}
          </p>
        ))}
      </div>
{/* 
      <div className="tab-content">
        {activeTab === "lab-diamonds" && <p>Showing Lab Diamonds...</p>}
        {activeTab === "natural-diamonds" && <p>Showing Natural Diamonds...</p>}
        {activeTab === "color-diamonds" && <p>Showing Color Diamonds...</p>}
      </div> */}
    </div>


    <div className="diamond-filter-wrapper">
      {diamondShapes.map((shape) => (
        <div key={shape.name} className="diamond-shape-box">
          <img
            src="/public/images/filter-diamond-shape.png"
            alt={shape.name}
            className="diamond-shape-icon"
          />
          <p className="diamond-shape-name">{shape.name}</p>
        </div>
      ))}
    </div>

   <DiamondFilter />

   <div style={{ padding: "20px" }}>
      <ColorSelect
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>

<ClaritySlider />

<FilterActions />

<DiamondHeader />

<DiamondTable />


  </>
  )
}


