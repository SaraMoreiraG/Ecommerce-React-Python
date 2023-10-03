import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { CartItem } from "./cartItem";

export const OffCanvasCart = () => {
  const { store, actions } = useContext(Context);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    actions.getCartFromStorage();
  }, []);

  // Function to update the quantity of an item in the cart
  const updateCartItem = (local, newQuantity) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart[local].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(existingCart));
    actions.getCartFromStorage();
  };

  useEffect(() => {
    // Calculate the subtotal based on the updated quantities
    const total = store.cartFromStorage.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubTotal(total);
  }, [store.cartFromStorage]);

  return (
    <div
      className="offcanvas offcanvas-end"
      data-bs-scroll="true"
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header pb-0 ps-1">
        <h4 className="fw-bold" id="offcanvasRightLabel">
          Shopping Cart
        </h4>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body pt-0">
        {store.cartFromStorage && (
          <>
            <h5 className="fw-light py-3">
              {store.cartFromStorage.length} items
            </h5>
            {store.cartFromStorage.length > 0 ? (
              <>
                <hr />
                {store.cartFromStorage.map((item, index) => (
                  <CartItem
                    key={index}
                    item={item}
                    local={index}
                    setSubTotal={setSubTotal}
                    updateCartItem={updateCartItem}
                  />
                ))}
                <hr />
                <p>Subtotal: {subTotal}$</p>
              </>
            ) : (
              <>
                <p>Free shipping for all orders over $800.00!</p>
                <p className="text-center">Your cart is empty</p>
                <p className="button-white" data-bs-dismiss="offcanvas">
                  CONTINUE SHOPPING
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
