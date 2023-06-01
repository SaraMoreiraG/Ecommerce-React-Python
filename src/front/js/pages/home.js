import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import { Card } from "../component/card.js";
import { Collection } from "../component/collection.js";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <div className="jumbotron-home ps-5 bg-primary">
        <div className="text-center">
          <h1>title</h1>
          <p>some text</p>
          <Link to={"/search/" + "allproducts"} className="btn btn-light">
            <span>Link to: all products</span>
          </Link>
        </div>
      </div>
      <div className="container collections p-3 bg-success">
        <Collection />
        <Collection />
        <Collection />
      </div>
      <div className="container p-3 bg-warning">
        <div className="row">
          <h1>Some text</h1>
        </div>
        <div className="row justify-content-between bg-danger">
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
