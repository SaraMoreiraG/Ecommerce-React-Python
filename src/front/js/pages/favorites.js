import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card } from "../component/card";

export const Favorites = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="favorites container">
      <div className="row m-0">
        <div className="link-tree pt-4 ps-0">
          <p>home - favorites</p>
        </div>
      </div>
      <h1 className="mt-3 mb-5">YOUR FAVORITES</h1>
      <hr></hr>
      <div className="row pt-4 justify-content-between">
        {store.user &&
          store.user.favorites.map((item) => {
            console.log(item);
            return <Card key={item.id} item={item.product} />;
          })}
      </div>
    </div>
  );
};
