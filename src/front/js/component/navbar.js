import React, { useState, useEffect } from "react";
import { Navbar1 } from "./navbar1";
import { Navbar2 } from "./navbar2";

export const Navbar = () => {
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

  return <div>{screenWidth >= 992 ? <Navbar1 /> : <Navbar2 />}</div>;
};
