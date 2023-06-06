import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import { Card } from "../component/card.js";
import { Collections } from "../component/collections.js";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="home">
      <div className="jumbotron-home ps-5">
        <div className="row d-flex justify-content-center text-center col-4 m-5 p-5">
          <h1>E-COMMERCE</h1>
          <p>
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore.
          </p>
          <div className="col-7">
            <Link to={"/catalogue/" + "allproducts"}>
              <p className="button my-3">SHOP NOW</p>
            </Link>
          </div>
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
