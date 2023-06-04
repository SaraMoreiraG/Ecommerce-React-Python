import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Favorites } from "./pages/favorites";
import { Register } from "./pages/register";
import { Catalogue } from "./pages/catalogue";
import { ProductDetails } from "./pages/productDetails";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { JumbotronNavBar } from "./component/jumbotronNavBar";
import { Footer } from "./component/footer";

const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <JumbotronNavBar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Favorites />} path="/favorites" />
            <Route element={<Register />} path="/register" />
            <Route element={<Catalogue />} path="/catalogue/:theid" />
            <Route element={<ProductDetails />} path="/productDetails/:theid" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
