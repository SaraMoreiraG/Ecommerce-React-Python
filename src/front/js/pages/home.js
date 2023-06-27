import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import { Card } from "../component/card.js";

import "../../styles/home.css";

export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div className="home">
      <div className="jumbotron-home ps-5">
        <div className="row d-flex justify-content-center text-center col-5 m-5 p-5">
          <h1>ECOMMERCE</h1>
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

      <div className="collections container d-flex pt-4">
        {store.collections &&
          store.collections.map((item) => {
            const name = item.name.toUpperCase();
            return (
              <div key={item.id} className="col-4 d-grid">
                <Link to={"/catalogue/" + item.name} className="zoom-img">
                  <img src={item.img} />
                  <div className="text-img start-0 end-0 top-0 bottom-0">
                    <h4>{name}</h4>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>

      <div className="container d-grid pt-5 ">
        <div className="row text-center">
          <h3>
            <span>OUR OFFERS</span>
          </h3>
        </div>
        <div className="row pt-4">
          {store.offers &&
            store.offers.map((item) => {
              return <Card key={item.id} item={item} />;
            })}
        </div>
      </div>
    </div>
  );
};
