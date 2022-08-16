import React, { useState } from "react";
import { ChangeEvent } from "react";
// import { setUserSession } from "../../Utils/Storage";
// import LoginService from "../../services/LoginService";
import Navbar from "../components/NavBar";
//import { NotificationManager } from "react-notifications";

interface PropsType {
    // onClick: (email: string, password: string) => void;
}

// interface StateType {
//     email: string;
//     password: string;
// }

export default function LoginPage(props: PropsType) {
    // const [user, setUser] = useState({
    //     // role: "seller",
    //     email: "",
    //     password: "",
    // });
    // const [email, setEmail] = React.useState<PropsType | {}>()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    // const handleChange = (event: any) => {
    //     setUser({ ...user, [event.target.name]: event.target.value });
    // };

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        event.preventDefault();
    };

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        event.preventDefault();
    };

    const handleSubmit = (event: any) => {
        alert(email)
        // const { email, password } = this.state;
        //  props.onClick(email, password);
    };

    // const checkLogin = (event: any) => {
    // console.log("event:", event)
    // event.preventDefault();
     //LoginService.login({ ...user })
    //     .then((res) => {
    //         // console.log(res);
    //         let token = res.data.token;
    //         let userId = res.data.id;
    //         let isAdmin = true;
    //         setUserSession(token, userId, isAdmin);
    //         if (isAdmin) {
    //             NotificationManager.success("Logged in successfully", "", 2000);
    //             props.history.push("/dashboard");
    //         } else {
    //             props.history.push("/");
    //         }

    //         // props.history.push(props.location.state.from.pathname);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //         // if (error.response.status === 400) {
    //         //   setError("Invalid Email or Password");
    //         // } else {
    //         //   setError("Something went wrong. Please try again later.");
    //         // }
    //     });
    // };

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
                            {/* <div className="form-group mt-4">
                <label className="form-control-label " htmlFor="usertype">
                  Select User Type
                </label>
                <select
                  className="form-control login-form-control"
                  name="role"
                  id="role"
                  value={user.role}
                  onChange={handleChange}
                >
                  <option value="seller">Admin</option>
                  <option value="customer">User</option>
                </select>
              </div> */}
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
                            {/* <div className="text-muted mt-3 text-center">
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
              </div> */}
                            <div style={{ paddingTop: "40px" }}></div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
