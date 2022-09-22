import React, { useState } from "react";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/NavBar";
// import {login} from "core"
import { Login } from "core"
import axios from "axios"
import { useNavigate } from "react-router-dom";

interface PropsType {
    // onClick: (email: string, password: string) => void;
}


export default function LoginPage(props: PropsType) {

    const dispatch = useDispatch()
    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        event.preventDefault();
    };

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        event.preventDefault();
    };

    const handleSubmit = async (event: any) => {
        const paramData: any = {
            email: "hitesh.kanjani@radixweb.com",
            password: "123456",
        };
        dispatch<any>(Login(paramData))
        navigate("dashboard/add-product")
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
                            <div style={{ paddingTop: "40px" }}></div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
