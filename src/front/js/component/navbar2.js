import React from "react";
import { Link } from "react-router-dom";

import { OffCanvasCart } from "./offCanvasCart";
import { SignInOffcanvas } from "./signInOffcanvas";

export const Navbar2 = ({ store, actions, isLogin, setIsLogin }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <button
        className="navbar-toggler ms-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header bg-dark text-white">
          <h4 className="offcanvas-title" id="offcanvasNavbarLabel">
            Menu
          </h4>
          <button
            type="button"
            className="btn-close btn btn-light"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <Link
                to={"/catalogue/" + "allproducts"}
                className="d-flex align-items-center"
                data-bs-dismiss="offcanvas"
              >
                <img
                  src="https://new-ella-demo.myshopify.com/cdn/shop/files/slideshow-1.jpg?v=1632195167&width=1880"
                  className="circle"
                />
                <h4 className="black">All our products</h4>
              </Link>
              <hr></hr>
            </li>
            {store.collections &&
              store.collections.map((item) => {
                return (
                  <li className="nav-item" key={item.id}>
                    <Link
                      to={"/catalogue/" + item.name}
                      className="d-flex align-items-center"
                    >
                      <img src={item.img} className="circle" />
                      <h4 className="black">{item.name}</h4>
                    </Link>
                    <hr></hr>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      <div>
        <Link to="/">
          <span className="navbar-brand mb-0 h1">your name</span>
        </Link>
      </div>

      <div className="d-flex me-3">
        {!isLogin && (
          <>
            <button
              className="btn p-0"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <i className="fa-regular fa-user login"></i>
            </button>
            {/********** Offcanvas Sign in ************/}
            <SignInOffcanvas setIsLogin={setIsLogin} />
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
          </>
        )}
        <button
          className="btn btn-light"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
        <OffCanvasCart />
      </div>
    </nav>
  );
};
