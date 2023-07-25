import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const [userInfo, setUserInfo] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [termsPolicy, setTermsPolicy] = useState(false);

  const handleTermsPolicyClick = () => {
    setTermsPolicy(!termsPolicy);
  };

  const createNewUser = async () => {
    const response = await fetch(process.env.BACKEND_URL + "/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });
    if (response.ok) {
      console.log(response);
    }
  };

  return (
    <div className="register container">
      <div className="row m-0">
        <div className="link-tree pt-4 ps-0">
          <p>home - creat account</p>
        </div>
      </div>
      <div className="row justify-content-between">
        <div className="col-4 p-0 text-">
          <h3 className="py-3">CREATE ACCOUNT</h3>
          <p className="pb-3 fw-light">
            Please register below to create an account
          </p>
          <p className="col-12 fw-semibold">First name</p>
          <input
            type="text"
            className="col-12 mb-3"
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          ></input>
          <p className="col-12 fw-semibold">Last name</p>
          <input
            type="text"
            className="col-12 mb-3"
            onChange={(e) =>
              setUserInfo({ ...userInfo, last_name: e.target.value })
            }
          ></input>
          <p className="col-12 fw-semibold">Your Email Address</p>
          <input
            type="text"
            className="col-12 mb-3"
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          ></input>
          <p className="col-12 fw-semibold">Your Password</p>
          <input
            type="text"
            className="col-12 mb-3"
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          ></input>
          <div className="d-flex align-items-center mb-4">
            <input
              type="checkbox"
              value="None"
              onClick={() => handleTermsPolicyClick()}
            />
            <p className="fw-light ms-2 mb-0">I agree withTerms & Conditions</p>
          </div>
          <div className="col-9">
            <p className="button-black" onClick={() => createNewUser()}>
              CREATE AN ACCOUNT
            </p>
          </div>
        </div>
        <div className="col-7">
          <img
            className="cover-image"
            src="https://cdn.shopify.com/s/files/1/0081/3305/0458/files/blog-details-lager-1.jpg?v=1646119289"
          />
        </div>
      </div>
    </div>
  );
};
