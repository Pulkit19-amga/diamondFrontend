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
import DiamondTabFilter from './diamondTabFilter/DiamondTabFilter';

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
   
    const [currentStep, setCurrentStep] = useState(1);
    const [selected, setSelected] = useState(null);

    const handleStepClick = (stepId) => {
      setCurrentStep(stepId);
    };

    const [activeTab, setActiveTab] = useState("lab-diamonds");

    const tabs = [
      { key: "lab-diamonds", label: "Lab Diamonds" },
      { key: "natural-diamonds", label: "Natural Diamonds" },
      { key: "color-diamonds", label: "Color Diamonds" },
    ];
  
    const diamondShapes = {
      "lab-diamonds": [
        { name: "Round" },
        { name: "Princess" },
        { name: "Oval" },
      ],
      "natural-diamonds": [
        { name: "Cushion" },
        { name: "Emerald" },
        { name: "Asscher" },
      ],
      "color-diamonds": [
        { name: "Radiant" },
        { name: "Pear" },
        { name: "Heart" },
      ],
    };

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

   <DiamondTabFilter />


    
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


