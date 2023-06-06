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
  const [quantity, setQuantity] = useState(0);
  const [termsPolicy, setTermsPolicy] = useState(false);

  const handleColorClick = (index) => {
    setActiveColor(index);
  };
  const handleSizeClick = (index) => {
    setActiveSize(index);
  };
  const handleQuantityClick = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleTermsPolicyClick = () => {
    setTermsPolicy(true);
    console.log(termsPolicy);
  };

  return (
    <div className="product-detail container">
      <div className="row">
        <div className="link-tree pt-4 ms-2">
          <p>home - {params.theid}</p>
        </div>
      </div>

      <div className="row pt-3 g-0">
        <div className="col-md-7">
          <div className="foto pe-2">
            <img
              src="https://new-ella-demo.myshopify.com/cdn/shop/products/image16xxl_fc9c3985-7db2-4101-b11a-49cd512ce9bc.jpg?v=1658136572"
              className="img-fluid"
              alt="..."
            />
          </div>
          <div className="row">
            <div className="more-fotos bg-success p-0">MORE FOTOS</div>
          </div>
        </div>
        <div className="col-md-5 ps-5">
          <h1>
            (Product 23) Sample - Clothing And Accessory Boutiques For Sale
          </h1>

          <div className="d-flex align-items-end py-3">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
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

          <h3>Quantity: {quantity}</h3>
          <div className="d-flex mb-3">
            <p className={"size-text"} onClick={() => handleQuantityClick()}>
              -
            </p>
            <p className={"size-text"}>{quantity}</p>
            <p className={"size-text"} onClick={() => handleQuantityClick()}>
              +
            </p>
          </div>

          <div className="d-flex">
            <div className="col-9">
              <p className="button-black">ADD TO CART</p>
            </div>
            <div className="col-2">
              <i
                class="fa-regular fa-heart p-2"
                onClick={() => console.log("FAAAV")}
              ></i>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <input
              className={`form-check-input ${
                termsPolicy === true ? "checked" : ""
              }`}
              type="checkbox"
              value="None"
              onClick={() => handleTermsPolicyClick()}
            />
            <h3 className="ms-2 mb-0">I agree withTerms & Conditions</h3>
          </div>
          <p className="button blue my-3">BUY</p>
        </div>
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  match: PropTypes.object,
};
