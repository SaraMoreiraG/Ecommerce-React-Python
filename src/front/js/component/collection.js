import React from "react";
import { Link } from "react-router-dom";

export const Collection = () => {
  return (
    <div className="col-3">
      <h3>Bolsos</h3>
      <Link to={"/search/" + "bolsos"} className="btn btn-light">
        <span>Link to: bolsos</span>
      </Link>
    </div>
  );
};
