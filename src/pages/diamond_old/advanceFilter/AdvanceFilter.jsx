import React from "react";
import "./AdvanceFilter.css";

export default function AdvanceFilter({
  polish,
  setPolish,
  symmetry,
  setSymmetry,
  fluorescence,
  setFluorescence,
  ratio,
  setRatio,
  table,
  setTable,
  depth,
  setDepth,
}) {
  const polishLabels = ["Excellent", "Very Good", "Good", "I", "Fair", "Poor"];
  const minPolishIndex = 0;
  const maxPolishIndex = polishLabels.length;

  const symmetryLabels = ["Excellent", "Very Good", "Good", "I", "Fair", "Poor"];
  const minSymmetryIndex = 0;
  const maxSymmetryIndex = symmetryLabels.length;

  const fluorescenceLabels = ["None", "Faint", "Medium", "Strong", "Very Strong"];
  const minFluorescenceIndex = 0;
  const maxFluorescenceIndex = fluorescenceLabels.length;

  const minRatio = 0.9;
  const maxRatio = 2.75;
  const minRatioDifference = 0.1;

  const handleRatioChange = (index, value) => {
    const newRatio = [...ratio];
    newRatio[index] = parseFloat(value);

    // Ensure the difference is maintained
    if (index === 0 && newRatio[0] > newRatio[1] - minRatioDifference) {
      newRatio[0] = parseFloat((newRatio[1] - minRatioDifference).toFixed(2));
    } else if (index === 1 && newRatio[1] < newRatio[0] + minRatioDifference) {
      newRatio[1] = parseFloat((newRatio[0] + minRatioDifference).toFixed(2));
    }

    // Round both values to two decimal places for consistent display
    newRatio[0] = parseFloat(newRatio[0].toFixed(2));
    newRatio[1] = parseFloat(newRatio[1].toFixed(2));

    setRatio(newRatio);
  };

  const getRatioTrackStyle = () => {
    const left = ((ratio[0] - minRatio) / (maxRatio - minRatio)) * 100;
    const right = ((ratio[1] - minRatio) / (maxRatio - minRatio)) * 100;
    return {
      left: `${left}%`,
      width: `${right - left}%`,
    };
  };

  const minTable = 40;
  const maxTable = 90;
  const minTableDifference = 1;

  const handleTableChange = (index, value) => {
    const newTable = [...table];
    newTable[index] = Number(value);
    // Ensure min is always at least 10 less than max
    if (index === 0 && newTable[0] > newTable[1] - minTableDifference) {
      newTable[0] = newTable[1] - minTableDifference;
    } else if (index === 1 && newTable[1] < newTable[0] + minTableDifference) {
      newTable[1] = newTable[0] + minTableDifference;
    }

    setTable(newTable);
  };

  const getTableTrackStyle = () => {
    const left = ((table[0] - minTable) / (maxTable - minTable)) * 100;
    const right = ((table[1] - minTable) / (maxTable - minTable)) * 100;
    return {
      left: `${left}%`,
      width: `${right - left}%`,
    };
  };

  const minDepth = 40;
  const maxDepth = 90;
  const minDepthDifference = 1;

  const handleDepthChange = (index, value) => {
    const newDepth = [...depth];
    newDepth[index] = Number(value);
    // Ensure min is always at least 1 less than max
    if (index === 0 && newDepth[0] > newDepth[1] - minDepthDifference) {
      newDepth[0] = newDepth[1] - minDepthDifference;
    } else if (index === 1 && newDepth[1] < newDepth[0] + minDepthDifference) {
      newDepth[1] = newDepth[0] + minDepthDifference;
    }

    setDepth(newDepth);
  };

  const getDepthTrackStyle = () => {
    const left = ((depth[0] - minDepth) / (maxDepth - minDepth)) * 100;
    const right = ((depth[1] - minDepth) / (maxDepth - minDepth)) * 100;
    return {
      left: `${left}%`,
      width: `${right - left}%`,
    };
  };

  return (
    <div className="advance-filter">
      <div className="advance-section">
        <label className="advance-label">BY POLISH</label>
        <div className="advance-inputs">
          {polishLabels.map((label, index) => (
            <span key={index} className="advance-label-item">
              {label}
            </span>
          ))}
        </div>

        <div className="slider-wrapper">
          <div className="slider-track"></div>
          <div
            className="slider-active"
            style={{
              left: `${(polish[0] / maxPolishIndex) * 100}%`,
              width: `${((polish[1] - polish[0]) / maxPolishIndex) * 100}%`,
            }}
          ></div>

          <input
            type="range"
            min={minPolishIndex}
            max={maxPolishIndex}
            step={1}
            value={polish[0]}
            onChange={(e) =>
              setPolish([
                Math.min(Number(e.target.value), polish[1] - 1),
                polish[1],
              ])
            }
          />
          <input
            type="range"
            min={minPolishIndex}
            max={maxPolishIndex}
            step={1}
            value={polish[1]}
            onChange={(e) =>
              setPolish([
                polish[0],
                Math.max(Number(e.target.value), polish[0] + 1),
              ])
            }
          />
        </div>
      </div>

      <div className="advance-section">
        <label className="advance-label">BY SYMMETRY</label>

        <div className="advance-inputs">
          {symmetryLabels.map((label, index) => (
            <span key={index} className="advance-label-item">
              {label}
            </span>
          ))}
        </div>

        <div className="slider-wrapper">
          <div className="slider-track"></div>
          <div
            className="slider-active"
            style={{
              left: `${(symmetry[0] / maxSymmetryIndex) * 100}%`,
              width: `${
                ((symmetry[1] - symmetry[0]) / maxSymmetryIndex) * 100
              }%`,
            }}
          ></div>

          <input
            type="range"
            min={minSymmetryIndex}
            max={maxSymmetryIndex}
            step={1}
            value={symmetry[0]}
            onChange={(e) =>
              setSymmetry([
                Math.min(Number(e.target.value), symmetry[1] - 1),
                symmetry[1],
              ])
            }
          />
          <input
            type="range"
            min={minSymmetryIndex}
            max={maxSymmetryIndex}
            step={1}
            value={symmetry[1]}
            onChange={(e) =>
              setSymmetry([
                symmetry[0],
                Math.max(Number(e.target.value), symmetry[0] + 1),
              ])
            }
          />
        </div>
      </div>

      <div className="advance-section">
        <label className="advance-label">BY FLUORESCENCE</label>

        <div className="advance-inputs">
          {fluorescenceLabels.map((label, index) => (
            <span key={index} className="advance-label-item">
              {label}
            </span>
          ))}
        </div>

        <div className="slider-wrapper">
          <div className="slider-track"></div>
          <div
            className="slider-active"
            style={{
              left: `${(fluorescence[0] / maxFluorescenceIndex) * 100}%`,
              width: `${
                ((fluorescence[1] - fluorescence[0]) / maxFluorescenceIndex) *
                100
              }%`,
            }}
          ></div>

          <input
            type="range"
            min={minFluorescenceIndex}
            max={maxFluorescenceIndex}
            step={1}
            value={fluorescence[0]}
            onChange={(e) =>
              setFluorescence([
                Math.min(Number(e.target.value), fluorescence[1] - 1),
                fluorescence[1],
              ])
            }
          />
          <input
            type="range"
            min={minFluorescenceIndex}
            max={maxFluorescenceIndex}
            step={1}
            value={fluorescence[1]}
            onChange={(e) =>
              setFluorescence([
                fluorescence[0],
                Math.max(Number(e.target.value), fluorescence[0] + 1),
              ])
            }
          />
        </div>
      </div>

      <div className="advance-section">
        <label className="advance-label">BY L/W RATIO</label>
        <div className="slider-wrapper">
          <div className="slider-track"></div>
          <div className="slider-active" style={getRatioTrackStyle()}></div>

          <input
            type="range"
            min={minRatio}
            max={maxRatio}
            value={ratio[0]}
            step={0.001} // Allows smooth sliding
            onChange={(e) => handleRatioChange(0, e.target.value)}
          />
          <input
            type="range"
            min={minRatio}
            max={maxRatio}
            value={ratio[1]}
            step={0.001}
            onChange={(e) => handleRatioChange(1, e.target.value)}
          />
        </div>

        <div className="advance-inputs">
          <input type="text" value={ratio[0].toFixed(2)} readOnly />
          <span>to</span>
          <input type="text" value={ratio[1].toFixed(2)} readOnly />
        </div>
      </div>

      <div className="advance-section">
        <label className="advance-label">BY TABLE</label>
        <div className="slider-wrapper">
          <div className="slider-track"></div>
          <div className="slider-active" style={getTableTrackStyle()}></div>

          <input
            type="range"
            min={minTable}
            max={maxTable}
            value={table[0]}
            onChange={(e) => handleTableChange(0, e.target.value)}
          />
          <input
            type="range"
            min={minTable}
            max={maxTable}
            value={table[1]}
            onChange={(e) => handleTableChange(1, e.target.value)}
          />
        </div>

        <div className="advance-inputs">
          <input type="text" value={table[0]} readOnly />
          <span>to</span>
          <input type="text" value={table[1]} readOnly />
        </div>
      </div>

      <div className="advance-section">
        <label className="advance-label">BY DEPTH</label>
        <div className="slider-wrapper">
          <div className="slider-track"></div>
          <div className="slider-active" style={getDepthTrackStyle()}></div>

          <input
            type="range"
            min={minDepth}
            max={maxDepth}
            value={depth[0]}
            onChange={(e) => handleDepthChange(0, e.target.value)}
          />
          <input
            type="range"
            min={minDepth}
            max={maxDepth}
            value={depth[1]}
            onChange={(e) => handleDepthChange(1, e.target.value)}
          />
        </div>

        <div className="advance-inputs">
          <input type="text" value={depth[0]} readOnly />
          <span>to</span>
          <input type="text" value={depth[1]} readOnly />
        </div>
      </div>
    </div>
  );
}
