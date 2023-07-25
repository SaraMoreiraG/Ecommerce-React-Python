import React from "react";
import { Link } from "react-router-dom";

import { OffCanvasCart } from "./offCanvasCart";
import { SignInOffcanvas } from "./signInOffcanvas";

export const Navbar1 = ({ store, actions, isLogin, setIsLogin }) => {
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
          <OffCanvasCart />

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
              <SignInOffcanvas setIsLogin={setIsLogin} />

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
