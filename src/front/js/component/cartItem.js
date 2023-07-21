import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const CartItem = ({ item, local, setSubTotal }) => {
  const { actions } = useContext(Context);

  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setSubTotal((prevSubTotal) => prevSubTotal + item.price * quantity);
  }, []);

  const handleQuantityClick = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      setSubTotal((prevSubTotal) => prevSubTotal + item.price * change);
    }
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
        <p>
          {item.color} / {item.size}
        </p>
        <h4 className="bold mb-3">${item.price * quantity}</h4>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <p className={"size-text"} onClick={() => handleQuantityClick(-1)}>
              -
            </p>
            <p className={"size-text"}>{quantity}</p>
            <p className={"size-text"} onClick={() => handleQuantityClick(1)}>
              +
            </p>
          </div>
          <div className="">
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                const existingCart =
                  JSON.parse(localStorage.getItem("cart")) || [];
                existingCart.splice(local, 1);
                localStorage.setItem("cart", JSON.stringify(existingCart));
                actions.getCartFromStorage();
                setSubTotal((prevSubTotal) => prevSubTotal - item.price);
              }}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};
