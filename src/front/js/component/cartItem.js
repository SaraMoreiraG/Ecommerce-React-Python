import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const CartItem = ({ item, local, setSubTotal, updateCartItem }) => {
  const { actions } = useContext(Context);

  const [quantity, setQuantity] = useState(item.quantity || 0);

  const handleQuantityClick = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      updateCartItem(local, newQuantity);
    }
  };

  const handleRemoveItem = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.splice(local, 1);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    actions.getCartFromStorage();
    setSubTotal((prevSubTotal) => prevSubTotal - item.price * quantity);
  };

  return (
    <div className="d-flex">
      <div className="col-3">
        <Link to={"/productDetails/" + item.id}>
          <img src={item.img} className="card-img-top" alt="..." />
        </Link>
      </div>
      <div className="ps-3">
        <p className="card-description">
          Product description: {item.description}
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
              onClick={handleRemoveItem}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};
