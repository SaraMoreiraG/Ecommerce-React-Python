import React from "react";
import { Link } from "react-router-dom";

export const Collections = () => {
  return (
    <div className="container collections justify-content-between">
      <div className="col-4 d-grid justify-content-start">
        <h3>SCARF</h3>
        <Link to={"/search/" + "Scarf"} className="">
          <img src="https://new-ella-demo.myshopify.com/cdn/shop/files/1_257d98ae-1c96-4fdd-b3ea-8439950530cb_370x.jpg?v=1630924167" />
        </Link>
      </div>
      <div className="col-4">
        <h3>BLOUSES</h3>
        <Link to={"/search/" + "Blouses"} className="">
          <img src="https://new-ella-demo.myshopify.com/cdn/shop/files/2_987fd332-b977-48d4-9e91-aaf5bf9e372e_370x.jpg?v=1630924187" />
        </Link>
      </div>
      <div className="col-4 d-grid justify-content-end">
        <h3>ACCESSORIES</h3>
        <Link to={"/search/" + "Accessories"} className="">
          <img src="https://new-ella-demo.myshopify.com/cdn/shop/files/3_006e87f5-cb50-4183-81b9-0c6f16774ff5_370x.jpg?v=1630924212" />
        </Link>
      </div>
    </div>
  );
};
