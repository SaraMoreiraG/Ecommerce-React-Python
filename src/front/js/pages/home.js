import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Card } from "../component/card.js";
import { Collection } from "../component/collection.js";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <div className="container banner-home p-3 bg-danger">
        <div className="col-4">Text1</div>
        <div className="col-4">Text1</div>
        <div className="col-4">Text1</div>
      </div>
      <div className="jumbotron-home ps-5 bg-primary">
        <div className="text-center">
          <h1>title</h1>
          <p>some text</p>
          <button>Search keyword</button>
        </div>
      </div>
      <div className="container collections p-3 bg-success">
        <Collection />
        <Collection />
        <Collection />
      </div>
      <div className="container card-display p-3 bg-warning">
        <h2>Text</h2>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};
