import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import { Card } from "../component/card";
import { MultiRangeSlider } from "../component/multiRangeSlider/MultiRangeSlider";
import "../../styles/catalogue.css";

export const Catalogue = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const [filters, setFilters] = useState({
    product_id: null,
    collection_names: [params.theid],
    min_price: null,
    max_price: null,
    size_ids: [],
    color_ids: [],
    in_stock: null,
  });

  const [arrows, setArrows] = useState({
    categories: true,
    price: true,
    size: true,
    stock: true,
  });

  useEffect(() => {
    actions.getProducts(filters);
    actions.getSizes();
  }, [filters]);

  const handleCollections = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    setFilters((prevFilters) => {
      if (prevFilters.collection_names.includes("allproducts")) {
        return {
          ...prevFilters,
          collection_names: [value],
        };
      }
      if (isChecked) {
        return {
          ...prevFilters,
          collection_names: [...prevFilters.collection_names, value],
        };
      } else {
        return {
          ...prevFilters,
          collection_names: prevFilters.collection_names.filter(
            (item) => item !== value
          ),
        };
      }
    });
    actions.getProducts(filters);
  };

  const handleSizes = (sizeId) => {
    setFilters((prevFilters) => {
      const isSelected = prevFilters.size_ids.includes(sizeId);

      if (isSelected) {
        return {
          ...prevFilters,
          size_ids: prevFilters.size_ids.filter((item) => item !== sizeId),
        };
      } else {
        return {
          ...prevFilters,
          size_ids: [...prevFilters.size_ids, sizeId],
        };
      }
    });
    actions.getProducts(filters);
  };

  const handlePrice = (event) => {
    const inputRangeElement = $(inputRangeRef.current);

    inputRangeElement.each(function () {
      const value = $(this).data("slider-value");
      const separator = value.indexOf(",");
      let parsedValue;

      if (separator !== -1) {
        parsedValue = value.split(",").map((item) => parseFloat(item));
      } else {
        parsedValue = parseFloat(value);
      }

      inputRangeElement.slider({
        formatter: function (value) {
          return "$" + value;
        },
        min: parseFloat(inputRangeElement.data("slider-min")),
        max: parseFloat(inputRangeElement.data("slider-max")),
        range: inputRangeElement.data("slider-range") === "true",
        value: parsedValue,
        tooltip_split:
          inputRangeElement.data("slider-tooltip_split") === "true",
        tooltip: inputRangeElement.data("slider-tooltip") === "true",
      });
    });
  };

  return (
    <div className="catalogue container">
      <div className="row m-0">
        <div className="link-tree pt-4 ms-2 mb-3">
          <p>home - collection</p>
        </div>
      </div>

      <div className="row m-0">
        <div className="search-bar col-3">
          <div className="categories">
            <div className="d-flex justify-content-between">
              <h5 className="w-100">CATEGORIES</h5>
              <h5
                className={`arrow ${arrows.categories ? "down" : "up"}`}
                onClick={() =>
                  setArrows((prevArrows) => ({
                    ...prevArrows,
                    categories: !prevArrows.categories,
                  }))
                }
              >
                ^
              </h5>
            </div>

            <hr className="m-0"></hr>

            {arrows.categories && (
              <ul className="mt-3 mb-5">
                {store.collections &&
                  store.collections.map((category) => (
                    <li key={category.id}>
                      <p className="my-2">
                        <input
                          type="checkbox"
                          className="me-2"
                          value={category.name}
                          checked={filters.collection_names.includes(
                            category.name
                          )}
                          onChange={handleCollections}
                        />
                        {category.name}
                      </p>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div className="price">
            <div className="d-flex justify-content-between">
              <h5 className="w-100">PRICE</h5>
              <h5
                className={`arrow ${arrows.price ? "down" : "up"}`}
                onClick={() =>
                  setArrows((prevArrows) => ({
                    ...prevArrows,
                    price: !prevArrows.price,
                  }))
                }
              >
                ^
              </h5>
            </div>

            <hr className="m-0"></hr>

            {arrows.price && (
              <div className="row pt-2 m-0 mb-5">
                <MultiRangeSlider
                  min={0}
                  max={1000}
                  onChange={({ min, max }) =>
                    console.log(`min = ${min}, max = ${max}`)
                  }
                />
              </div>
            )}
          </div>

          <div className="size mt-3">
            <div className="d-flex justify-content-between">
              <h5 className="w-100">SIZE</h5>
              <h5
                className={`arrow ${arrows.size ? "down" : "up"}`}
                onClick={() =>
                  setArrows((prevArrows) => ({
                    ...prevArrows,
                    size: !prevArrows.size,
                  }))
                }
              >
                ^
              </h5>
            </div>

            <hr className="m-0"></hr>

            {arrows.size && (
              <div className="row pt-2 m-0 mb-5">
                {store.sizes &&
                  store.sizes.map((size) => (
                    <div key={size.id} className="col-3 m-0">
                      <p
                        className={`size-text px-2 ${
                          filters.size_ids.includes(size.id) ? "active" : ""
                        }`}
                        onClick={() => handleSizes(size.id)}
                      >
                        {size.name}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="stock">
            <div className="d-flex justify-content-between">
              <h5 className="w-100">AVAILABILITY</h5>
              <h5
                className={`arrow ${arrows.stock ? "down" : "up"}`}
                onClick={() =>
                  setArrows((prevArrows) => ({
                    ...prevArrows,
                    stock: !prevArrows.stock,
                  }))
                }
              >
                ^
              </h5>
            </div>

            <hr className="m-0"></hr>

            {arrows.stock && (
              <div className="row pt-2 m-0">
                <p className="p-0 m-0 mb-2">
                  <input type="checkbox" className="me-2" />
                  In stock
                </p>
                <p className="p-0">
                  <input type="checkbox" className="me-2" />
                  All products
                </p>
              </div>
            )}
          </div>

          <div className="mt-3">
            <p
              className="button-white p-2"
              onClick={() =>
                setFilters({
                  product_id: null,
                  collection_names: [],
                  min_price: null,
                  max_price: null,
                  size_ids: [],
                  color_ids: [],
                  in_stock: null,
                })
              }
            >
              CLEAN ALL FILTERS
            </p>
          </div>
        </div>

        <div className="col-9">
          <div className="row banner-search justify-content-end p-0">
            <img src="https://new-ella-demo.myshopify.com/cdn/shop/collections/category-default-1.jpg?v=1646985103&width=1100" />
          </div>
          <h2 className="col-12 text-start pt-3">{params.theid} collection</h2>
          <p>
            Nullam aliquet vestibulum augue non varius. Cras cosmo congue an
            melitos. Duis tristique del ante le maliquam praesent murna de
            tellus laoreet cosmopolis. Quisque hendrerit nibh an purus
          </p>
          <hr></hr>
          <div className="row pt-4 justify-content-between">
            {store.products &&
              store.products.map((item) => <Card key={item.id} item={item} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

Catalogue.propTypes = {
  match: PropTypes.object,
};
