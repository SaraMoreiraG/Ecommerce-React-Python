import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/productDetails.css";

import ColorOptions from "../component/colorOptions";
import SizeOptions from "../component/sizeOptions";

export const ProductDetails = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  // State variables
  const [productInfo, setProductInfo] = useState(null);
  const [isFavorite, setIsFavorite] = useState();
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [newOrder, setNewOrder] = useState({
    id: params.theid,
    color: null,
    size: null,
    quantity: 0,
    price: null,
    description: null,
    termsPolicy: false,
  });
  const [showMessage, setShowMessage] = useState(false);

  // Fetch colors by IDs
  const fetchColors = async (colorIds) => {
    try {
      const fetchedColors = await actions.getColorsByIds(colorIds);
      setColors(fetchedColors);
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  // Fetch sizes by IDs
  const fetchSizes = async (sizeIds) => {
    try {
      const fetchedSizes = await actions.getSizesByIds(sizeIds);
      setSizes(fetchedSizes);
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  // Fetch product data on mount
  useEffect(() => {
    const filters = {
      product_id: params.theid,
    };
    actions.getProducts(filters);
  }, []);

  // Update productInfo when store.products change
  useEffect(() => {
    if (store.products && store.products.length > 0) {
      setProductInfo(store.products[0]);
    }
  }, [store.products]);

  // Check if the product is in user's favorites
  useEffect(() => {
    if (store.user && store.user.favorites.length > 0) {
      const isProductFavorite = store.user.favorites.some(
        (favorite) => favorite.product.id === store.products[0].id
      );
      setIsFavorite(isProductFavorite);
    }
  }, [store.user]);

  // Fetch product sizes and colors and get price
  useEffect(() => {
    if (productInfo) {
      const colorIdsList = productInfo.stock.map((item) => item.color_id);
      const sizeIdsList = productInfo.stock.map((item) => item.size_id);

      setNewOrder((prevOrder) => ({
        ...prevOrder,
        price: productInfo.price,
        description: productInfo.description,
        img: productInfo.img,
      }));

      // Fetch colors and sizes
      fetchColors(colorIdsList);
      fetchSizes(sizeIdsList);
    }
  }, [productInfo]);

  // Handle color selection
  const handleColorSelect = (color) => {
    setNewOrder((prevNewOrder) => ({
      ...prevNewOrder,
      color: color,
    }));
  };

  // Handle size selection
  const handleSizeSelect = (size) => {
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      size: size,
    }));
  };

  // Handle quantity change
  const handleQuantityChange = (change) => {
    if (newOrder.quantity + change >= 0) {
      setNewOrder((prevOrder) => ({
        ...prevOrder,
        quantity: prevOrder.quantity + change,
      }));
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, newOrder];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    actions.getCartFromStorage();
  };

  return (
    <>
      {productInfo ? (
        <div className="product-detail container">
          <div className="row">
            <div className="link-tree pt-4 ms-2">
              <p>home - {productInfo.name}</p>
            </div>
          </div>

          <div className="row pt-3 g-0">
            <div className="col-md-7">
              <div className="foto pe-2">
                <img src={productInfo.img} className="img-fluid" />
              </div>
            </div>
            <div className="col-md-5 ps-5">
              <h2>{productInfo.name}</h2>

              <div className="d-flex align-items-end py-3">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star me-2"></i>
                <h5 className="fw-light m-0">1 Review</h5>
              </div>

              <h5 className="fw-light mb-3">{productInfo.description}</h5>

              <p>Collection: Lorem Ipsum</p>
              <p>Href: {productInfo.reference}</p>
              <p>Availability: Lorem Ipsum</p>

              <h2 className="my-3">$ {productInfo.price}</h2>

              <p className="fw-bold">Color: {newOrder.color}</p>
              <ColorOptions
                colors={colors.flat()}
                selectedColor={newOrder.color}
                onColorSelect={handleColorSelect}
              />

              <p className="fw-bold">
                Size: {newOrder.size !== null ? newOrder.size : ""}
              </p>
              <SizeOptions
                sizes={sizes}
                selectedSize={newOrder.size}
                onSizeSelect={handleSizeSelect}
              />

              <p className="fw-bold">Quantity: {newOrder.quantity}</p>
              <div className="d-flex mb-3">
                <p
                  className={"size-text"}
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </p>
                <p className={"size-text"}>{newOrder.quantity}</p>
                <p
                  className={"size-text"}
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </p>
              </div>

              <div className="d-flex">
                <div className="col-9">
                  <p className="button-black" onClick={handleAddToCart}>
                    ADD TO CART
                  </p>
                </div>

                <div className="col-2">
                  {/*************** FAVORITE HEART ********************/}
                  {store.user && (
                    <i
                      className={`fa-${
                        isFavorite ? "solid" : "regular"
                      } fa-heart p-2`}
                      onClick={() =>
                        isFavorite
                          ? actions.deleteFavorite(store.products[0].id)
                          : actions.addFavorite(store.products[0].id)
                      }
                    ></i>
                  )}
                </div>
              </div>

              <div className="d-flex align-items-center">
                <input
                  className={`form-check-input ${
                    newOrder.termsPolicy === true ? "checked" : ""
                  }`}
                  type="checkbox"
                  value="None"
                  onClick={() =>
                    setNewOrder((prevOrder) => ({
                      ...prevOrder,
                      termsPolicy: true,
                    }))
                  }
                />
                <h5 className="fw-light ms-2 mb-0">
                  I agree withTerms & Conditions
                </h5>
              </div>

              <p
                className={`my-3 ${
                  newOrder.termsPolicy === true
                    ? "button-blue-dark"
                    : "button-blue"
                }`}
                onClick={() => setShowMessage(true)}
              >
                BUY
              </p>
              {showMessage && !newOrder.termsPolicy && (
                <p className="mandatory">*You must accept terms and policy</p>
              )}
              {showMessage && newOrder.termsPolicy && (
                <p>Payment not available yet</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};
