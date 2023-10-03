import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignInOffcanvas = ({ setIsLogin }) => {
  const { actions } = useContext(Context);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const [login, setLogin] = useState({ email: "", password: "" });

  const logInUser = async () => {
    const response = await fetch(process.env.BACKEND_URL + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      sessionStorage.setItem("token", token);
      await actions.getUser();
      setIsOffcanvasOpen(false);
      setIsLogin(true);
    }
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header px-2">
        <h4 className="fw-bold" id="offcanvasExampleLabel">
          Login
        </h4>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div className="offcanvas-body px-4">
        <h5 className="col-12 fw-medium">
          Email Address <span className="mandatory">*</span>
        </h5>
        <input
          type="text"
          className="col-12 mb-3"
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        ></input>
        <h5 className="col-12 fw-medium">
          Password <span className="mandatory">*</span>
        </h5>
        <input
          type="password"
          className="col-12 mb-3"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        ></input>
        <div className="col-12">
          <p
            className="button-black"
            data-bs-dismiss="offcanvas"
            onClick={() => logInUser()}
          >
            LOG IN
          </p>
        </div>
        <h5 className="fw-normal underline button text-center">
          Forgot your password?
        </h5>
        <div className="col-12 py-3">
          <Link to="/register">
            <p
              className="button-white"
              onClick={() => setIsOffcanvasOpen(false)}
            >
              CREATE AN ACCOUNT
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
