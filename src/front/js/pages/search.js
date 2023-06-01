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
    <div className="container d-flex g-4 bg-primary justify-content-end">
      <div className="halo d-flex bg-warning">
        <div className="search-bar col-3">Search bar</div>
        <div className="col-9">
          <div className="banner-search col-12">Banner</div>
          <h1 className="display-4 col-12">
            This will show the collection: {params.theid}
          </h1>
          <div className="pagination d-flex">
            <Card />
            <div className="card col-3">Cards</div>
            <div className="card col-3">Cards</div>
            <div className="card col-3">Cards</div>
            <div className="card col-3">Cards</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Search.propTypes = {
  match: PropTypes.object,
};
