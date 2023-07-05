import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Card = ({ item }) => {
  const { store, actions } = useContext(Context);
  const favorites = store.user?.favorites || [];

  return (
    <div className="col">
      <div className="card rounded-0">
        <div className="zoom-img">
          <Link to={"/productDetails/" + "camiseta"}>
            <img
              src="https://new-ella-demo.myshopify.com/cdn/shop/products/image16xxl_fc9c3985-7db2-4101-b11a-49cd512ce9bc.jpg?v=1658136572"
              className="card-img-top"
              alt="..."
            />
          </Link>
          <p className="quick-add p-2">QUICK ADD</p>
          {favorites.length > 0
            ? favorites.map((favorite) => (
                <i
                  key={favorite.id}
                  className="fa-solid fa-heart p-2"
                  onClick={() => actions.addFavorite(favorite.id)}
                ></i>
              ))
            : favorites.map((favorite) => (
                <i
                  key={favorite.id}
                  className="fa-regular fa-heart p-2"
                  onClick={() => actions.addFavorite(favorite.id)}
                ></i>
              ))}
        </div>
        <div className="card-body">
          <h4 className="card-title">{item.name}</h4>
          <p className="card-description">{item.description}</p>
          <h5 className="bold">${item.price}</h5>
        </div>
      </div>
    </div>
  );
};
