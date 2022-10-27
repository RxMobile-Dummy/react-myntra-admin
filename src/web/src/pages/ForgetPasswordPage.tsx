import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../components/ChangePassword";
import EmailForm from "../components/EmailForm";

import {
  confirmPasswordValidation,
  emailValidation,
  ForgotPassword,
  passwordValidation,
  RootState,
  fieldValidation,
  ResetPassword,
  ResetForgotPasswordState,
  ResetPasswordResetState,
} from "core";

export default function ForgetPasswordPage(props: any) {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isOtpAvailable, setIsOtpAvailable] = useState(false);

  const dispatch = useDispatch();

  let { data, error } = useSelector(
    (state: RootState) => state.forgotPasswordReducer
  );

  let { resetData, resetError } = useSelector(
    (state: RootState) => state.resetPasswordReducer
  );

  // console.log("data:::", data);
  // console.log("error:::", error);
  // console.log("resetData:::", resetData);
  // console.log("resetError:::", resetError);

  useEffect(() => {
    console.log("isOtpAvailable:::us: ", isOtpAvailable);

    if (!isOtpAvailable) {
      if (data) {
        console.log("data:::us: ", data);
        setIsOtpAvailable(true);
        console.log("isOtpAvailable:::us: ", isOtpAvailable);

        NotificationManager.success(data, "", 2000);
        dispatch<any>(ResetForgotPasswordState());
      } else if (error) {
        // console.log("error:::us: ", error);
        NotificationManager.error(error, "", 2000);
        dispatch<any>(ResetForgotPasswordState());
      }
    } else {
      if (resetData) {
        console.log("resetData:::us: ", resetData);
        setPasswords({
          otp: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        NotificationManager.success(resetData, "", 2000);
        dispatch<any>(ResetPasswordResetState());
        navigate("/");
      } else if (resetError) {
        // console.log("error:::us: ", resetError);
        NotificationManager.error(resetError, "", 2000);
        dispatch<any>(ResetPasswordResetState());
      }
    }
  }, [data, error, resetData, resetError]);
  const [passwords, setPasswords] = useState({
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleEmailChange = (event: any) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleEmailBlur = (event: any) => {
    event.preventDefault();
    let error = emailValidation(event.target.value);
    setErrors({ ...errors, email: error || "" });
  };

  const passwordsChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const passwordsBlur = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;

    let error = validate[name](value);
    setErrors({ ...errors, [name]: error });
  };

  // ********** FORM VALIDATION FUNCTION **********
  const validateForm = () => {
    let valid = true;
    let error = null;
    let tempErrors = errors;

    for (const item in passwords) {
      // error = validate[item](passwords[item]);

      if (error) {
        valid = false;
      }

      tempErrors = { ...tempErrors, [item]: error };
    }

    setErrors({ ...tempErrors });

    return valid;
  };

  const submitChangePassword = async (event: any) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const reqData = {
        email: email,
        otp: passwords.otp,
        newPassword: passwords.newPassword,
        role: "admin",
      };
      await dispatch<any>(ResetPassword(reqData));
      // console.log("reset password done");
      // alert("Password Reset Successfully!!");
      navigate("/");
    }
  };

  // ********** VALIDATE OBJECT **********
  const validate = {
    otp: (otp: any) => fieldValidation("OTP", otp),
    newPassword: (password: any) => passwordValidation(password),
    confirmNewPassword: (password: any) =>
      confirmPasswordValidation(newPassword, password),
  };

  const submitEmail = async (event: any) => {
    event.preventDefault();
    let error = emailValidation(email);
    if (!error) {
      if (!error) {
        const reqData = {
          email: email,
          role: "admin",
        };
        const res = await dispatch<any>(ForgotPassword(reqData));
        console.log("dispatch response: " + res);
      } else {
        setErrors({ ...errors, email: error });
      }
    }
  };

  const { otp, newPassword, confirmNewPassword } = passwords;

  if (!isOtpAvailable) {
    return (
      <>
        <EmailForm
          email={email}
          handleChange={handleEmailChange}
          handleBlur={handleEmailBlur}
          errors={errors}
          submitEmail={submitEmail}
        />
      </>
    );
  }
  return (
    <>
      <ChangePassword
        newPassword={newPassword}
        confirmNewPassword={confirmNewPassword}
        passwordsChange={passwordsChange}
        passwordsBlur={passwordsBlur}
        changePassword={submitChangePassword}
        errors={errors}
        email={email}
        otp={otp}
        resendEmail={submitEmail}
      />
    </>
  );
}
