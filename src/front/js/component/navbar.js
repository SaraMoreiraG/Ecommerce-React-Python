import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">e-commerce</span>
        </Link>
        <div className="ml-auto d-flex align-items-center">
          <div className="me-3">Shoping Cart</div>
          <Link to="/favorites">
            <button className="btn btn-primary me-3">Favorites</button>
          </Link>
          <div>LogIn</div>
          <Link to="/register">
            <button className="btn btn-primary ms-3">Register</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
