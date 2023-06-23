const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
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
