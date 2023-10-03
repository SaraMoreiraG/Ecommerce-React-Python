import React, { useState, useEffect, useContext } from "react";
import { Navbar1 } from "./navbar1";
import { Navbar2 } from "./navbar2";
import { Context } from "../store/appContext";

const useLoginStatus = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, [isLogin]);

  return { isLogin, setIsLogin };
};

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Function to update screen width state on window resize
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    // Add event listener to update screen width on window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { isLogin, setIsLogin } = useLoginStatus();

  return (
    <div>
      {screenWidth >= 992 ? (
        <Navbar1
          store={store}
          actions={actions}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
      ) : (
        <Navbar2
          store={store}
          actions={actions}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
      )}
    </div>
  );
};
