import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getToken,
  getUserId,
  isUserSessions,
  removeUserSession,
} from "../utils/Storage";
import { Logout, RootState, ResetLogoutState } from "core";
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let { logoutData, logoutError } = useSelector(
    (state: RootState) => state.logoutReducer
  );
  // console.log("logoutdata...", logoutData);

  // useEffect(() => {
  //   if (logoutData === "Success") {
  //     console.log("data:::us: ", logoutData);
  //     removeUserSession();
  //     navigate("/");
  //     window.location.reload();
  //   } else if (logoutError) {
  //     console.log("error:::us: ", logoutError);
  //     NotificationManager.error(logoutError, "", 2000);
  //   }
  // }, [logoutData, logoutError]);

  useEffect(() => {
    if (isUserSessions()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });
  ////// Logout api not working
  const onLogoutPress = async () => {
    try {
      const reqData = {
        adminId: localStorage.getItem("userId") || "",
        authToken: localStorage.getItem("token") || "",
      };
      const logoutData2 = await dispatch<any>(Logout(reqData));
      // console.log("logoutData:::", logoutData2);
      // navigate("/logout");

      // removeUserSession();
      if (logoutData2.status) {
        navigate("/");
        removeUserSession();
        window.location.reload();
      } else if (logoutError) {
        console.log("error:::us: ", logoutError);
        NotificationManager.error(logoutError, "", 2000);
      }
    } catch (error: any) {
      console.log("error::", error);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container-fluid">
        <Link to="/dashboard" className="navbar-brand">
          <img src="../../../logo512.png" alt="Logo" height="50" width="50" />
        </Link>

        <button
          className="navbar-toggler navbar-toggler-right p-0"
          type="button"
          data-toggle="collapse"
          data-target="#navResponsive"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navResponsive"
          style={{ fontWeight: "600" }}
        >
          <ul className="navbar-nav px-3">
            <li className="nav-item px-2">
              <Link to="/dashboard/add-product" className="nav-link">
                PRODUCTS
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/dashboard/main-categories" className="nav-link">
                MAIN CATEGORIES
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/dashboard/categories" className="nav-link">
                CATEGORIES
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/dashboard/brands" className="nav-link">
                BRANDS
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/dashboard/users" className="nav-link">
                USERS
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link to="/dashboard/offers" className="nav-link">
                OFFERS
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto px-3 py-2">
            <li className="nav-item px-2">
              {isLoggedIn ? (
                <button
                  onClick={onLogoutPress}
                  className="btn btn-sm navbar-login-btn"
                >
                  Logout
                </button>
              ) : (
                <Link to="/" className="btn btn-sm navbar-login-btn">
                  LOGIN/SIGNUP
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
