import React from "react";
import { Link } from "react-router-dom";

export const Card = () => {
  return (
    <div className="card col-3">
      <img
        src="https://media.istockphoto.com/id/1271796113/es/foto/las-mujeres-sostienen-el-bolso-cerca-del-coche-de-lujo.jpg?s=612x612&w=0&k=20&c=8BZGFGvFETNHMMHgcuFlRSVC6GSf2HxhxxNY0Eallvo="
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
        <Link to={"/cardDetails/" + "camiseta"} className="btn btn-light">
          <span>Link to: camiseta</span>
        </Link>
      </div>
    </div>
  );
};
