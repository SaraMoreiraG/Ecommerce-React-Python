import React, { Component } from "react";

export const JumbotronNavBar = () => (
  <div className="jumbotron-nav-bar">
    <div className="container">
      <p className="d-flex justify-items-start m-0 p-0">
        <button
          className="btn text-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collections"
          aria-expanded="false"
          aria-controls="collections"
        >
          Collections
        </button>
        <button
          className="btn text-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#about"
          aria-expanded="false"
          aria-controls="about"
        >
          About us
        </button>
        <button
          className="btn text-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#follow"
          aria-expanded="false"
          aria-controls="follow"
        >
          Follow us in social media
        </button>
      </p>
      <div className="collapse p-3 " id="collections">
        <div className="card card-body">
          Some placeholder content for the collapse component. This panel is
          hidden by default but revealed when the user activates the relevant
          trigger.
        </div>
      </div>
      <div className="collapse p-3 " id="about">
        <div className="card card-body">
          Some placeholder content for the collapse component. This panel is
          hidden by default but revealed when the user activates the relevant
          trigger.
        </div>
      </div>
      <div className="collapse p-3 " id="follow">
        <div className="card card-body">
          Some placeholder content for the collapse component. This panel is
          hidden by default but revealed when the user activates the relevant
          trigger.
        </div>
      </div>
    </div>
  </div>
);
