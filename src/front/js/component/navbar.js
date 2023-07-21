import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { CartItem } from "./cartItem";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(false);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, [isLogin]);

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

  const logInUser = async () => {
    const response = await fetch(process.env.BACKEND_URL + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    });
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      sessionStorage.setItem("token", token);
      await actions.getUser();
      setIsOffcanvasOpen(false);
      setIsLogin(true);
    }
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">e-commerce</span>
        </Link>
        <div className="ml-auto d-flex align-items-center">
          <button
            className="btn btn-light me-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <h5>Shopping Cart</h5>
          </button>
          {/********* Offcanvas Shopping Cart ***********/}
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

          <Link to="/favorites">
            <button className="btn btn-light me-3">
              <i className="fa-regular fa-heart"></i>
              <h5>Favorites</h5>
            </button>
          </Link>
          {!isLogin && (
            <>
              <button
                className="btn"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
              >
                <h5>Sign in</h5>
              </button>
              {/********** Offcanvas Sign in ************/}
              <div
                className="offcanvas offcanvas-end"
                tabIndex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
              >
                <div className="offcanvas-header px-2">
                  <h4 className="fw-bold" id="offcanvasExampleLabel">
                    Login
                  </h4>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="offcanvas-body px-4">
                  <h5 className="col-12 fw-medium">
                    Email Address <span className="mandatory">*</span>
                  </h5>
                  <input
                    type="text"
                    className="col-12 mb-3"
                    value={login.email}
                    onChange={(e) =>
                      setLogin({ ...login, email: e.target.value })
                    }
                  ></input>
                  <h5 className="col-12 fw-medium">
                    Password <span className="mandatory">*</span>
                  </h5>
                  <input
                    type="text"
                    className="col-12 mb-3"
                    onChange={(e) =>
                      setLogin({ ...login, password: e.target.value })
                    }
                  ></input>
                  <div className="col-12">
                    <p
                      className="button-black"
                      data-bs-dismiss="offcanvas"
                      onClick={() => logInUser()}
                    >
                      LOG IN
                    </p>
                  </div>
                  <h5 className="fw-normal underline button text-center">
                    Forgot your password?
                  </h5>
                  <div className="col-12 py-3">
                    <p className="button-white">CREATE AN ACCOUNT</p>
                  </div>
                </div>
              </div>
              <h5>or</h5>
              <Link to="/register">
                <button className="btn">
                  <h5>Create an Account</h5>
                </button>
              </Link>
            </>
          )}
          {isLogin && (
            <>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  actions.resetUser();
                  setIsLogin(false);
                }}
              >
                <h5>Log out </h5>
              </button>
              <h5>/</h5>
              <Link to="/register">
                <button className="btn">
                  <h5> My Account</h5>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
