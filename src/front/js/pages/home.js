import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import { Card } from "../component/card.js";
import { Collections } from "../component/collections.js";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <div className="jumbotron-home ps-5">
        <div className="text-center col-4 m-5 p-5">
          <h1>Lorem ipsum</h1>
          <p>
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore.
          </p>
          <Link to={"/search/" + "allproducts"} className="btn btn-dark">
            <span>Link to: all products</span>
          </Link>
        </div>
      </div>

      <Collections />

      <div className="container d-grid pt-5 ">
        <div className="row text-center">
          <h2>
            <span>OUR OFFERS</span>
          </h2>
        </div>
        <div className="row pt-4 justify-content-between">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};
