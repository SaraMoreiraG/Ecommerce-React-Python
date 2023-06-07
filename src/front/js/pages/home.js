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
        <div className="row d-flex justify-content-center text-center col-5 m-5 p-5">
          <h1 className="title">E-COMMERCE</h1>
          <div className="col-2 bold">
            <hr></hr>
          </div>
          <p>
            Quisquemos sodales suscipit tortor ditaemcos condimentum de cosmo
            lacus meleifend menean diverra loremous.
          </p>
          <div className="col-7">
            <Link to={"/catalogue/" + "allproducts"}>
              <p className="button-black my-3">SHOP NOW</p>
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
        <div className="row pt-4">
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
