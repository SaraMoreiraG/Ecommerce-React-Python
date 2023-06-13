import React from "react";
import { Link } from "react-router-dom";

import { CartItem } from "./cartItem";

export const Navbar = () => {
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
            <div className="offcanvas-header pb-0 bg-danger">
              <h1 className="offcanvas-title" id="offcanvasRightLabel">
                Shopping Cart
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body bg-primary pt-0">
              <h5 className="py-3">0 items</h5>
              <CartItem />
              <hr></hr>
              <CartItem />
              <hr></hr>
              <p>Subtotal:</p>
            </div>
          </div>

          <Link to="/favorites">
            <button className="btn btn-light me-3">
              <i className="fa-regular fa-heart"></i>
              <h5>Favorites</h5>
            </button>
          </Link>

          <button
            className="btn"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <h5>Sign in</h5>
          </button>
          {/********* Offcanvas Sign in ***********/}
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className="offcanvas-header px-4">
              <h1 className="offcanvas-title" id="offcanvasExampleLabel">
                Login
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body px-4">
              <h3 className="col-12">
                Email Address <span className="mandatory">*</span>
              </h3>
              <input type="text" className="col-12 mb-3"></input>
              <h3 className="col-12">
                Password <span className="mandatory">*</span>
              </h3>
              <input type="text" className="col-12 mb-3"></input>
              <div className="col-12">
                <p className="button-black">LOG IN</p>
              </div>
              <h3 className="underline button">Forgot your password?</h3>{" "}
              <div className="col-12 py-2">
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
        </div>
      </div>
    </nav>
  );
};
