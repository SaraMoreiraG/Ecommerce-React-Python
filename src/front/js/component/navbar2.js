import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import { OffCanvasCart } from "./offCanvasCart";
import { SignInOffcanvas } from "./signInOffcanvas";

export const Navbar2 = () => {
  const { actions } = useContext(Context);

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, [isLogin]);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="col-1">
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
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex mt-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <div>
        <Link to="/">
          <span className="navbar-brand mb-0 h1">e-commerce</span>
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
            <h5>/</h5>
            <Link to="/register">
              <button className="btn">
                <h5> My Account</h5>
              </button>
            </Link>
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
