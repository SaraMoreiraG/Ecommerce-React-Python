import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Favorites = () => {
  const { store, actions } = useContext(Context);
  const favorites = store.user.favorites || [];

  return (
    <>
      {favorites.map((item) => (
        <i
          key={item.id}
          className="fa-regular fa-heart p-2 bg-danger"
          onClick={() => actions.addFavorite(item.id)}
        ></i>
      ))}
    </>
  );
};
