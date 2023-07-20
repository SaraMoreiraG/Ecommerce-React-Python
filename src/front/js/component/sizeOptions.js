import React from "react";

const SizeOptions = ({ sizes, selectedSize, onSizeSelect }) => {
  return (
    <div className="d-flex mb-3">
      {sizes.map((size, index) => (
        <p
          key={index}
          className={`size-text ${selectedSize === size ? "active" : ""}`}
          onClick={() => onSizeSelect(size)}
        >
          {size}
        </p>
      ))}
    </div>
  );
};

export default SizeOptions;
