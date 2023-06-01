import React from "react";
import { Link } from "react-router-dom";

export const Card = () => {
  return (
    <div className="col-3">
      <h3>Bolsos</h3>
      <Link to={"/cardDetails/" + "camiseta"} className="">
        <span>Link to: camiseta</span>
      </Link>
    </div>
  );
};
