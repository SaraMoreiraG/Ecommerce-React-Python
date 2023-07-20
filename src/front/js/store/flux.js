const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      products: null,
      offers: null,
      collections: null,
      sizes: null,
      priceRange: null,
      colors: null,
      user: null,
      cartFromStorage: null,
    },
    actions: {
      getUser: async () => {
        const token = sessionStorage.getItem("token");
        const options = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(
          process.env.BACKEND_URL + "/api/user",
          options
        );
        const data = await response.json();
        if (response.ok) {
          setStore({ user: data });
          console.log("User found");
        }
      },

      getOffers: async () => {
        const response = await fetch(
          process.env.BACKEND_URL + "/api/products/filter",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        await setStore({ offers: data });
      },

      getProducts: async (filterOptions) => {
        console.log("Flux", filterOptions);

        const url = new URL(process.env.BACKEND_URL + "/api/products/filter");
        const params = new URLSearchParams();

        const appendParam = (param, value) => {
          if (value) {
            params.append(param, value);
          }
        };

        appendParam("product_id", filterOptions?.product_id);

        filterOptions?.collection_names?.forEach((collectionName) => {
          if (collectionName !== "allproducts") {
            params.append("collection_names[]", collectionName);
          }
        });

        appendParam("min_price", filterOptions?.min_price);
        appendParam("max_price", filterOptions?.max_price);

        filterOptions?.size_ids?.forEach((sizeId) => {
          params.append("size_ids[]", sizeId);
        });

        filterOptions?.color_ids?.forEach((colorId) => {
          params.append("color_ids[]", colorId);
        });

        appendParam("color_ids", filterOptions?.colorId);
        appendParam("in_stock", filterOptions?.inStock);

        url.search = params.toString();

        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Request failed");
          }

          const data = await response.json();
          await setStore({ products: data });
        } catch (error) {
          // Handle any errors that occurred during the fetch request
          console.error("Error:", error);
        }
      },

      getCollections: async () => {
        const response = await fetch(
          process.env.BACKEND_URL + "/api/collections",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        await setStore({ collections: data });
      },

      getSizes: async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/sizes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        await setStore({ sizes: data });
      },

      getPriceRange: async () => {
        const response = await fetch(
          process.env.BACKEND_URL + "/api/products/price-range",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        await setStore({ priceRange: data });
      },

      getColors: async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/colors", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        await setStore({ colors: data });
      },

      getColorsByIds: async (colorIds) => {
        try {
          const colorPromises = colorIds.map(async (colorId) => {
            const response = await fetch(
              process.env.BACKEND_URL + "/api/colors/" + colorId,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (!response.ok) {
              // Handle the case where the color with the given ID was not found
              // For example, you can return null or throw an error
              return null;
            }

            const data = await response.json();
            return data;
          });

          const colors = await Promise.all(colorPromises);
          return colors;
        } catch (error) {
          // Handle any errors that might occur during the API calls
          // For example, you can log the error or throw a custom error
          console.error("Error fetching colors:", error);
          throw error;
        }
      },

      getSizesByIds: async (sizeIds) => {
        try {
          const sizePromises = sizeIds.map(async (sizeId) => {
            const response = await fetch(
              process.env.BACKEND_URL + "/api/sizes/" + sizeId,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (!response.ok) {
              return null;
            }

            const data = await response.json();
            return data; // Return the entire data object
          });

          const sizesData = await Promise.all(sizePromises);

          // Flatten the array of arrays and get an array of size names
          const sizes = sizesData.flat().map((sizeData) => sizeData.name);

          return sizes; // Return the array of size names
        } catch (error) {
          console.error("Error fetching sizes:", error);
          throw error;
        }
      },

      getCartFromStorage: () => {
        const cartData = JSON.parse(localStorage.getItem("cart")) || [];
        setStore({ cartFromStorage: cartData });
      },

      addCartItem: async (item) => {
        const newCartItem = {
          product_id: item.product_id,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
        };

        const response = await fetch(
          process.env.BACKEND_URL + "/api/cart-item",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(newCartItem),
          }
        );
        if (response.ok) {
          getActions().getUser();
        }
      },

      addFavorite: async (favorite) => {
        const store = getStore();

        if (store.user.id) {
          const token = sessionStorage.getItem("token");
          const newFav = {
            user_id: store.user.id,
            product_id: favorite,
            key: "product_id",
          };

          const response = await fetch(
            process.env.BACKEND_URL + "/api/favorites",
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify(newFav),
            }
          );
          if (response.ok) {
            getActions().getUser();
          }
        }
      },

      deleteFavorite: async (id) => {
        const token = sessionStorage.getItem("token");

        const response = await fetch(
          process.env.BACKEND_URL + "/api/favorites/" + id,
          {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        if (response.ok) {
          await getActions().getUser();
        }
      },

      resetUser() {
        setStore({ user: null });
        sessionStorage.removeItem("token");
      },
    },
  };
};

export default getState;
