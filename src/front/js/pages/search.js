import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import { Card } from "../component/card";
import "../../styles/search.css";

export const Search = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <div className="container bg-primary">
      <div className="search-bar col-3">Search bar</div>
      <div className="col-9 bg-warning">
        <div className="banner-search d-grid justify-content-end">
          <img src="https://new-ella-demo.myshopify.com/cdn/shop/collections/category-default-1.jpg?v=1646985103&width=1100" />
        </div>
        <h1 className="col-12 text-start py-3">{params.theid} collection</h1>
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

Search.propTypes = {
  match: PropTypes.object,
};
