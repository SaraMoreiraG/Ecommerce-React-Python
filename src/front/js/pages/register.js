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
          <h3 className="py-3">CREATE ACCOUNT</h3>
          <p className="pb-3 fw-light">
            Please register below to create an account
          </p>
          <p className="col-12 fw-semibold">First name</p>
          <input type="text" className="col-12 mb-3"></input>
          <p className="col-12 fw-semibold">Last name</p>
          <input type="text" className="col-12 mb-3"></input>
          <p className="col-12 fw-semibold">Your Email Address</p>
          <input type="text" className="col-12 mb-3"></input>
          <p className="col-12 fw-semibold">Your Password</p>
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
            <p className="fw-light ms-2 mb-0">I agree withTerms & Conditions</p>
          </div>
          <div className="col-9">
            <p className="button-black">CREATE AN ACCOUNT</p>
          </div>
        </div>
      </div>
    </div>
  );
};
