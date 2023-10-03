import React from "react";

const ColorOptions = ({ colors, selectedColor, onColorSelect }) => {
  return (
    <div className="d-flex mb-3">
      {colors.map((color) => (
        <div
          key={color.id}
          className={`circle ${selectedColor === color.name ? "active" : ""}`}
          onClick={() => onColorSelect(color.name)}
        >
          <div
            className="circle-color"
            style={{ backgroundColor: color.rgb }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default ColorOptions;
