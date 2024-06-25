import React from "react";
import "./EditSecurity.css";
import { EditSecurityWrapper } from "./EditSecurityWrapper";
import { Input, Accordion, AccordionItem, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "../../Input/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../Input/EyeSlashFilledIcon";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import { getAvatarSrc } from "../../../../utils/getAvatarSrc";
import { getUserLevel } from "../../../../utils/getCurrentLevel";
import { set } from "lodash";
import { isValidURL } from "../../../../utils/isValidURL";
import { validateEmail } from "../../../../utils/formValidation";
import { isFullNameValid } from "../../../../utils/formValidation";
import validateUsername from "../../../../utils/usernameValidation";
import api from "../../../../api/posts";
import { useEffect } from "react";
import validatePassword from "../../../../utils/passwordValidation";

import Close from "../../../UI/Button/CloseButton/CloseButton";
const EditProfileNavbar = (props) => {
  return (
    <div className="EditProfileNavbar">
      <div className="overlap-group">
        <div className="text-wrapper">Security</div>
        <div className="push-button">
          <div
            className="EditProfileNavbar-button"
            onClick={props.closeEditSecurity}
          >
            Done
          </div>
        </div>
      </div>
    </div>
  );
};

enum InputType {
  New = "newPassword",
  Confirm = "confirmPassword",
}

export default function EditSecurity(props) {
  const [Loading, setLoading] = useState(false);
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const UserInfo = useSelector((state: RootState) => state.userState);

  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const [ErrorMessageNewPassword, setErrorMessageNewPassword] = useState("");

  const [ErrorMessageConfirmPassword, setErrorMessageConfirmPassword] =
    useState("");

  const toggleVisibility = (inputType) => {
    switch (inputType) {
      // case InputType.Current:
      //   setIsVisibleCurrent(!isVisibleCurrent);
      //   break;
      case InputType.New:
        setIsVisibleNew(!isVisibleNew);
        break;
      case InputType.Confirm:
        setIsVisibleConfirm(!isVisibleConfirm);
        break;
      default:
        break;
    }
  };

  const [inputPassword, setInputPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [IsReadyToSubmit, setIsReadyToSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post("/users/update/password", {
          password: inputPassword[InputType.New],
        });

        console.log(response.data);
      } catch (error) {
        setIsNewPasswordValid(false);
        setIsConfirmPasswordValid(false);
        console.log(error);
      }
      setIsReadyToSubmit(false);

      props.closeEditSecurity();
    };

    IsReadyToSubmit && fetchData();
  }, [IsReadyToSubmit]);

  const handelSubmit = () => {
    console.log("handelSubmit");

    console.log("object>", inputPassword);
    console.log("object---->", inputPassword[InputType.New]);

    if (typeof validatePassword(inputPassword[InputType.New]) === "string") {
      setIsNewPasswordValid(true);
      setErrorMessageNewPassword(
        validatePassword(inputPassword[InputType.New]) as string
      );
      return;
    }

    if (
      typeof validatePassword(inputPassword[InputType.Confirm]) === "string"
    ) {
      setIsConfirmPasswordValid(true);
      setErrorMessageConfirmPassword(
        validatePassword(inputPassword[InputType.Confirm]) as string
      );
      return;
    }

    if (inputPassword[InputType.New] != inputPassword[InputType.Confirm]) {
      setIsNewPasswordValid(true);
      setIsConfirmPasswordValid(true);
      setErrorMessageNewPassword("Passwords do not match");
      setErrorMessageConfirmPassword("Passwords do not match");
      return;
    }

    setIsReadyToSubmit(true);
  };

  return (
    <EditSecurityWrapper>
      <div className="EditProfileNavbar">
        <div className="overlap-group">
          <div className="push-button">
            <Button
              className="CancelProfileNavbar-button"
              onClick={() => {
                props.closeEditSecurity();
              }}
            >
              Cancel
            </Button>
          </div>

          <div className="text-wrapper">Edit Profile</div>

          <div className="push-button">
            <Button
              isLoading={Loading}
              className="EditProfileNavbar-button"
              onClick={() => {
                if (UserInfo.intraId != "") props.closeEditSecurity();
                else handelSubmit();
              }}
            >
              Done
            </Button>
          </div>
        </div>
      </div>


      <div className="security-form">
        <Input
          isInvalid={isNewPasswordValid}
          errorMessage={ErrorMessageNewPassword}
          onChange={(e) => {
            if (e.target.value.length > 20) {
              return;
            }
            if (!isConfirmPasswordValid || !isNewPasswordValid) {
              setIsConfirmPasswordValid(false);
              setIsNewPasswordValid(false);

              setErrorMessageNewPassword("");

              setErrorMessageConfirmPassword("");
            }
            setInputPassword({
              ...inputPassword,
              [InputType.New]: e.target.value,
            });
          }}
          isDisabled={UserInfo.intraId != ""}
          size={"md"}
          value={inputPassword[InputType.New]}
          label={"New Password:"}
          className={"input-edit-profile" + " move-forgot-password"}
          classNames={{
            description: "text-black60",
            label: "text-black50",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
          }}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => {
                toggleVisibility(InputType.New);
              }}
            >
              {props.isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisibleNew ? "text" : "password"}
          placeholder={"new password"}
        />

        <Input
          isInvalid={isConfirmPasswordValid}
          errorMessage={ErrorMessageConfirmPassword}
          onChange={(e) => {
            if (e.target.value.length > 20) {
              return;
            }
            if (!isConfirmPasswordValid || !isNewPasswordValid) {
              setIsConfirmPasswordValid(false);
              setIsNewPasswordValid(false);

              setErrorMessageNewPassword("");

              setErrorMessageConfirmPassword("");
            }
            setInputPassword({
              ...inputPassword,
              [InputType.Confirm]: e.target.value,
            });
          }}
          isDisabled={UserInfo.intraId != ""}
          size={"md"}
          value={inputPassword[InputType.Confirm]}
          label={"Confirm Password:"}
          className={"input-edit-profile"}
          classNames={{
            description: "text-black60",
            label: "text-black50",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
          }}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => {
                toggleVisibility(InputType.Confirm);
              }}
            >
              {props.isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisibleConfirm ? "text" : "password"}
          placeholder={"confirm password"}
        />

        <div className="two-factor">
          <Accordion variant="splitted">
            <AccordionItem
              disableIndicatorAnimation
              isCompact
              className="rounded-mediums"
              aria-label="Accordion 1"
              title="Two-factor authentication"
              subtitle="Protect your account from unauthorized access by requiring a
                            second authentication method in addition to your Twitter password.
                            You can choose authentication app."
              onClick={() => {
                props.setShowTwoFactorAuthentication();
                setInputPassword({
                  ...inputPassword,
                  [InputType.New]: "",
                  [InputType.Confirm]: "",
                });
              }}
            ></AccordionItem>
          </Accordion>
        </div>
      </div>
    </EditSecurityWrapper>
  );
}
