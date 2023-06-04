import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/productDetails.css";

export const ProductDetails = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const [activeColor, setActiveColor] = useState(null);
  const sizes = ["XS", "S", "M", "L", "XL"];
  const [activeSize, setActiveSize] = useState(null);

  const handleColorClick = (index) => {
    setActiveColor(index);
  };
  const handleSizeClick = (index) => {
    setActiveSize(index);
  };

  return (
    <div className="product-detail container">
      <div className="row">
        <div className="link-tree pt-4 ms-2">
          <p>home - {params.theid}</p>
        </div>
      </div>

      <div class="row pt-3 g-0">
        <div class="col-md-7">
          <div class="foto pe-2">
            <img
              src="https://new-ella-demo.myshopify.com/cdn/shop/products/image16xxl_fc9c3985-7db2-4101-b11a-49cd512ce9bc.jpg?v=1658136572"
              className="img-fluid"
              alt="..."
            />
          </div>
          <div class="row">
            <div class="more-fotos bg-success p-0">MORE FOTOS</div>
          </div>
        </div>
        <div class="col-md-5 ps-5">
          <h1>
            (Product 23) Sample - Clothing And Accessory Boutiques For Sale
          </h1>
          <div className="d-flex align-items-end py-3">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <h4>1 Review</h4>
          </div>
          <h3 className="mb-3">
            Nam tempus turpis at metus scelerisque placerat nulla deumantos
            solicitud felis. Pellentesque diam dolor, elementum etos lobortis...
          </h3>
          <h3>Collection: Lorem Ipsum</h3>
          <h3>Href: Lorem Ipsum</h3>
          <h3>Availability: Lorem Ipsum</h3>
          <h2 className="my-3">$ 345</h2>
          <h3>Color: {activeColor}</h3>
          <div className="d-flex mb-3">
            <div
              className={`circle ${activeColor === 0 ? "active" : ""}`}
              onClick={() => handleColorClick(0)}
            >
              <div
                className="circle-color"
                style={{ backgroundColor: "#609ea1" }}
              ></div>
            </div>
            <div
              className={`circle ${activeColor === 1 ? "active" : ""}`}
              onClick={() => handleColorClick(1)}
            >
              <div
                className="circle-color"
                style={{ backgroundColor: "#808080" }}
              ></div>
            </div>
            <div
              className={`circle ${activeColor === 2 ? "active" : ""}`}
              onClick={() => handleColorClick(2)}
            >
              <div
                className="circle-color"
                style={{ backgroundColor: "#ffc1cc" }}
              ></div>
            </div>
          </div>
          <h3>Size: {activeSize !== null ? sizes[activeSize] : ""}</h3>
          <div className="d-flex mb-3">
            {sizes.map((size, index) => (
              <p
                key={index}
                className={`size-text ${activeSize === index ? "active" : ""}`}
                onClick={() => handleSizeClick(index)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  match: PropTypes.object,
};
