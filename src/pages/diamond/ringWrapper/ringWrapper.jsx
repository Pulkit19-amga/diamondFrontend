import React, { useState } from 'react'
import "../index.css"
useState
   const steps = [
  { id: 1, label: "CHOOSE A DIAMOND" },
  { id: 2, label: "CHOOSE A SETTING" },
  { id: 3, label: "COMPLETE YOUR RING" },
];

const RingWrapper = () => {
const [currentStep, setCurrentStep] = useState(1);

const handleStepClick = (stepId) => {
    setCurrentStep(stepId);
  };
  
  return (
    <>
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
              {index < steps.length - 1 && <span className="step-divider">|</span>}
              
            </div>
          ))}
        </div>
      </div>
      </>
  )
}

export default RingWrapper
