import React, { useEffect } from "react";
import "./SignIn.css";
import CustomButton from "../../UI/Button/SubmitButton/SubmitButton";
import InputComponet from "../../UI/Input/Input";
import MaskGroup from "../assets/maskgroup.svg";
import Close from "../../UI/Button/CloseButton/CloseButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import InputState from "../../../state/InputComponents/inputSlice";
import {
  setIsInvalid,
  setErrorMessage,
} from "../../../state/InputComponents/inputSlice";
import { useNavigate } from "react-router-dom";
import api from "../../../api/posts";
import { LoginState } from "../LoginState/LoginState";
import { ScrollShadow } from "@nextui-org/react";
export const Label = () => {
  return (
    <div className="label">
      <div className="text-wrapper">Sign in to iPong</div>
    </div>
  );
};

export const LoginHelp = ({ title, ClassName }) => {
  return (
    <div className={ClassName}>
      <div className="left-title-help">{title}</div>
    </div>
  );
};

export default function SignIn() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const email = useSelector(
    (state: RootState) => state.input["email_input"]?.value
  );
  const password = useSelector(
    (state: RootState) => state.input["password_input"]?.value
  );

  const handelonSubmit = async () => {
    var state: LoginState = LoginState.LOGIN_SUCCESS;
    try {
      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });

      console.log("hello: ", response);
    } catch (error) {
      state =
        error.response.data.statusCode == 404 || email == undefined
          ? LoginState.INVALID_EMAIL
          : LoginState.INVALID_PASSWORD;
    }
    switch (state) {
      case LoginState.INVALID_EMAIL:
        dispatch(setIsInvalid({ id: "email_input", isInvalid: true }));
        dispatch(
          setErrorMessage({ id: "email_input", errorMessage: "Invalid email" })
        );
        break;
      case LoginState.INVALID_PASSWORD:
        dispatch(setIsInvalid({ id: "password_input", isInvalid: true }));
        dispatch(
          setErrorMessage({
            id: "password_input",
            errorMessage: "Invalid password",
          })
        );
        break;
      case LoginState.LOGIN_SUCCESS:
        navigate("/ipong");
        break;
      default:
        break;
    }
  };
  const handleForgotPasswordClick = () => {
    navigate("/auth/reset-password");
  };
  const handleCreateAccountClick = () => {
    navigate("/auth/create-account");
  };

  const handelonClose = () => {
    // TDOD: Close the sign in component and navigate to the sign up component
    // Clear the input fields state and error messages
    navigate("/auth");
    console.log("Close");
  };

  return (
    <ScrollShadow hideScrollBar size={4} className="h-auto">

      <div className="sign-in-competent max-w-md mx-auto rounded-xl shadow-md overflow-hidden h-[32rem] w-[25rem] sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto ">
        <div className="maskgroup-svg">
          <img src={MaskGroup} alt="Mask Group SVG" />
        </div>

        <div className="go_back">
          <div>
            <Close id={"close"} func={handelonClose} ClassName={"close"} />
          </div>
        </div>

        <Label />

        <div className="move-left">
          <InputComponet
            type={"Email"}
            placeholder="Enter your email address"
            id="email_input"
          />
          <InputComponet
            type={"pass"}
            placeholder="Enter your email password"
            id="password_input"
          />
        </div>

        <div onClick={handleForgotPasswordClick}>
          <LoginHelp title={"Forgot password?"} ClassName={"reset-pass"} />
        </div>

        <div onClick={handleCreateAccountClick}>
          <LoginHelp title={"Create Account?"} ClassName={"create-acc"} />
        </div>

        <div className="buttons-target" onClick={handelonSubmit}>
          <CustomButton classNames="sign-in-competent-sign-in" text="Log in" />
        </div>
      </div>
    </ScrollShadow>
  );
}
