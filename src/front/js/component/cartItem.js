import React, { useState } from "react";
import { Link } from "react-router-dom";

export const CartItem = () => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityClick = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  return (
    <div className="d-flex">
      <div className="col-3">
        <Link to={"/productDetails/" + "camiseta"}>
          <img
            src="https://new-ella-demo.myshopify.com/cdn/shop/products/image16xxl_fc9c3985-7db2-4101-b11a-49cd512ce9bc.jpg?v=1658136572"
            className="card-img-top"
            alt="..."
          />
        </Link>
      </div>
      <div className="ps-3">
        <p className="card-description">
          Product description: Some quick example text to build.
        </p>
        <p>Color / XL</p>
        <h3 className="bold mb-3">$280</h3>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <p className={"size-text"} onClick={() => handleQuantityClick()}>
              -
            </p>
            <p className={"size-text"}>{quantity}</p>
            <p className={"size-text"} onClick={() => handleQuantityClick()}>
              +
            </p>
          </div>
          <div className="">
            <button type="button" className="btn-close"></button>
          </div>
        </div>
      </div>
    </div>
  );
};
