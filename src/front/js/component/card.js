import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Card = ({ item }) => {
  const { store, actions } = useContext(Context);

  const [isFavorite, setIsFavorite] = useState();

  useEffect(() => {
    if (store.user && store.user.favorites.length > 0) {
      store.user.favorites.map((favorite) => {
        if (favorite.product.id === item.id) {
          setIsFavorite(true);
        }
      });
    }
  }, [store.user, item.id]);

  return (
    <div className="col">
      <div className="card rounded-0">
        {/*************** HEADER WITH ZOOM ********************/}
        <div className="zoom-img">
          {/*************** PHOTO ********************/}
          <Link to={"/productDetails/" + item.id}>
            <img
              src="https://new-ella-demo.myshopify.com/cdn/shop/products/image16xxl_fc9c3985-7db2-4101-b11a-49cd512ce9bc.jpg?v=1658136572"
              className="card-img-top"
              alt="..."
            />
          </Link>

          <p className="quick-add p-2">QUICK ADD</p>

          {/*************** FAVORITE HEART ********************/}
          {store.user && (
            <i
              className={`fa-${isFavorite ? "solid" : "regular"} fa-heart p-2`}
              onClick={() =>
                isFavorite
                  ? (actions.deleteFavorite(item.id),
                    setIsFavorite(false),
                    console.log("delete"))
                  : (actions.addFavorite(item.id), console.log("add"))
              }
            ></i>
          )}
        </div>

        {/*************** BODY ********************/}
        <div className="card-body">
          <h4 className="card-title">{item.name}</h4>
          <p className="card-description">{item.description}</p>
          <h5 className="bold">${item.price}</h5>
        </div>
      </div>
    </div>
  );
};
