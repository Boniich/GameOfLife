import React from "react";
export const InputBox = ({config, handleChange}) => {
  return (
    <>
      <div className="inputs-container">
        <label className="labels-inputs">Filas</label>
        <input
          type="range"
          name="boardRows"
          value={config.boardRows}
          onChange={handleChange}
        />
        <p className="show-data-input">{config.boardRows}</p>
      </div>

      <div className="inputs-container">
        <label className="labels-inputs">Columnas</label>
        <input
          type="range"
          name="boardCols"
          value={config.boardCols}
          onChange={handleChange}
        />
        <p className="show-data-input">{config.boardCols}</p>
      </div>

      <div className="inputs-container">
        <label className="labels-inputs">Delay</label>
        <input
          type="range"
          max={10000}
          name="delay"
          value={config.delay}
          onChange={handleChange}
        />
        <p className="show-data-input">{config.delay}</p>
      </div>
    </>
  );
};
