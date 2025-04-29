import React,{useEffect, useState} from 'react'
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
import axiosClient from '../../api/axios'; // Ensure path is correct

const { Range } = Slider;
const steps = [
    { id: 1, label: "CHOOSE A DIAMOND" },
    { id: 2, label: "CHOOSE A SETTING" },
    { id: 3, label: "COMPLETE YOUR RING" },
  ];


export default function Diamond() {

  const [color, setColor] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [diamonds, setDiamonds] = useState([]);
  const [activeTab, setActiveTab] = useState('lab-diamonds');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


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
        setError('');
        const response = await axiosClient.get('/api/get-all-diamonds');
        
        // Handle different possible response structures
        const responseData = response.data?.data || response.data || [];
        setDiamonds(Array.isArray(responseData) ? responseData : []);
      } catch (err) {
        setError('Failed to fetch diamonds. Please try again later.');
        console.error('Fetch error:', err);
        setDiamonds([]); // Ensure diamonds is always an array
      } finally {
        setLoading(false);
      }
    };

    fetchDiamonds();
  }, []);

  // Filter diamonds based on the selected tab and shapes
  const filteredDiamonds = (Array.isArray(diamonds) ? diamonds : []).filter(diamond => {
    if (!diamond || !diamond.shape) return false;
    return selectedShapes.length === 0 || 
            selectedShapes.some(shape => shape.name === diamond.shape.name);
  });

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

      <DiamondTabFilter onShapeChange={handleShapeChange}/>

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

      <DiamondTable diamonds={filteredDiamonds}/>
    </>
  )
}