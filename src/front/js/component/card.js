import React from "react";
import { Link } from "react-router-dom";

export const Card = () => {
  return (
    <div className="card col-3 p-3">
      <div className="zoom-img">
        <Link to={"/productDetails/" + "camiseta"}>
          <img
            src="https://new-ella-demo.myshopify.com/cdn/shop/products/image16xxl_fc9c3985-7db2-4101-b11a-49cd512ce9bc.jpg?v=1658136572"
            className="card-img-top"
            alt="..."
          />
        </Link>
        <i
          class="fa-regular fa-heart p-2"
          onClick={() => console.log("FAAAV")}
        ></i>
        <p className="quick-add p-2">QUICK ADD</p>
      </div>
      <div className="card-body">
        <h4 className="card-title">PRODUCT NAME</h4>
        <p className="card-description">
          Product description: Some quick example text to build.
        </p>
        <h3 className="bold">$280</h3>
      </div>
    </div>
  );
};
