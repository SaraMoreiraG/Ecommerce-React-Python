import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/productDetails.css";

export const ProductDetails = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  const [productInfo, setProductInfo] = useState(null);
  console.log(productInfo);

  const [colors, setColors] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState({
    id: params.theid,
    description: null,
    color: null,
    size: null,
    quantity: 0,
  });
  const [activeColor, setActiveColor] = useState(null);
  const sizes = ["XS", "S", "M", "L", "XL"];
  const [activeSize, setActiveSize] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [termsPolicy, setTermsPolicy] = useState(false);

  const [isFavorite, setIsFavorite] = useState();

  useEffect(() => {
    const filters = {
      product_id: params.theid,
    };
    actions.getProducts(filters);
  }, []);

  useEffect(() => {
    if (store.products && store.products.length > 0) {
      setProductInfo(store.products[0]);
    }
  }, [store.products]);

  useEffect(() => {
    if (store.user && store.user.favorites.length > 0) {
      store.user.favorites.map((favorite) => {
        if (favorite.product.id === store.products[0].id) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      });
    }
  }, [store.user]);

  useEffect(() => {
    if (productInfo) {
      const colorIdsList = productInfo.stock
        .map((colorObject) => colorObject.color_id)
        .join(",");
      console.log(colorIdsList);

      const fetchColors = async () => {
        try {
          const colorIdsArray = colorIdsList.split(","); // Convert comma-separated string to an array
          const fetchedColors = await actions.getColorsByIds(colorIdsArray);
          setColors(fetchedColors);
        } catch (error) {
          console.error("Error fetching colors:", error);
          // Handle errors if needed
        }
        console.log(colors);
      };

      fetchColors();
    }
  }, [productInfo]);
  console.log(colors);

  const handleColorClick = (index) => {
    setActiveColor(index);
    setSelectedProduct((prevSelectedProduct) => ({
      ...prevSelectedProduct,
      color: index,
    }));
  };
  const handleSizeClick = (index) => {
    setActiveSize(index);
  };
  const handleQuantityClick = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleTermsPolicyClick = () => {
    setTermsPolicy(true);
    console.log(termsPolicy);
  };

  const addToCart = () => {
    console.log(selectedProduct);
  };

  return (
    <>
      {productInfo ? (
        <div className="product-detail container">
          <div className="row">
            <div className="link-tree pt-4 ms-2">
              <p>home - {params.theid}</p>
            </div>
          </div>

          <div className="row pt-3 g-0">
            <div className="col-md-7">
              <div className="foto pe-2">
                <img
                  src="https://new-ella-demo.myshopify.com/cdn/shop/products/image16xxl_fc9c3985-7db2-4101-b11a-49cd512ce9bc.jpg?v=1658136572"
                  className="img-fluid"
                  alt="..."
                />
              </div>
              {/* <div className="row">
            <div className="more-fotos bg-success p-0">MORE FOTOS</div>
          </div> */}
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

              <p className="fw-bold">Color: {selectedProduct.color}</p>
              <div className="d-flex mb-3">
                {colors &&
                  colors.flat().map((color) => (
                    <div
                      key={color.id}
                      className={`circle ${
                        selectedProduct.color === color.name ? "active" : ""
                      }`}
                      onClick={() =>
                        setSelectedProduct((prevSelectedProduct) => ({
                          ...prevSelectedProduct,
                          color: color.name,
                        }))
                      }
                    >
                      <div
                        className="circle-color"
                        style={{ backgroundColor: color.rgb }}
                      ></div>
                    </div>
                  ))}
              </div>

              <p className="fw-bold">
                Size: {activeSize !== null ? sizes[activeSize] : ""}
              </p>
              <div className="d-flex mb-3">
                {sizes.map((size, index) => (
                  <p
                    key={index}
                    className={`size-text ${
                      activeSize === index ? "active" : ""
                    }`}
                    onClick={() => handleSizeClick(index)}
                  >
                    {size}
                  </p>
                ))}
              </div>

              <p className="fw-bold">Quantity: {quantity}</p>
              <div className="d-flex mb-3">
                <p
                  className={"size-text"}
                  onClick={() => handleQuantityClick()}
                >
                  -
                </p>
                <p className={"size-text"}>{quantity}</p>
                <p
                  className={"size-text"}
                  onClick={() => handleQuantityClick()}
                >
                  +
                </p>
              </div>

              <div className="d-flex">
                <div className="col-9">
                  <p className="button-black" onClick={() => addToCart()}>
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
                    termsPolicy === true ? "checked" : ""
                  }`}
                  type="checkbox"
                  value="None"
                  onClick={() => handleTermsPolicyClick()}
                />
                <h5 className="fw-light ms-2 mb-0">
                  I agree withTerms & Conditions
                </h5>
              </div>
              <p className="button-black blue my-3">BUY</p>
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

ProductDetails.propTypes = {
  match: PropTypes.object,
};
