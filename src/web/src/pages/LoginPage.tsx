import React, { useState, useEffect } from "react";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/NavBar";
import { Login, RootState, ResetLoginState } from "core";
import { useNavigate, Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import {setUserSession, setUserData} from '../utils/Storage'


export default function LoginPage() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState(null);

  let { loginData, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (loginData) {
      console.log("data:::us: ", loginData);
      setUserSession(loginData.token, loginData._id);
      setUserData(loginData);
      navigate("/dashboard/add-product");
    } else if (error) {
      // console.log("error:::us: ", error);
      console.log("error:::us: ");

      NotificationManager.error(error, "", 2000);

      dispatch<any>(ResetLoginState());
    }
  }, [loginData, error]);

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const paramData: any = {
      // email: "hitesh.kanjani@radixweb.com",
      // password: "123456",
      email: email,
      password: password,
      deviceId: "",
      fcmToken: "",
    };
    console.log("ParamData is", paramData);
    dispatch<any>(Login(paramData));
   
  };

  return (
    <>
      <Navbar />
      <div className="login-container py-5">
        <div className="container bg-white p-0" style={{ width: "360px" }}>
          <img
            src="https://constant.myntassets.com/pwa/assets/img/banner_login_landing_300.jpg"
            alt=""
            width="100%"
          />
          <div className="mx-4 mt-4">
            <div
              className="text-center text-highlighted"
              style={{ fontSize: "25px", letterSpacing: "2px" }}
            >
              <span>Login</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group mt-3">
                <label className="form-control-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="form-control login-form-control"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleChangeEmail}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-control-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="form-control login-form-control"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleChangePassword}
                  required
                />
              </div>
              {error && (
                <span className="text-danger text-capitalize font-weight-bold">
                  {error}
                </span>
              )}
              <div className="text-muted mt-4">
                By Continuing, I agree to the{" "}
                <span className="text-highlighted">Terms of Usage</span> &#38;{" "}
                <span className="text-highlighted">Privacy Policy</span>
              </div>
              <div className="mt-3">
                <input
                  className="btn btn-block login-btn"
                  type="submit"
                  value="Login"
                />
              </div>
              <div className="text-muted mt-3 text-center">
                Don't have an account?{" "}
                <Link className="text-highlighted register-link" to="/register">
                  Register
                </Link>
              </div>
              <div className="text-muted mt-1 text-center">
                Forget Password?{" "}
                <Link
                  className="text-highlighted register-link"
                  to="/forget-password"
                >
                  Change Password
                </Link>
              </div>
              <div style={{ paddingTop: "40px" }}></div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
