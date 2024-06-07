import React from "react";
import "./WeSentCodeAndPassword.css";
import CustomButton from "../../UI/Button/SubmitButton/SubmitButton";
import InputComponent from "../../UI/Input/Input";
import Close from "../../UI/Button/CloseButton/CloseButton";
import { LoginHelp } from "../SignIn/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import validatePassword from "../../../utils/passwordValidation";
import {
  setIsInvalid,
  setErrorMessage,
} from "../../../state/InputComponents/inputSlice";

import { ScrollShadow } from "@nextui-org/react";
import { validateEmail } from "../../../utils/formValidation";

import { useNavigate } from "react-router-dom";

export const UserGuide = ({ guide_title }) => {
  return (
    <div className="user-name-alert">
      <p className="this-will-not-be-user">{guide_title}</p>
    </div>
  );
};

export default function WeSentCodeAndPassword(props) {
  const dispatch = useDispatch<AppDispatch>();
  const ret = useSelector(
    (state: RootState) =>
      state.input[
        props.title == "Find your Account"
          ? "find-your-email"
          : "set-user-password"
      ]?.value
  );

  const navigate = useNavigate();

  const handelonClose = () => {
    // TDOD: Close the sign in component and navigate to the sign up component
    // Clear the input fields state and error messages

    if (props.title === "Find your Account") {
      navigate("/auth");
    } else if (props.title === "You'll need a password") {
      navigate("/auth/create-account");
    } else if (props.title === "Choose a new password") {
      navigate("/auth/reset-password");
    }
    // console.log("Close");
  };
  const handelonSubmit = async () => {
    if (
      props.title === "Choose a new password" ||
      props.title === "You'll need a password"
    ) {
      // console.log("user_password: ", ret);

      if (typeof validatePassword(ret) === "string") {
        const errorMessage = validatePassword(ret);

        dispatch(setIsInvalid({ id: "set-user-password", isInvalid: true }));
        dispatch(setErrorMessage({ id: "set-user-password", errorMessage }));
      } else {
        if (props.title === "Choose a new password") {
          navigate("/auth/welcome");
        }
        if (props.title === "You'll need a password") {
          navigate("/auth/set-username-picture");
        }
      }
    } else if (props.title === "Find your Account") {
      if (!ret) {
        dispatch(setIsInvalid({ id: "find-your-email", isInvalid: true }));
        dispatch(
          setErrorMessage({
            id: "find-your-email",
            errorMessage: "Please enter your email",
          })
        );
        return;
      }
      const emailError = await validateEmail(ret);
      if (emailError == null) {
        dispatch(setIsInvalid({ id: "find-your-email", isInvalid: true }));
        dispatch(
          setErrorMessage({
            id: "find-your-email",
            errorMessage: "Email not exists.",
          })
        );
      } else if (emailError === "Invalid email address.") {
        dispatch(setIsInvalid({ id: "find-your-email", isInvalid: true }));
        dispatch(
          setErrorMessage({ id: "find-your-email", errorMessage: emailError })
        );
      } else {
        navigate("/auth/new-password");
      }
    }
  };

  const PaddingStyle = {
    paddingTop: props.title === "We sent you a code" ? "170px" : "221px",
    paddingRight: "0px",
    paddingBottom: "30px",
    paddingLeft: "42px",
  };

  return (
    <div className="WeSentCodeAndPassword-frame max-w-md mx-auto rounded-xl shadow-md overflow-hidden h-[32rem] w-[25rem] sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto ">
      {/* <ScrollShadow \ideScrollBar className="h-[530px]" size={3}> */}
      <Close
        func={handelonClose}
        ClassName={"close-WeSentCodeAndPassword"}
        id={props.title == "Find your Account" ? "close" : "back"}
      />

      <div className="WeSentCodeAndPassword">
        <div className="text-wrapper-3">{props.title}</div>

        <UserGuide guide_title={props.guide_title} />

        <div className="input-padding">
          <InputComponent
            type={"fill-pass"}
            target={props.input_type}
            id={
              props.title === "Choose a new password" ||
              props.title === "You'll need a password"
                ? "set-user-password"
                : "find-your-email"
            }
          />
        </div>
        {props.title === "We sent you a code" ? (
          <LoginHelp title={"Didn’t receive email?"} ClassName={"create-acc"} />
        ) : null}
        <div
          className="buttons-target"
          style={PaddingStyle}
          onClick={handelonSubmit}
        >
          <CustomButton
            classNames="sign-in-competent-sign-in"
            text={props.button_text}
          />
        </div>
      </div>
    {/* </ScrollShadow> */}
    </div>
  );
}
