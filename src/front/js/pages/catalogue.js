import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import { Card } from "../component/card";
import "../../styles/catalogue.css";

export const Catalogue = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const [rotate, setRotate] = useState(0);
  const [showList, setShowList] = useState(false);

  const [productList, setProductList] = useState([]);

  const [filters, setFilters] = useState({
    product_id: null,
    collection_names: [params.theid],
    min_price: null,
    max_price: null,
    size_ids: [],
    color_ids: [],
    in_stock: null,
  });

  useEffect(() => {
    actions.getProducts(filters);
    actions.getSizes();
  }, [filters]);

  const handleCollections = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    setFilters((prevFilters) => {
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

  const handleClick = () => {
    setRotate((prevRotate) => (prevRotate === 0 ? 180 : 0));
    setShowList((prevShowList) => !prevShowList);
  };

  return (
    <div className="catalogue container">
      <div className="row m-0">
        <div className="link-tree pt-4 ms-2">
          <p>home - collection</p>
        </div>
      </div>

      <div className="row m-0">
        <div className="search-bar col-3">
          <div className="categories">
            <div className="d-flex justify-content-between">
              <h4 className="w-100">CATEGORIES</h4>
              <h4
                style={{
                  transform: `rotate(${rotate}deg)`,
                  cursor: "pointer",
                  transition: "transform 0.5s ease",
                }}
                onClick={handleClick}
              >
                ^
              </h4>
            </div>
            <hr className="m-0"></hr>
            {showList && (
              <ul className="pt-2">
                {store.collections &&
                  store.collections.map((category) => (
                    <li key={category.id}>
                      <label>
                        <input
                          type="checkbox"
                          value={category.name}
                          checked={filters.collection_names.includes(
                            category.name
                          )}
                          onChange={handleCollections}
                        />
                        {category.name}
                      </label>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div className="price">
            <div className="d-flex justify-content-between">
              <h4 className="w-100">PRICE</h4>
              <h4>^</h4>
            </div>
            <hr className="m-0"></hr>
            <div className="range_container m-0 pt-4">
              <div className="sliders_control">
                <input
                  id="fromSlider"
                  type="range"
                  value="10"
                  min="0"
                  max="100"
                />
                <input
                  id="toSlider"
                  type="range"
                  value="40"
                  min="0"
                  max="100"
                />
              </div>
              <div className="form_control">
                <div className="form_control_container">
                  <div className="form_control_container__time">Min</div>
                  <input
                    className="form_control_container__time__input"
                    type="number"
                    id="fromInput"
                    value="10"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="form_control_container">
                  <div className="form_control_container__time">Max</div>
                  <input
                    className="form_control_container__time__input"
                    type="number"
                    id="toInput"
                    value="40"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="size mt-3">
            <div className="d-flex justify-content-between">
              <h4 className="w-100">SIZE</h4>
              <h4>^</h4>
            </div>
            <hr className="m-0"></hr>
            <div className="d-flex justify-content-center pt-2">
              {store.sizes &&
                store.sizes.map((size) => (
                  <p
                    key={size.id}
                    className={`size-text px-2 me-2 ${
                      filters.size_ids.includes(size.id) ? "active" : ""
                    }`}
                    onClick={() => handleSizes(size.id)}
                  >
                    {size.name}
                  </p>
                ))}
            </div>
            <div></div>
          </div>
          <div className="categories mt-3">
            <div className="d-flex justify-content-between">
              <h4 className="w-100">AVAILABILITY</h4>
              <h4>^</h4>
            </div>
            <hr className="m-0"></hr>
            <div className="mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label ms-1" for="flexCheckDefault">
                Default checkbox
              </label>
            </div>
            <div className="mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label ms-1" for="flexCheckDefault">
                Default checkbox
              </label>
            </div>
          </div>
        </div>

        <div className="col-9">
          <div className="row banner-search justify-content-end p-0">
            <img src="https://new-ella-demo.myshopify.com/cdn/shop/collections/category-default-1.jpg?v=1646985103&width=1100" />
          </div>
          <h1 className="col-12 text-start pt-3">{params.theid} collection</h1>
          <p>
            Nullam aliquet vestibulum augue non varius. Cras cosmo congue an
            melitos. Duis tristique del ante le maliquam praesent murna de
            tellus laoreet cosmopolis. Quisque hendrerit nibh an purus
          </p>
          <hr></hr>
          <div className="row pt-4 justify-content-between">
            {store.products &&
              store.products.map((item) => <Card key={item.id} item={item} />)}
            {/* <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

Catalogue.propTypes = {
  match: PropTypes.object,
};
