import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./multiRangeSlider.css";

export const MultiRangeSlider = ({ filters, min, max }) => {
  // Creating the state variables
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  // Creating the refs
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);
  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  return (
    <div className="row justify-content-center mt-3 m-0">
      <div className="d-flex justify-content-center">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
          }}
          className="thumb thumb--zindex-5"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
          className="thumb thumb--zindex-4"
        />
        <div className="slider bg-success">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
        </div>
      </div>

      <div className="d-flex justify-content-between mt-4 p-0">
        <div className="col-4 d-flex align-items-center box px-2">
          <span className="col-2">$</span>
          <input
            type="text"
            className="col-10 price-input"
            value={minVal}
            readOnly
          />
        </div>
        <div className="col-2 d-flex align-items-end justify-content-center p-0 m-0">
          <span>to</span>
        </div>
        <div className="col-4 d-flex align-items-center box px-2">
          <span className="col-2">$</span>

          <input
            type="text"
            className="col-10 price-input"
            value={maxVal}
            readOnly
          />
        </div>
      </div>
      <div className="col-12 p-0">
        <p
          className="button-black mt-3 p-2"
          onClick={() =>
            filters((prevFilters) => ({
              ...prevFilters,
              max_price: maxVal,
              min_price: minVal,
            }))
          }
        >
          APPLY
        </p>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};
