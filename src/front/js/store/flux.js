const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      products: null,
      offers: null,
      collections: null,
      sizes: null,
      colors: null,
      demo: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
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

        appendParam("product_id", filterOptions?.productId);

        filterOptions?.collection_names?.forEach((collectionName) => {
          if (collectionName !== "allproducts") {
            params.append("collection_names[]", collectionName);
          }
        });

        appendParam("min_price", filterOptions?.minPrice);
        appendParam("max_price", filterOptions?.maxPrice);

        filterOptions?.size_ids?.forEach((sizeId) => {
          params.append("size_ids[]", sizeId);
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
    },
  };
};

export default getState;
