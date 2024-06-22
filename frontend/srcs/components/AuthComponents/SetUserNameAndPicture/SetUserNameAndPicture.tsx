import React from "react";
import "./SetUserNameAndPicture.css";
import InputComponent from "../../UI/Input/Input";
import Close from "../../UI/Button/CloseButton/CloseButton";
import CustomButton from "../../UI/Button/SubmitButton/SubmitButton";
import { Avatar, ScrollShadow } from "@nextui-org/react";
import GestUser from "../assets/gest_user.svg";
import { CameraIcon } from "../../UI/icon/CameraIcon";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import {
  setIsInvalid,
  setErrorMessage,
} from "../../../state/InputComponents/inputSlice";

import { useNavigate } from "react-router-dom";
import validateUsername from "../../../utils/usernameValidation";
import { Spacer } from "@nextui-org/react";
export const UserNameTitle = () => {
  return (
    <div className="user-name-alert">
      <p className="this-will-not-be-user">
        Your <span className="user-name">@username</span> is unique. You can
        always change it later.
      </p>
    </div>
  );
};

export default function SetUserNameAndPicture() {


  const dispatch = useDispatch<AppDispatch>();
  const username = useSelector(
    (state: RootState) => state.input["set-user-username"]?.value
  );
  const navigate = useNavigate();

  const handelonSubmit = async () => {
    if (!username) {
      dispatch(setIsInvalid({ id: "set-user-username", isInvalid: true }));
      dispatch(
        setErrorMessage({
          id: "set-user-username",
          errorMessage: "Please enter a username",
        })
      );
      return;
    }
    const ret = await validateUsername(username);
    if (ret !== null) {
      // console.log(ret);
      dispatch(setIsInvalid({ id: "set-user-username", isInvalid: true }));
      dispatch(setErrorMessage({ id: "set-user-username", errorMessage: ret }));
    } else {
      navigate("/auth/welcome"); // redirect to welcome page
    }
  };

  const handelonClose = () => {
    // TDOD: Close the sign in component and navigate to the sign up component
    // Clear the input fields state and error messages
    navigate("/auth/set-password");
    // console.log("Close");
  };



  return (
    
      <div className="SetUserNameAndPicture-frame max-w-md mx-auto rounded-xl shadow-md overflow-hidden h-[32rem] w-[25rem] sm:w-auto sm:h-auto 2xl:w-auto 2xl:h-auto ">
        <div className="SetUserNameAndPicture">
          <Close func={handelonClose} ClassName={"creat-close"} />

          <div className="text-wrapper-4">What should we call you?</div>

          <UserNameTitle />

          <div className="input-padding">
            <InputComponent
              type={"fill"}
              target={"username"}
              id={"set-user-username"}
            />
          </div>
          <Spacer y={200} />

          <div className="buttons-target" onClick={handelonSubmit}>
            <CustomButton classNames="sign-in-competent-sign-in" text="Next" />
          </div>
        </div>
      </div>

  );
}
