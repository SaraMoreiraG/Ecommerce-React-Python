import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Register = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="jumbotron">
      <h1 className="display-4">This is a registration page</h1>
    </div>
  );
};
