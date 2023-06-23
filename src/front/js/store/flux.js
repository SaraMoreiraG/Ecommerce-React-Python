const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      pruducts: null,
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
        const url = new URL(process.env.BACKEND_URL + "/api/products/filter");

        if (filterOptions.productId) {
          url.searchParams.append("product_id", filterOptions.productId);
        }

        if (filterOptions.collectionName) {
          url.searchParams.append(
            "collection_names",
            filterOptions.collectionName
          );
        }

        if (filterOptions.minPrice) {
          url.searchParams.append("min_price", filterOptions.minPrice);
        }

        if (filterOptions.maxPrice) {
          url.searchParams.append("max_price", filterOptions.maxPrice);
        }

        if (filterOptions.sizeId) {
          url.searchParams.append("size_ids", filterOptions.sizeId);
        }

        if (filterOptions.colorId) {
          url.searchParams.append("color_ids", filterOptions.colorId);
        }

        if (filterOptions.inStock) {
          url.searchParams.append("in_stock", filterOptions.inStock);
        }

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
