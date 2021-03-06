import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import BaseUrl from "../config/BaseUrl";
import { Navigate } from "react-router-dom";
import Navigation from "../component/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const localStorage = window.localStorage.getItem("token");
  const [userlogin, setuserlogin] = useState({ email: "", password: "" });
  const inputHandler = (event) => {
    setuserlogin((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = userlogin;
    if (!email || !password) {
      toast.error("All field required", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        theme: "colored",
      });
    }
    axios
      .post(`${BaseUrl.url}/login`, userlogin)
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          toast.success("login is sucessfully");
          window.localStorage.setItem("token", res.data.token);
          navigate("/dashboad");
        }
      })
      .catch((err) => {
        toast.error("invalid credential", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          theme: "colored",
        });
      });
  };

  return (
    <>
      <Navigation />

      {!localStorage ? (
        <div className="container border mt-4 w-25 p-3">
          <h3 className="text-center">Login</h3>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mb-3 mt-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                name="email"
                onChange={inputHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pwd" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="pwd"
                placeholder="Enter password"
                name="password"
                onChange={inputHandler}
              />
            </div>
            <div className="form-check mb-3">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="remember"
                />{" "}
                Remember me
              </label>
            </div>
            <div className="button text-center">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      ) : (
        <Navigate to="/dashboad" />
      )}
    </>
  );
};

export default Login;
