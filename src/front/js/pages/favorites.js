import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Favorites = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="jumbotron mt-5 pt-5">
        <h1 className="display-4">This is a favorites page</h1>
      </div>
    </>
  );
};
