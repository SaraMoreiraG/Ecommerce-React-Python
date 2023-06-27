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
    colors: true,
  });

  useEffect(() => {
    actions.getProducts(filters);
    actions.getSizes();
    actions.getPriceRange();
    actions.getColors();
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

  const handleColors = (index) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      color_ids: [...prevFilters.color_ids, index],
    }));
  };

  return (
    <div className="catalogue container">
      <div className="row m-0">
        <div className="link-tree pt-4 ms-2 mb-3">
          <p>home - collection</p>
        </div>
      </div>

      <div className="row justify-content-between m-0">
        <div className="search-bar col-2">
          <div className="categories mb-5">
            <div className="d-flex justify-content-between">
              <h5>CATEGORIES</h5>
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
              <ul>
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

          <div className="price mb-5">
            <div className="d-flex justify-content-between">
              <h5>PRICE</h5>
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

            {arrows.price && store.priceRange && (
              <MultiRangeSlider
                filters={setFilters}
                min={store.priceRange.min_price}
                max={store.priceRange.max_price}
              />
            )}
          </div>

          <div className="size mb-5">
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
              <div className="row pt-2 m-0">
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

          <div className="colors mb-5">
            <div className="d-flex justify-content-between">
              <h5 className="w-100">COLORS</h5>
              <h5
                className={`arrow ${arrows.colors ? "down" : "up"}`}
                onClick={() =>
                  setArrows((prevArrows) => ({
                    ...prevArrows,
                    colors: !prevArrows.colors,
                  }))
                }
              >
                ^
              </h5>
            </div>

            <hr className="m-0"></hr>

            {arrows.colors && (
              <div className="row pt-2 m-0">
                {store.colors &&
                  store.colors.map((color) => {
                    return (
                      <div
                        key={color.id}
                        className="circle"
                        onClick={() => handleColors(color.id)}
                      >
                        <div
                          className="circle-color"
                          style={{ backgroundColor: color.rgb }}
                        ></div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          <div className="mb-5">
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

        <div className="col-10 p-0 ps-3 m-0">
          <div className="row m-0 p-0">
            <img
              className="p-0"
              src="https://new-ella-demo.myshopify.com/cdn/shop/collections/category-default-1.jpg?v=1646985103&width=1100"
            />
          </div>
          <div>
            <h2 className="col-12 text-start pt-3">
              {params.theid === "allproducts"
                ? "All Our Products"
                : `${params.theid} collection`}
            </h2>
            <p>
              Nullam aliquet vestibulum augue non varius. Cras cosmo congue an
              melitos. Duis tristique del ante le maliquam praesent murna de
              tellus laoreet cosmopolis. Quisque hendrerit nibh an purus
            </p>
            <hr></hr>
          </div>
          <div className="row pt-3 g-3">
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
