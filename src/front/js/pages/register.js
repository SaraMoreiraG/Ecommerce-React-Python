import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const [termsPolicy, setTermsPolicy] = useState(false);

  const handleTermsPolicyClick = () => {
    setTermsPolicy(true);
    console.log(termsPolicy);
  };

  return (
    <div className="register container">
      <div className="row m-0">
        <div className="link-tree pt-4 ps-0">
          <p>home - creat account</p>
        </div>
      </div>
      <div className="row">
        <div className="col-4 p-0 text-">
          <h1 className="py-3">CREATE ACCOUNT</h1>
          <h3 className="pb-3">Please register below to create an account</h3>
          <h3 className="col-12">First name</h3>
          <input type="text" className="col-12 mb-3"></input>
          <h3 className="col-12">Last name</h3>
          <input type="text" className="col-12 mb-3"></input>
          <h3 className="col-12">Your Email Address</h3>
          <input type="text" className="col-12 mb-3"></input>
          <h3 className="col-12">Your Password</h3>
          <input type="text" className="col-12 mb-3"></input>
          <div className="d-flex align-items-center mb-4">
            <input
              className={`form-check-input ${
                termsPolicy === true ? "checked" : ""
              }`}
              type="checkbox"
              value="None"
              onClick={() => handleTermsPolicyClick()}
            />
            <h3 className="ms-2 mb-0">I agree withTerms & Conditions</h3>
          </div>
          <div className="col-9">
            <p className="button-black">CREATE AN ACCOUNT</p>
          </div>
        </div>
      </div>
    </div>
  );
};
