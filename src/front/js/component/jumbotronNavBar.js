import React, { useState } from "react";

export const JumbotronNavBar = () => {
  const [openCollapsible, setOpenCollapsible] = useState(null);

  const handleButtonClick = (collapsibleId) => {
    if (openCollapsible === collapsibleId) {
      // If the clicked button is already open, close it
      setOpenCollapsible(null);
    } else {
      // If the clicked button is closed, open it and close the rest
      setOpenCollapsible(collapsibleId);
    }
  };

  return (
    <div className="jumbotron-nav-bar bg-black">
      <div className="container p-0 m-0">
        <div className="d-flex justify-content-end m-0 p-0">
          <button
            className={`btn text-light${
              openCollapsible === "about" ? " active" : ""
            }`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#about"
            aria-expanded={openCollapsible === "about"}
            aria-controls="about"
            onMouseEnter={() => handleButtonClick("about")}
            onMouseLeave={() => handleButtonClick("null")}
          >
            About us
          </button>
          <button
            className={`btn text-light${
              openCollapsible === "follow" ? " active" : ""
            }`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#follow"
            aria-expanded={openCollapsible === "follow"}
            aria-controls="follow"
            onMouseEnter={() => handleButtonClick("follow")}
            onMouseLeave={() => handleButtonClick("null")}
          >
            Follow us in social media
          </button>
        </div>
        <div
          className={`collapse p-3${
            openCollapsible === "about" ? " show" : ""
          }`}
          id="about"
        >
          <div className="card card-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        </div>
        <div
          className={`collapse p-3${
            openCollapsible === "follow" ? " show" : ""
          }`}
          id="follow"
          onMouseEnter={() => handleButtonClick("follow")}
          onMouseLeave={() => handleButtonClick("null")}
        >
          <div className="card card-body">
            <i className="fa-brands fa-instagram"></i>
            @MakeYourOwnWebsite
          </div>
        </div>
      </div>
    </div>
  );
};
